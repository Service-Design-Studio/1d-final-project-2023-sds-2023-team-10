import VirtualList from "rc-virtual-list";
import { Layout, List, Avatar, Divider, Typography, Spin, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
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

const { Title } = Typography;

const AnalysisBar = ({
  selectedChatId,
  chatRoomData,
  fetchChatRoomData,
  loading,
}: any) => {
  const [userData, setUserData] = useState<any>();
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const opponentId =
    chatRoomData.user1_id == 1 ? chatRoomData.user2_id : chatRoomData.user1_id;

  const fetchUserData = async (userId: string) => {
    if (!userId) return;
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoadingUserData(false);
  };

  useEffect(() => {
    setIsLoadingUserData(true);
    fetchUserData(opponentId);
  }, [selectedChatId, chatRoomData]);

  if (loading || isLoadingUserData) {
    return <Spin></Spin>;
  }

  console.log("Chatroomdat", chatRoomData);

  // assuming messages are ordered by timestamp
  const messagesData = chatRoomData.messages.map((message: any) => ({
    timestamp: new Date(message.timestamp).toLocaleDateString(),
    sentimentAnalysisScore: message.sentiment_analysis_score,
  }));

  return (
    <div>
      <Title level={4}>User Profile</Title>
      {userData ? (
        <List
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
      ) : (
        <div>User Metadata not found.</div>
      )}
      <Title level={4}>Sentiment Analysis</Title>
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
    </div>
  );
};

export default AnalysisBar;
