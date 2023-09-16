import { GetAllTyres } from '@/lib/tyres/tyres-lib';
import TyreDetail from '@/types/tyre-type';
import { Label, TextInput } from 'flowbite-react';
import { BiDollar } from 'react-icons/bi';

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
    paths: tyreList.map(({ id }) => `/tyres/update/${id}`) ?? [],
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
    <div className="flex flex-col mt-10 mx-16 gap-10">
      <div>
        <Label htmlFor="Title" value="Tyre Detail" className="text-2xl" />
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Tyre Name"
                />
              </div>
              <TextInput 
                id="name"
                placeholder="Input your tyre name"
                required
                type="text"
                defaultValue={tyre.name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="type"
                  value="Type"
                />
              </div>
              <TextInput 
                id="type"
                placeholder="185/55R15 85V"
                required
                type="text"
                defaultValue={tyre.type}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="price"
                  value="Price"
                />
              </div>
              <TextInput 
                icon={BiDollar}
                id="price"
                placeholder="150"
                required
                type="number"      
                defaultValue={tyre.price}    
              />
            </div>
          </div>
          
          <div className="w-1/2 flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="width"
                  value="Width"
                />
              </div>
              <TextInput 
                id="width"
                placeholder="e.g 185"
                required
                type="number"      
                defaultValue={tyre.width}    
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="profile"
                  value="Profile"
                />
              </div>
              <TextInput 
                id="profile"
                placeholder="e.g 55"
                required
                type="number"      
                defaultValue={tyre.profile}    
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="width"
                  value="Width"
                />
              </div>
              <TextInput 
                id="width"
                placeholder="e.g 15"
                required
                type="number"      
                defaultValue={tyre.rimSize}    
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          
        </div>
      </form>
    </div>
  );
};

export default Page;
