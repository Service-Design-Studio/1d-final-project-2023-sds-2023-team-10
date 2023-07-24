import { List, Card } from "antd";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import axios from "../axiosFrontend";
import useAsync from "../../../components/useAsync";

export const useChatRoomMessages = (selectedChatId: string) => {
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

  return { chatRoomMessagesStatus, chatRoomMessagesData, opponentId };
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
  const { chatRoomMessagesStatus, chatRoomMessagesData, opponentId } =
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

  return (
    <div>
      <Card title="User Profile" loading={isLoadingOverall}>
        {userData && (
          <List
            loading={isLoadingOverall}
            className="bg-white"
            bordered
            dataSource={[
              `Name: ${userData.first_name} ${userData.second_name}`,
              `Email: ${userData.email}`,
              `Username: ${userData.username}`,
              `Occupation: ${userData.occupation}`,
              `Age: ${userData.age}`,
              `Gender: ${userData.gender}`,
              `Phone number: ${userData.phone_number}`,
              // ... and so on for other details
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        )}
      </Card>

      <Card
        title="Sentiment Analysis"
        style={{ minHeight: "400px" }}
        loading={isLoadingOverall}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={messagesData}
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
            <Line
              type="monotone"
              dataKey="sentimentAnalysisScore"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalysisBar;
