import qs from 'qs';

// private functions
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

// public functions
export async function fetchGraphQL(query: string) {
  return fetch(
    (process.env.NODE_ENV === 'production'
      ? process.env.SITECORE_ENDPOINT_URL_PROD
      : process.env.SITECORE_ENDPOINT_URL_DEV) as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GQL-Token': (process.env.NODE_ENV === 'production'
          ? process.env.SITECORE_DEV_AUTH_TOKEN_PROD
          : process.env.SITECORE_DEV_AUTH_TOKEN_DEV) as string
      },
      body: JSON.stringify({ query })
    }
  ).then((response) => response.json());
}

export async function fetchRestAPI(params: any) {
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

export async function postContentItemRestAPI(jsonBody: string) {
  const token = await authenticate();
  const url = `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/items`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ jsonBody }),
  });

  if (!response.ok) {
    throw new Error(
      `Content hub one returned ${response.status} ${response.statusText} for ${url}`
    );
  }
  return await response.json();
}