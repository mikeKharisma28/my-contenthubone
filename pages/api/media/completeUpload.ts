import { CompleteUpload } from '@/lib/media/media-lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface ContentHubQuery extends ParsedUrlQuery {
  contentType: string;
  contentLength: string;
  fileId: string;
}

interface ContentHubParams extends NextApiRequest {
  query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
  if (_request.method !== 'POST') {
    return response.status(405).send({ message: 'Only POST requests allowed' });
  } else {
    const { contentType, contentLength, fileId } = _request.body;
    const data = await CompleteUpload(contentType, contentLength, fileId);
    return response.status(201).json(data);
  }
}
