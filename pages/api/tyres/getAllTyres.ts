import { GetAllTyres } from "@/lib/tyres/tyres-lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_request: NextApiRequest, response: NextApiResponse) {
    const data = await GetAllTyres();
    return response.status(200).json(data);
}