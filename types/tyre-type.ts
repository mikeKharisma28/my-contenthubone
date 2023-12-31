import Media from './media-type';

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
