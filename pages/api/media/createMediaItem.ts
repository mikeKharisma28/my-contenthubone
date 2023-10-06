import { CreateMediaItem } from '@/lib/media/media-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  fileId: string;
  name: string;
  description: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  if (_request.method !== 'POST') {
    return response.status(405).send({ message: 'Only POST requests allowed' });
  } else {
    const { fileId, name, description } = _request.body;
    const data = await CreateMediaItem(fileId, name, description);
    return response.status(201).json(data);
  }
}
