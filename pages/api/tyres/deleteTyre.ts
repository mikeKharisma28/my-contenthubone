import { DeleteTyre } from '@/lib/tyres/tyres-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  id: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  if (_request.method !== 'DELETE') {
    return response.status(405).send({ message: 'Only DELETE requests allowed' });
  }
  try {
    if (!_request.body || typeof _request.body !== 'object' || !('id' in _request.body)) {
      return response.status(400).json({ message: 'Invalid request body' });
    }

    const { id } = _request.body;
    const data = await DeleteTyre(id);
    return response.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ message: 'Internal server error' });
  }
}
