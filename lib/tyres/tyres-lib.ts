import { fetchRestAPI } from '../Common/api';

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

export interface TyreDetail {
  sku: string;
  name: string;
  logo: string;
  type_detail: string;
  overview: string;
  features_benefits: string;
  images: string[];
  price: number;
  load: string;
  speed: string;
  od: string;
  type: string;
  tyre_width: string;
  tyre_profile: string;
  tyre_rim: string;
}

export interface PaginatedTyreDetail {
  pageCount: number;
  tyreDetail: TyreDetail[];
}

// export type SearchableTyreWidth = Pick<TyreWidth, 'id'>;
// export type SearchableTyreProfile = Pick<TyreProfile, 'profile'>;
// export type SearchableTyreRim = Pick<TyreRim, 'rim'>;
export default async function GetAllTyreWidths(): Promise<TyreWidth[]> {
  const { data } = await fetchRestAPI({
    'system.contentType.id': 'tyrewidth'
  });
  return data.map((item: any) => ({
    id: item.id,
    width: item.fields.width.value
  }));
}

export async function GetTyreProfilesByWidth(width_id: any): Promise<TyreProfile[]> {
  const { data } = await fetchRestAPI({
    'system.contentType.id': 'tyreprofile'
    // '': ''
  });
  return data.map((item: any) => ({
    id: item.id,
    profile: item.fields.profile.value
  }));
}

export async function GetTyreRimByProfile(profile_id: any): Promise<TyreRim[]> {
  const { data } = await fetchRestAPI({
    'system.contentType.id': 'tyrerim'
    // '': ''
  });
  return data.map((item: any) => ({
    id: item.id,
    rim: item.fields.size.value
  }));
}

export async function SearchTyres() {}
