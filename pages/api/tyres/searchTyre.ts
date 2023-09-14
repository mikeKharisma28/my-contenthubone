import { SearchTyres } from "@/lib/tyres/tyres-lib";
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from "querystring";

interface ContentHubQuery extends ParsedUrlQuery {
    width: string;
    profile: string;
    rim: string;
}
  
interface ContentHubParams extends NextApiRequest {
    query: ContentHubQuery;
}

export default async function handler(_request: ContentHubParams, response: NextApiResponse) {
    const { width, profile, rim } = _request.query;
    const data = await SearchTyres(Number(width), Number(profile), Number(rim));
    console.log("Data from SearchTyres API: ", data);
    return response.status(200).json(data);
}