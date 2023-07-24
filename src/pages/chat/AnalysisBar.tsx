import VirtualList from "rc-virtual-list";
import {
  Layout,
  List,
  Avatar,
  Divider,
  Typography,
  Spin,
  Badge,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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
import axios from "../axiosFrontend";

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
    chatRoomData.user1_id === 1 ? chatRoomData.user2_id : chatRoomData.user1_id;

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

  // assuming messages are ordered by timestamp
  const messagesData = chatRoomData?.messages?.map((message: any) => ({
    timestamp: new Date(message.timestamp).toLocaleDateString(),
    sentimentAnalysisScore: message.sentiment_analysis_score,
  }));

  return (
    <div>
      {userData ? (
        <Card title="User Profile">
          <List
            loading={false}
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
        </Card>
      ) : (
        <div>User Metadata not found.</div>
      )}
      <Card
        title="Sentiment Analysis"
        loading={false}
        style={{ minHeight: "400px" }}
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
