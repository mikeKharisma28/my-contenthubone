import ALL_TYRES_QUERY from '@/graphQL/Tyres/tyres-query';
import {
  deleteContentItemRestAPI,
  fetchGraphQL,
  fetchRestAPI,
  postContentItemRestAPI,
  putContentItemRestAPI
} from '../Common/api';
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

// export async function CreateNewTyre(tyre: TyreDetail): Promise<any> {
export async function CreateNewTyre(
  paramName: string,
  paramType: string,
  paramPrice: number,
  paramWidth: number,
  paramProfile: number,
  paramRimSize: number
): Promise<any> {
  const tyreJson = {
    contentTypeId: 'tyre',
    // name: tyre.name,
    name: paramName,
    fields: {
      type: {
        // value: tyre.type,
        value: paramType,
        type: 'ShortText'
      },
      price: {
        // value: tyre.price,
        value: paramPrice,
        type: 'Integer'
      },
      width: {
        // value: tyre.width,
        value: paramWidth,
        type: 'Integer'
      },
      profile: {
        // value: tyre.profile,
        value: paramProfile,
        type: 'Integer'
      },
      rimSize: {
        // value: tyre.rimSize,
        value: paramRimSize,
        type: 'Integer'
      }
    }
  };

  const response = await postContentItemRestAPI(JSON.stringify(tyreJson));
  return response;
}

export async function UpdateTyre(
  paramId: string,
  paramName: string,
  paramType: string,
  paramPrice: number,
  paramWidth: number,
  paramProfile: number,
  paramRimSize: number
): Promise<any> {
  const tyreJson = {
    contentTypeId: 'tyre',
    id: paramId,
    name: paramName,
    fields: {
      type: {
        // value: tyre.type,
        value: paramType,
        type: 'ShortText'
      },
      price: {
        // value: tyre.price,
        value: paramPrice,
        type: 'Integer'
      },
      width: {
        // value: tyre.width,
        value: paramWidth,
        type: 'Integer'
      },
      profile: {
        // value: tyre.profile,
        value: paramProfile,
        type: 'Integer'
      },
      rimSize: {
        // value: tyre.rimSize,
        value: paramRimSize,
        type: 'Integer'
      }
    }
  };

  const response = await putContentItemRestAPI(paramId, JSON.stringify(tyreJson));
  return response;
}

export async function DeleteTyre(id: string): Promise<any> {
  const response = await deleteContentItemRestAPI(id);
  return response;
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
