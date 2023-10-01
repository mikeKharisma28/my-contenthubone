type Media = {
  results: MediaResult[];
};
export default Media;

export type MediaResult = {
  id: string;
  name: string;
  fileName: string;
  fileUrl: string;
  description: string;
  fileWidth: number;
  fileHeight: number;
  fileId: string;
  fileSize: number;
  fileType: string;
};

export type MediaReqUploadLinks = {
  requestId: string;
  filename: string;
  contentType: string;
  contentLength: string;
};

export type MediaGeneratedUploadLinks = {
  link: string;
  fileId: string;
  requestId: string;
};
