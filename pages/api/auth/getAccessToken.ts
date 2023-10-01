import { Authenticate } from '@/lib/Common/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_request: NextApiRequest, response: NextApiResponse) {
  const data = await Authenticate();
  return response.status(200).json(data);
}
