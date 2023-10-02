import { GenerateUploadLinks } from '@/lib/media/media-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  // requestId: string;
  // filename: string;
  // contentType: string;
  // contentLength: string;
  body: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  if (_request.method !== 'POST') {
    return response.status(405).send({ message: 'Only POST requests allowed' });
  }
  
  const data = await GenerateUploadLinks(JSON.stringify(_request.body));
  return response.status(200).json(data);
}
