import FetchAllMediaItems from '@/lib/media/media-lib';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_request: NextApiRequest, response: NextApiResponse) {
  const data = await FetchAllMediaItems();
  return response.status(200).json(data);
}
