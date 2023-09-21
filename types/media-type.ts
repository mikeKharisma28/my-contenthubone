type MediaResult = {
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
export default MediaResult;

export type Media = {
  results: MediaResult[];
};
