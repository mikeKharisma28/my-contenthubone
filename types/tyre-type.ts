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

type Media = {
  results: MediaResult[];
};

type TyreDetail = {
  id?: string;
  name: string;
  type: string;
  price: number;
  width: number;
  profile: number;
  rimSize: number;
  logo?: Media;
  tyreImage?: Media;
};
export default TyreDetail;

export type TyreOverview = {
  total: number;
  results: TyreDetail[];
};

export interface TyreWidth {
  id: string;
  width: number;
}

export interface TyreProfile {
  id: string;
  profile: number;
}

export interface TyreRim {
  id: string;
  rim: number;
}
