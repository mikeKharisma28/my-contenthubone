import { UpdateTyre } from '@/lib/tyres/tyres-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  id: string;
  name: string;
  type: string;
  price: string;
  width: string;
  profile: string;
  rimSize: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  if (_request.method !== 'PUT') {
    return response.status(405).send({ message: 'Only PUT requests allowed' });
  }
  try {
    if (
      !_request.body ||
      typeof _request.body !== 'object' ||
      !('id' in _request.body) ||
      !('name' in _request.body) ||
      !('type' in _request.body) ||
      !('price' in _request.body) ||
      !('width' in _request.body) ||
      !('profile' in _request.body) ||
      !('rimSize' in _request.body)
    ) {
      return response.status(400).json({ message: 'Invalid request body' });
    }

    const { id, name, type, price, width, profile, rimSize } = _request.body;
    const data = await UpdateTyre(id, name, type, price, width, profile, rimSize);
    return response.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ message: 'Internal server error' });
  }
}
