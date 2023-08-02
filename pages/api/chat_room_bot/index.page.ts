import {NextApiRequest, NextApiResponse} from 'next';
const {Configuration, OpenAIApi} = require('openai');
const openai = new OpenAIApi(new Configuration({
  apiKey: "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"
}));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {message} = req.body;
  
  if (req.method === 'POST') {
    try {
      // Call the OpenAI API
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        max_tokens: 200,
        temperature: 1.0
      });

      const botMessage = response.data.choices[0].text;
      console.log(botMessage)
      
      // Send the bot's message in the response
      res.status(200).json({message: botMessage});
    } catch (error) {
        console.error('OpenAI API call failed:');
        console.error(error);
        res.status(500).json({message: 'Error in OpenAI API call'});
    }
  } else {
    // Handle any HTTP methods other than POST here
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`); // HTTP status 405 for method not allowed
  }
}