import MEDIA_QUERY from "../Common/media-query";

export const tyre_QUERY_BY_ID = `
    id
    name
    logo {
        results{
            ${MEDIA_QUERY}
        }
    }
    
`