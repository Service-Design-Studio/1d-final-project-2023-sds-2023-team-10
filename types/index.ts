export type Highlight = {
  title: string;
  content: string;
  id: string;
  date: string;
};
// export type Message = {
//   senderId: string;
//   receiverId: string;
//   timestamp: Date;
//   sentimentAnalysisScore: number;
//   content: "Hello, how are you?";
//   type: "text";
// };

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  timestamp: string;
  sentiment_analysis_score: number;
  content: string;
  message_type: string;
  chat_room_id: number;
  read: boolean;
  created_at: string;
  updated_at: string;
}

// export type ChatRoom = {
//   overallSentimentAnalysisScore: number; // PENDING
//   // can ask Patrick to build Cloud Function, every 5 mnutes calls every chat rooom
//   chatRoomId: string;
//   dateCreated: Date;
//   participants: string[]; // id of each person
//   isAIChat: boolean;
//   isGroupChat: boolean;
//   messages: Message[];
// };

export interface ChatRoom {
  id: number;
  overall_sentiment_analysis_score: number;
  date_created: string;
  is_ai_chat: boolean;
  is_group_chat: boolean;
  user1_id: number;
  user2_id: number;
  created_at: string;
  updated_at: string;
  opponent_id: number;
  opponent_first_name: string;
  opponent_second_name: string;
  opponent_picture: string;
  last_message: Message;
  unread_messages_count: number;
}

export type User = {
  type: "admin" | "client" | "ai";
  id: string;
  profile?: string;
  properties?: {
    // Need to discuss this
  };
  username?: string;
  phoneNumber?: string;
};

export type Article = {
  id: number;
  published_date: Date;
  created_date: Date;
  title: string;
  author: string;
  img_url: string;
  url: string;
  user_group: string[];
};
