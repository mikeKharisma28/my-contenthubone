import { GetTyreById } from '@/lib/tyres/tyres-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  id: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  const { id } = _request.query;
  const data = await GetTyreById(id);
  return response.status(200).json(data);
}
