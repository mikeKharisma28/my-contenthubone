import qs from 'qs';
import { getToken } from 'next-auth/jwt';

export interface TyreWidth {
  width: number;
}

export interface TyreProfile {
  profile: number;
}

export interface TyreRim {
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

export type SearchableTyreWidth = Pick<TyreWidth, 'width'>;
export type SearchableTyreProfile = Pick<TyreProfile, 'profile'>;
export type SearchableTyreRim = Pick<TyreRim, 'rim'>;

async function authenticate() {
    const url = `${process.env.CONTENT_MANAGEMENT_AUTH_URL}`;
    const response = await fetch(url, {
        method: "POST",
        // body: {
        
        // }
    })
}

async function fetchTyreWidths(params: any, token: any) {
  const url =
    `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/items?` + qs.stringify(params, { encodeValuesOnly: true });
  console.log('fetch tyres: ', url);
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Content hub one returned ${response.status} ${response.statusText} for ${url}`);
  }
  return await response.json();
}

export default async function GetAllTyreWidths(): Promise<SearchableTyreWidth[]> {
  const { data } = await fetchTyreWidths({
    'system.contentType.id': 'tyrewidth'
  }, '');
  return data.map(({ data }: any) => ({
    id: data.id,
    width: data.fields.width.value
  }));
}
