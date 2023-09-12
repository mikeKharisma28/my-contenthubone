import { GetTyreRimByProfile } from '@/lib/tyres/tyres-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  profileId: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  const { profileId } = _request.query;
  const data = await GetTyreRimByProfile(profileId);
  return response.status(200).json(data);
}
