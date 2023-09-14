import MEDIA_QUERY from '../Common/media-query';

export const TYRE_QUERY = `
    id
    name
    type
    price
    width
    profile
    rimSize
    logo {
        results{
            ${MEDIA_QUERY}
        }
    }
    tyreImage{
        results{
            ${MEDIA_QUERY}
        }
    }
`;

export const ALL_TYRES_QUERY = `{
    data: allTyre {
        total
        results{
            ${TYRE_QUERY}
        }
    }
}
`;

export default ALL_TYRES_QUERY;
