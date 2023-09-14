import ALL_TYRES_QUERY, { TYRE_QUERY } from '@/graphQL/Tyres/tyres-query';
import { fetchGraphQL, fetchRestAPI } from '../Common/api';
import TyreDetail, { TyreOverview, TyreProfile, TyreRim, TyreWidth } from '@/types/tyre-type';

// export interface TyreWidth {
//   id: string;
//   width: number;
// }

// export interface TyreProfile {
//   id: string;
//   profile: number;
// }

// export interface TyreRim {
//   id: string;
//   rim: number;
// }

// export interface TyreOverview {
//   id: string;
//   name: string;
//   type: string;
//   imageUrl: string;
// }

// export interface TyreDetail {
//   id: string;
//   name: string;
//   type: string;
//   price: number;
//   width: number;
//   profile: number;
//   rimSize: number;
//   logoUrl: string[];
//   imageUrl: string[];
// }

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
export async function SearchTyres(width: number, profile: number, rim: number) {
  const tyreQuery = `{
    data: allTyre(where: {width_eq: ${width} profile_eq: ${profile} rimSize_eq: ${rim}}){
      ${ALL_TYRES_QUERY}
    }
  }`

  const data = await fetchGraphQL(tyreQuery);
  return data.data.data;
}

export async function GetTyreById(id: string): Promise<TyreDetail> {
  const tyreQuery = `{
    data: tyre(id: "${id}")
    {
      ${TYRE_QUERY}
    }
  }
  `;
  
  const data = await fetchGraphQL(tyreQuery);
  return data.data.data;
  // return data.data.map((data: any) => ({
  //   id: data.id,
  //   name: data.name,
  //   type: data.type,
  //   price: data.price,
  //   width: data.width,
  //   profile: data.profile,
  //   rimSize: data.rimSize,
  //   logoUrl: data.logo.results.map((logoUrl: {
  //     result: {
  //       fileUrl: any;
  //     };
  //   }) => {
  //     return logoUrl.result.fileUrl;
  //   }),
  //   tyreImages: data.tyreImage.results.map((imageUrl: {
  //     result: {
  //       fileUrl: any;
  //     };
  //   }) => {
  //     const url = imageUrl.result.fileUrl;
  //   }),
  // }));
}

export async function GetAllTyres(): Promise<TyreOverview[]> {
  const tyreQuery = `{
    data: allTyre {
      ${ALL_TYRES_QUERY}
    }
  }`
  const data = await fetchGraphQL(tyreQuery);
  return data.data.data;
}

function extractTyre({ data }: { data: TyreOverview }){
  return data.results.map((tyre: TyreDetail) => {
    return tyre;
  });
}