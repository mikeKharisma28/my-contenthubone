import { GetAllTyres } from '@/lib/tyres/tyres-lib';
import TyreDetail from '@/types/tyre-type';

type Params = {
  params: {
    id: string;
  };
};
export async function getStaticProps({ params }: Params) {
  const baseUrl = (
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_PROD
      : process.env.NEXT_PUBLIC_API_DEV
  ) as string;
  const endpoint = `/api/tyres/getTyreById?id=${params.id}`;
  const response = await fetch(baseUrl + endpoint);
  const tyreData = await response.json();
  return {
    props: { tyreData },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const tyreList = await GetAllTyres();

  return {
    paths: tyreList.map(({ id }) => `/tyres/detail/${id}`) ?? [],
    fallback: true
  };
}
type Props = {
  tyreData: TyreDetail[];
};

const Page = ({ tyreData }: Props) => {
  // console.log("Tyre data loaded in page: " + tyreData);
  const tyre = tyreData[0];
  return (
    <div 
        className="mt-10 my-10"
    >
        
    </div>
  );
};

export default Page;
