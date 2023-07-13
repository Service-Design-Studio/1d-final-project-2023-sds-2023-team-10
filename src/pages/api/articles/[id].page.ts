import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  console.log("Next.js API route received - id:", id, "method:", method);

  if (method === "DELETE") {
    try {
      const result = await axios.delete(
        `https://rubybackend-xnabw36hha-as.a.run.app/articles/${id}`,
        {
          headers: {
            Authorization: req.headers.authorization,
            accept: "application/json",
          },
        }
      );

      return res.status(200).json(result.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    // Unexpected request method
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
