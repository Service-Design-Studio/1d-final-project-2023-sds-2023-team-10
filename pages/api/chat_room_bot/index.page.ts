import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chatLog } = req.body;

  if (req.method === 'POST') {
    try {
      const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_APIKEY
      }));

  
      console.log("chatLog : ",chatLog)
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: chatLog,
      });

      const botMessage = response.data.choices[0].message.content;




      // Send the bot's message in the response
      res.status(200).json({ message: botMessage });
    } catch (error) {
      res.status(500).json({ message: 'Error in OpenAI API call' });
    }
  } else {
    // Handle any HTTP methods other than POST here
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
