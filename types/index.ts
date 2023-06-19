export type Message = {
  senderId: string;
  receiverId: string;
  timestamp: Date;
  sentimentAnalysisScore: number;
  content: "Hello, how are you?";
  type: "text";
};

export type ChatRoom = {
  overallSentimentAnalysisScore: number; // PENDING
  // can ask Patrick to build Cloud Function, every 5 mnutes calls every chat rooom
  chatRoomId: string;
  dateCreated: Date;
  participants: string[]; // id of each person
  isAIChat: boolean;
  isGroupChat: boolean;
  messages: Message[];
};

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
