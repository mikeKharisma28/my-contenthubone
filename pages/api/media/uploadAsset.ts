import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { UploadAssets } from '@/lib/media/media-lib';

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '8mb'
  }
};

async function handleFormReq(_request: NextApiRequest, response: NextApiResponse) {
  const form = formidable({ multiples: true });
  const formData = new Promise<any>((resolve, reject) => {
    form.parse(_request, async (error, fields, files) => {
      if (error) {
        reject('Error');
      }
      resolve({ fields, files });
    });
  });

  try {
    const { fields, files } = await formData;
    try {
      await UploadAssets(fields, files);
      response.status(201).send({ status: 'Files uploaded' });
      return;
    } catch (error) {
      response.status(500).send({ status: 'Something went wrong' });
      return;
    }
  } catch (error) {
    response.status(400).send({ status: 'Invalid body request' });
    return;
  }
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'PUT') {
    return response.status(405).send({ message: 'Only PUT requests allowed' });
  } else {
    await handleFormReq(request, response);
  }
}
