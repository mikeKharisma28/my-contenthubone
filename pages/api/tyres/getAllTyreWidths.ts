import GetTyreWidths from '@/lib/tyres/tyres-lib';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_request: NextApiRequest, response: NextApiResponse) {
  const data = await GetTyreWidths();
  return response.status(200).json(data);
}
