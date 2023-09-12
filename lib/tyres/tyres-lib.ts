import qs from 'qs';

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

async function authenticate(): Promise<string> {
  const response = await fetch(`${process.env.CONTENT_MANAGEMENT_AUTH_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: `${process.env.SITECORE_CLIENT_ID}`,
      client_secret: `${process.env.SITECORE_CLIENT_SECRET}`,
      audience: `${process.env.SITECORE_AUDIENCE}`
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const tokenData = await response.json();
  const accessToken = tokenData.access_token;

  return accessToken;
}

async function fetchCMSItems(params: any) {
  const token = await authenticate();
  const url =
    `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/items?` +
    qs.stringify(params, { encodeValuesOnly: true });
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(
      `Content hub one returned ${response.status} ${response.statusText} for ${url}`
    );
  }
  return await response.json();
}

export default async function GetAllTyreWidths(): Promise<TyreWidth[]> {
  const { data } = await fetchCMSItems({
    'system.contentType.id': 'tyrewidth'
  });
  return data.map((item: any) => ({
    id: item.id,
    width: item.fields.width.value
  }));
}

export async function GetTyreProfilesByWidth(width_id: any): Promise<TyreProfile[]> {
  const { data } = await fetchCMSItems({
    'system.contentType.id': 'tyreprofile',
    // '': ''
  });
  return data.map((item: any) => ({
    id: item.id,
    profile: item.fields.profile.value
  }));
}

export async function GetTyreRimByProfile(profile_id: any): Promise<TyreRim[]> {
  const { data } = await fetchCMSItems({
    'system.contentType.id': 'tyrerim',
    // '': ''
  });
  return data.map((item: any) => ({
    id: item.id,
    rim: item.fields.size.value
  }));
}

export async function SearchTyres() {}
