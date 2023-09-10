import { GetTyreProfilesByWidth } from '@/lib/tyres/tyres-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  widthId: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  const { widthId } = _request.query;
  console.log(widthId);
  const data = await GetTyreProfilesByWidth(widthId);
  return response.status(200).json(data);
}
