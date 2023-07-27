/* eslint-disable indent */
/* eslint-disable consistent-return */
import { List, Card, Typography, Button } from "antd";

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
import { useEffect } from "react";
import axios from "../axiosFrontend";
import useAsync from "../../../components/useAsync";

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

const AnalysisBar = ({ selectedChatId }: { selectedChatId: string }) => {
  const { chatRoomMessagesStatus, chatRoomMessagesData, opponentId, execute } =
    useChatRoomMessages(selectedChatId);
  const { userDataStatus, userData } = useUserMetadata(opponentId);

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
      <Card
        title={
          <div className="flex flex-row justify-between min-w-full">
            <Text>Sentiment Analysis</Text>
            <Button onClick={execute}>Refresh</Button>
          </div>
        }
        style={{ minHeight: "420px" }}
        loading={isLoadingOverall}
      >
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
      </Card>
    </div>
  );
};

export default AnalysisBar;
