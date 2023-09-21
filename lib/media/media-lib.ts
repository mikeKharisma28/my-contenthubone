import MediaResult from "@/types/media-type";
import { fetchMediaItemRestAPI } from "../Common/api";

export default async function FetchAllMediaItems(): Promise<MediaResult[]> {
    const data = await fetchMediaItemRestAPI();
    return data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        fileName: item.file.name,
        fileUrl: item.file.link.url,
        description: item.description,
        fileWidth: item.file.dimensions.width,
        fileHeight: item.file.dimensions.height,
        fileId: item.file.link.id,
        fileSize: item.file.size,
        fileType: item.file.type
    }));
}