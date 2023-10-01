import MediaResult, { MediaGeneratedUploadLinks, MediaReqUploadLinks } from '@/types/media-type';
import { fetchMediaItemRestAPI, generateUploadLinksBulk } from '../Common/api';

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

// export async function UploadMediaItems(paramBodyReq: MediaReqUploadLinks[], paramFormData: FormData): Promise<MediaResult[]> {
export async function UploadMediaItems(paramBodyReq: MediaReqUploadLinks[], paramFormData: FormData): Promise<any> {
  // Generate upload links
  const resLinks = await generateUploadLinksBulk(paramBodyReq);
  const generatedLinks: MediaGeneratedUploadLinks[] = resLinks.responses.map((response: any) => ({
    link: response.link,
    fileId: response.fileId,
    requestId: response.requestId
  }));

  // Upload asset

  // Complete upload
  // const data = await fetchMediaItemRestAPI();

  // Create media items
  // return data.data.map((item: any) => ({
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
  return generatedLinks;
}
