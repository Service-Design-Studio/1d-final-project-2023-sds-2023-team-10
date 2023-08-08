import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { BACKEND_URL } from "@/components/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const {
      query: { id },
    } = req;
    try {
      const response = await axios.get(
        `${BACKEND_URL}/chat_rooms/${id}?withMessages=true`,
        {
          headers: {
            Authorization: req.headers.authorization,
            accept: "application/json",
          },
        }
      );
<<<<<<< HEAD

=======
>>>>>>> 6853ce97dbdee67d867406f2d7d8bd10eb7224ec

      const data = await response.data;
      return res.status(200).json(data);
    } catch (error) {
<<<<<<< HEAD

      return res.status(500).json({ error: error });
=======
      return res.status(error.response?.status || 500).json(error.response?.data || { error: "An error occurred" });
>>>>>>> 6853ce97dbdee67d867406f2d7d8bd10eb7224ec
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
