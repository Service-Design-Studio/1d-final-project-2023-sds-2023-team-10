import { BACKEND_URL } from '@/components/api';
import { createNewMessage } from '@/pages/messages/components/MessagePanel';
import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { sendMessageToAPI } from '../messages/index.page';
import { MessageBeforeSend } from '@/types';

type ChatLogEntry = {
  role: string;
  content: string;
};

// Function to send messages to the Ruby backend
async function sendMessageToRubyBackend(message: MessageBeforeSend, authorizationHeader: string) {
  const headers = {
    Authorization: authorizationHeader,
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return await axios.post(`${BACKEND_URL}/messages`, JSON.stringify(message), { headers });
}

// Function to send a chat message to OpenAI's GPT
async function sendToOpenAI(chatLog: ChatLogEntry[]) {
  const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
  }));
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: chatLog,
    max_tokens: 150,
  });
  return response.data.choices[0].message.content;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chatLog, newMessage }: { chatLog: ChatLogEntry[]; newMessage: MessageBeforeSend } = req.body;

  if (req.method === 'POST') {
    // try {
    //   const openai = new OpenAIApi(new Configuration({
    //     apiKey: process.env.OPENAI_APIKEY
    //   }));

    //   console.log("chatroom bot 15: chatlog : ", chatLog)
    //   // Store users's message in ruby
    //   console.log("chatroom bot 19: userMessage : ", newMessage) 

    //   // const userMessageResponse = await axios.post(
    //   //   `${BACKEND_URL}/messages`,
    //   //   JSON.stringify(req.body),
    //   //   {
    //   //     headers: {
    //   //       Authorization: req.headers.authorization,
    //   //       accept: "application/json",
    //   //       "Content-Type": "application/json",
    //   //     },
    //   //   }
    //   // );

    //   // const data = await userMessageResponse.data;
    //   // return res.status(200).json(data);


    //   const userMessageRes = 
    //   console.log("chatroom bot 22: userMessageRes : ", userMessageRes)


    //   const response = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     messages: chatLog,
    //   });

    //   const botMessage = response.data.choices[0].message.content;




    //   // Send the bot's message in the response
    //   res.status(200).json({ message: botMessage });
    // } catch (error) {
    //   res.status(500).json({ message: 'Error in OpenAI API call' });
    // }
    try {
      const { chatLog, newMessage }: { chatLog: ChatLogEntry[]; newMessage: MessageBeforeSend } = req.body;

      if (req.headers.authorization) {
        await sendMessageToRubyBackend(newMessage, req.headers.authorization);
        console.log("chatroom bot 22: newMessage : ", newMessage)
      } else {
        // Handle the case where authorization is undefined
        // You might want to return an error response here
        return res.status(401).json({ error: "Authorization header missing" });
      }

      // Send message to OpenAI and get response
      const botMessage = await sendToOpenAI(chatLog);

      // Create bot message object
      const botMessageData: MessageBeforeSend = {
        content: botMessage!,
        sender_id: -1,
        chat_room_id: newMessage.chat_room_id,
        message_type: 'text',
        read: false,
        receiver_id: newMessage.sender_id,
        sentiment_analysis_score: null,
        timestamp: new Date().toISOString(),
      };
      console.log("chatroom bot 22: botMessageData : ", botMessageData)

      // Send bot's message to Ruby backend
      await sendMessageToRubyBackend(botMessageData, req.headers.authorization);

      // Respond to the frontend
      res.status(200).json({ message: botMessage });
    } catch (error) {
      res.status(500).json({ message: 'Error in processing the request' });
    }

  } else {
    // Handle any HTTP methods other than POST here
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
