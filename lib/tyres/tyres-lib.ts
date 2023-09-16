import ALL_TYRES_QUERY from '@/graphQL/Tyres/tyres-query';
import { fetchGraphQL, fetchRestAPI } from '../Common/api';
import TyreDetail, { TyreOverview, TyreProfile, TyreRim, TyreWidth } from '@/types/tyre-type';

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
export async function SearchTyres(
  width: number,
  profile: number,
  rim: number
): Promise<TyreDetail[]> {
  const tyreQuery = `{
    data: allTyre(where: {width_eq: ${width} profile_eq: ${profile} rimSize_eq: ${rim}}){
      ${ALL_TYRES_QUERY}
    }
  }`;

  const data = await fetchGraphQL(tyreQuery);
  return extractTyre(data.data);
}

export async function GetTyreById(id: string): Promise<TyreDetail[]> {
  const tyreQuery = `{
    data: allTyre(where: {id_eq: "${id}"}){
      ${ALL_TYRES_QUERY}
    }
  }`;

  const data = await fetchGraphQL(tyreQuery);
  return extractTyre(data.data);
}

export async function GetAllTyres(): Promise<TyreDetail[]> {
  const tyreQuery = `{
    data: allTyre {
      ${ALL_TYRES_QUERY}
    }
  }`;
  const data = await fetchGraphQL(tyreQuery);
  return extractTyre(data.data);
}

function extractTyre({ data }: { data: TyreOverview }) {
  return data.results.map((tyre: TyreDetail) => {
    return tyre;
  });
}
