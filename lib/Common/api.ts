import { ReqUploadLinks, AssetUpload } from '@/types/media-type';
import qs from 'qs';

// private functions
async function Authenticate(): Promise<string | undefined> {
  try {
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

    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    return accessToken;
  } catch {
    return undefined;
  }
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

//#region functions to call APIs for Content Items
export async function fetchContentItemRestAPI(params: any) {
  const token = await Authenticate();
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
  // console.log(jsonBody);
  const token = await Authenticate();
  const url = `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/items`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: jsonBody
  });

  if (!response.ok) {
    throw new Error(
      `Content hub one returned ${response.status} ${response.statusText} for ${url}`
    );
  }
  return await response.json();
}

export async function putContentItemRestAPI(contentItemId: string, jsonBody: string) {
  const token = await Authenticate();
  const url = `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/items/${contentItemId}`;
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: jsonBody
  });

  if (!response.ok) {
    throw new Error(
      `Content hub one returned ${response.status} ${response.statusText} for ${url}`
    );
  }
  return await response.json();
}

export async function deleteContentItemRestAPI(contentItemId: string) {
  const token = await Authenticate();
  const url = `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/items/${contentItemId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(
      `Content hub one returned ${response.status} ${response.statusText} for ${url}`
    );
  }
}
//#endregion

//#region functions to call APIs for Media Items
export async function fetchMediaItemRestAPI() {
  const token = await Authenticate();
  const url = `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/media`;
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

export async function generateMediaUploadLink(paramBodyReq: string) {
  const token = await Authenticate();
  const url = `${process.env.MEDIA_UPLOAD_URL}/api/media/v1/upload/link/generate/bulk`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: paramBodyReq
  });

  return await response.json();
}

// export async function uploadAssets(fields: formidable.Fields<string>, files: formidable.Files<string>) {
export async function uploadAssets(fields: any, files: any) {
  const dataAssets: AssetUpload[] = [];
  for (let i = 0; i < Object.keys(fields).length; i++) {
    const key = `tyreUploadLink[${i}]`; // Assuming keys are in this format
    const uploadLink = fields[key][0];
    const fileKey = `tyreImage[${i}]`; // Assuming keys are in this format
    const image: File = files[fileKey][0];

    const data: AssetUpload = {
      uploadLink: uploadLink,
      file: image
    };

    dataAssets.push(data);
  }

  for (var i = 0; i < dataAssets.length; i++) {
    const formData = new FormData();
    formData.append("file", dataAssets[i].file);

    const response = await fetch(dataAssets[i].uploadLink, {
      method: 'PUT',
      headers: {
        'x-mms-content-type': `${dataAssets[i].file.type}`,
        'x-mms-content-length': '1024',
        // 'x-ms-blob-type': 'BlockBlob',
        'Content-Type': `${dataAssets[i].file.type}`,
        // 'Application': 'application/json'
      },
      body: dataAssets[i].file
    });
    // console.log('response for uploading: ', response);
    if (response.status !== 201) {
      throw new Error(`Content hub one returned status ${response.status}: ${response.statusText}`);
    }
  }
}

export async function completeUpload(contentType: string, contentLength: string, bodyReq: string) {
  const token = await Authenticate();
  const url = `${process.env.MEDIA_UPLOAD_URL}/api/media/v1/upload/link/complete`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-mms-content-type': `${contentType}`,
      'x-mms-content-length': `${contentLength}`,
      'Content-Type': 'application/json'
    },
    body: bodyReq
  });

  return await response.json();
}

export async function postMediaItemRestAPI(jsonBody: string) {
  // console.log(jsonBody);
  const token = await Authenticate();
  const url = `${process.env.CONTENT_MANAGEMENT_BASE_URL}/api/content/v1/media`;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      Accept: 'text/plain'
    },
    body: jsonBody
  });

  if (!response.ok) {
    throw new Error(
      `Content hub one returned ${response.status} ${response.statusText} for ${url}`
    );
  }
  return await response.json();
}
//#endregion
