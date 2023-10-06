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

export type ReqUploadLinks = {
  requestId: string;
  filename: string;
  contentType: string;
  contentLength: string;
};

export type GeneratedUploadLinks = {
  link: string;
  fileId: string;
  requestId: string;
};

export type AssetUpload = {
  uploadLink: string;
  file: File;
};

export type AssetUploaded = {
  fileId: string;
};
