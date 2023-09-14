import ALL_TYRES_QUERY, { TYRE_QUERY } from '@/graphQL/Tyres/tyres-query';
import { fetchGraphQL, fetchRestAPI } from '../Common/api';

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

// Functions using RestAPI
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


// Functions using GraphQL 
export async function SearchTyres() {}

export async function GetTyreById(id: string): Promise<any> {
  const tyreQuery = `{
    data: tyre(id: "${id}")
    {
      ${TYRE_QUERY}
    }
  }
  `;
  
  const data = await fetchGraphQL(tyreQuery);
  return data.data.data;
}

export async function GetAllTyres(): Promise<any> {
  const data = await fetchGraphQL(ALL_TYRES_QUERY);
  return data.data.data;
}