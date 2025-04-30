import { NextApiRequest, NextApiResponse } from 'next';
import { Valtown } from 'valtown-sdk';

const apiKey = process.env.VALTOWN_API_KEY || '';
const valtown = new Valtown(apiKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { model, messages } = req.body;

      const valtownModel = valtown.getGenerativeModel({ model });

      const valtownStream = await valtownModel.generateContentStream(
        messages[0].content + "\nPlease ONLY return code, NO backticks or language names. Don't start with ```typescript or ```javascript or ```tsx or ```."
      );

      const chunks = [];
      for await (const chunk of valtownStream.stream) {
        chunks.push(chunk.text());
      }

      res.status(200).json({ result: chunks.join('') });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
