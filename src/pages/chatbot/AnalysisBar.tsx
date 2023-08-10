/* eslint-disable indent */
/* eslint-disable consistent-return */
import { List, Card, Typography, Button, Carousel, Statistic } from "antd";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import { useEffect, useRef } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import {
  ArrowUpOutlined,
  SmileOutlined,
  FrownOutlined,
  MehOutlined,
} from "@ant-design/icons";
import useAsync from "../../../components/useAsync";
import axios from "../axiosFrontend";

const { Text } = Typography;

export const determineWhoIsOpponent = (chatRoomMessagesData: any) => {
  // eslint-disable-next-line no-nested-ternary, no-extra-boolean-cast
  if (!chatRoomMessagesData) return;
  if (chatRoomMessagesData.user1_id === 1) {
    // then the opponent is user2
    return {
      opponent_id: chatRoomMessagesData.user2_id,
      opponent_first_name: chatRoomMessagesData.user2_first_name,
      opponent_second_name: chatRoomMessagesData.user2_second_name,
      opponent_picture: chatRoomMessagesData.user2_picture,
    };
  }
  return {
    opponent_id: chatRoomMessagesData.user1_id,
    opponent_first_name: chatRoomMessagesData.user1_first_name,
    opponent_second_name: chatRoomMessagesData.user1_second_name,
    opponent_picture: chatRoomMessagesData.user1_picture,
  };
};

const useChatRoomMessages = (selectedChatId: string) => {
  const {
    execute,
    status: chatRoomMessagesStatus,
    value: chatRoomMessagesData,
  } = useAsync(() => {
    return axios
      .get(`/api/chat_rooms_with_messages/${selectedChatId}`)
      .then((res) => res.data);
  });

  useEffect(() => {
    execute();
  }, [execute, selectedChatId]);

  // eslint-disable-next-line no-nested-ternary, no-extra-boolean-cast
  const opponentId = !!chatRoomMessagesData
    ? chatRoomMessagesData.user1_id === 1
      ? chatRoomMessagesData.user2_id
      : chatRoomMessagesData.user1_id
    : "";

  const newchatRoomMessagesData = {
    ...chatRoomMessagesData,
    ...determineWhoIsOpponent(chatRoomMessagesData),
  };

  return {
    chatRoomMessagesStatus,
    chatRoomMessagesData: newchatRoomMessagesData,
    opponentId,
    execute,
  };
};

export const useUserMetadata = (opponentId: string) => {
  const {
    execute: getUserData,
    status: userDataStatus,
    value: userData,
  } = useAsync(() => {
    if (!opponentId) return Promise.resolve();
    return axios.get(`/api/users/${opponentId}`).then((res) => res.data);
  });

  useEffect(() => {
    getUserData();
  }, [getUserData, opponentId]);

  return { userDataStatus, userData };
};

const calculateStatistic = (processedAnalysisData: any, messagesData: any) => {
  if (!processedAnalysisData || !messagesData)
    return {
      avgNow: 0,
      avgOverall: 0,
      minNow: 0,
      maxNow: 0,
      valueStyle: () => {
        return { color: "#3f8600" };
      },
      prefix: () => <SmileOutlined />,
    };
  const avgNow =
    Math.round(
      (processedAnalysisData.reduce(
        (acc: number, item: any) => acc + item.sentimentAnalysisScore,
        0
      ) /
        processedAnalysisData.length) *
        1000
    ) / 1000;

  const avgOverall =
    Math.round(
      (messagesData.reduce(
        (acc: number, item: any) => acc + item.sentimentAnalysisScore,
        0
      ) /
        messagesData.length) *
        1000
    ) / 1000;

  const minNow = Math.min(
    ...messagesData.map((item: any) => item.sentimentAnalysisScore)
  );
  const maxNow = Math.max(
    ...messagesData.map((item: any) => item.sentimentAnalysisScore)
  );

  const isBad = (val: number) => val < 0.33;
  const isNormal = (val: number) => val >= 0.33 && val < 0.66;

  const valueStyle = (val: number) => {
    if (isBad(val)) {
      return { color: "#cf1322" }; // Red color for bad
    }
    if (isNormal(val)) {
      return { color: "#d1a802" }; // Yellow color for normal
    }
    return { color: "#3f8600" }; // Green color for good
  };

  const prefix = (val: number) => {
    if (isBad(val)) {
      return <FrownOutlined />;
    }
    if (isNormal(val)) {
      return <MehOutlined />;
    }
    return <SmileOutlined />;
  };

  const getStandardDeviation = (array: number[], avg: number) => {
    const variance =
      array.reduce((acc: number, val: number) => acc + (val - avg) ** 2, 0) /
      array.length;
    return Math.sqrt(variance);
  };

  const getMedian = (array: number[]) => {
    array.sort((a, b) => a - b);
    const mid = Math.floor(array.length / 2);
    return array.length % 2 !== 0
      ? array[mid]
      : (array[mid - 1] + array[mid]) / 2;
  };

  const messagesScores = messagesData.map(
    (item: any) => item.sentimentAnalysisScore
  );

  const stdDevNow = getStandardDeviation(
    processedAnalysisData.map((item: any) => item.sentimentAnalysisScore),
    avgNow
  );
  const stdDevOverall = getStandardDeviation(messagesScores, avgOverall);
  const medianNow = getMedian(
    processedAnalysisData.map((item: any) => item.sentimentAnalysisScore)
  );
  const medianOverall = getMedian(messagesScores);

  return {
    avgNow,
    avgOverall,
    minNow,
    maxNow,
    stdDevNow,
    stdDevOverall,
    medianNow,
    medianOverall,
    valueStyle,
    prefix,
  };
};

const convertToName = (item: any) => {
  if (item === "avgNow") return "Average Score in the last 20 Messages";
  if (item === "avgOverall") return "Average Score Overall";
  if (item === "minNow") return "Min Score";
  if (item === "maxNow") return "Max Score";
  if (item === "stdDevNow") return "Standard Deviation in the last 20 Messages";
  if (item === "stdDevOverall") return "Standard Deviation Overall";
  if (item === "medianNow") return "Median Score in the last 20 Messages";
  if (item === "medianOverall") return "Median Score Overall";

  return "Metrics";
};

const AnalysisBar = ({ selectedChatId }: { selectedChatId: string }) => {
  const { chatRoomMessagesStatus, chatRoomMessagesData, opponentId, execute } =
    useChatRoomMessages(selectedChatId);
  const { userDataStatus, userData } = useUserMetadata(opponentId);
  const carouselRef = useRef(null);

  // assuming messages are ordered by timestamp
  const messagesData = chatRoomMessagesData?.messages?.map((message: any) => ({
    timestamp: new Date(message.timestamp).toLocaleDateString(),
    sentimentAnalysisScore: message.sentiment_analysis_score,
  }));

  const isErrorOverall =
    chatRoomMessagesStatus === "ERRORED" || userDataStatus === "ERRORED";
  const isLoadingOverall =
    chatRoomMessagesStatus === "LOADING" || userDataStatus === "LOADING";

  if (isErrorOverall) {
    return <div>Error has occured.</div>;
  }

  const processedAnalysisData = messagesData
    ? messagesData.slice(-20).map((item: any) => {
        return {
          ...item,
          "Sentiment Analysis Score":
            Math.round(item.sentimentAnalysisScore * 1000) / 1000,
        };
      })
    : [];

  const {
    avgNow,
    avgOverall,
    minNow,
    maxNow,
    valueStyle,
    prefix,
    stdDevOverall,
    medianOverall,
  } = calculateStatistic(processedAnalysisData, messagesData);

  const statistics = [
    { name: "avgOverall", value: avgOverall },
    { name: "avgNow", value: avgNow },
    { name: "minNow", value: minNow },
    { name: "maxNow", value: maxNow },
    { name: "stdDevOverall", value: stdDevOverall },
  ];

  const next = () => {
    if (!carouselRef?.current) return;
    (carouselRef.current as any).next();
  };

  return (
    <div className="flex flex-col justify-between min-h-full space-y-4">
      <List
        loading={!userData}
        className="bg-white"
        bordered
        style={{ minHeight: "325px" }}
        dataSource={
          userData
            ? [
                `Name: ${userData.first_name} ${userData.second_name}`,
                `Email: ${userData.email}`,
                `Username: ${userData.username}`,
                `Occupation: ${userData.occupation}`,
                `Age: ${userData.age}`,
                `Gender: ${userData.gender}`,
                `Phone number: ${userData.phone_number}`,
                // ... and so on for other details
              ]
            : []
        }
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      {/* 
      <Card
        title={
          <div className="flex flex-row justify-between min-w-full">
            <Text>Sentiment Analysis</Text>
            <Button onClick={execute}>Refresh</Button>
          </div>
        }
        style={{ minHeight: "420px" }}
        loading={isLoadingOverall}
      ></Card> */}
      <Card
        title={
          <div className="flex flex-row justify-between min-w-full items-center">
            <Text data-testid={"sentiment-analysis-title"}>
              Sentiment Analysis
            </Text>
            <div className="flex flex-row">
              <Button
                type="primary"
                data-testid={"next-analysis-button"}
                onClick={next}
              >
                Next Analysis
              </Button>
              <Button data-testid="refresh-button" onClick={execute}>
                Refresh
              </Button>
            </div>
          </div>
        }
        style={{ minHeight: "420px" }}
        loading={isLoadingOverall}
      >
        <Carousel
          ref={carouselRef}
          data-testid={"pink-carousell"}
          className="bg-white"
        >
          <div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={processedAnalysisData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis dataKey="sentimentAnalysisScore" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Sentiment Analysis Score"
                  fill="#BB6192"
                  stroke="#BB6192"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-around items-center w-full h-full">
            {statistics.map((item: any) => (
              <Statistic
                key={item.name}
                data-testid={item.name}
                title={convertToName(item.name)}
                value={item.value}
                precision={3}
                valueStyle={valueStyle(item.value)}
                prefix={prefix(item.value)}
              />
            ))}
          </div>
        </Carousel>
      </Card>
    </div>
  );
};

export default AnalysisBar;
