import { GeneratedUploadLinks, MediaResult } from '@/types/media-type';
import {
  completeUpload,
  fetchMediaItemRestAPI,
  generateMediaUploadLink,
  postMediaItemRestAPI,
  uploadAssets
} from '../Common/api';

export default async function FetchAllMediaItems(): Promise<MediaResult[]> {
  const data = await fetchMediaItemRestAPI();
  return data.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    fileName: item.file.name,
    fileUrl: item.file.link.uri,
    description: item.description,
    fileWidth: item.file.dimensions.width,
    fileHeight: item.file.dimensions.height,
    fileId: item.file.link.id,
    fileSize: item.file.size,
    fileType: item.file.type
  }));
}

export async function GenerateUploadLinks(paramBodyReq: string) {
  const resLinks = await generateMediaUploadLink(paramBodyReq);
  const generatedLinks: GeneratedUploadLinks[] = resLinks.responses.map((response: any) => ({
    link: response.link,
    fileId: response.fileId,
    requestId: response.requestId
  }));

  return generatedLinks;
}

export async function UploadAssets(fields: any, files: any) {
  await uploadAssets(fields, files);
}

export async function CompleteUpload(contentType: string, contentLength: string, fileId: string) {
  const bodyFileId = {
    fileId: fileId
  };
  const res = await completeUpload(contentType, contentLength, JSON.stringify(bodyFileId));
  return res;
}

export async function CreateMediaItem(newFileId: string, name: string, desc: string) {
  const body = {
    name: name,
    description: desc,
    fileId: newFileId
  };

  const res = await postMediaItemRestAPI(JSON.stringify(body));
  // return res.map((item: any) => ({
  //   id: item.id,
  //   name: item.name,
  //   fileName: item.file.name,
  //   fileUrl: item.file.link.uri,
  //   description: item.description,
  //   fileWidth: item.file.dimensions.width,
  //   fileHeight: item.file.dimensions.height,
  //   fileId: item.file.link.id,
  //   fileSize: item.file.size,
  //   fileType: item.file.type
  // }));
  return res;
}
