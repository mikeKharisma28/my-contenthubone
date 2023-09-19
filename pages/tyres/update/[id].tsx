import { GetAllTyres } from '@/lib/tyres/tyres-lib';
import TyreDetail from '@/types/tyre-type';
import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { BiDollar, BiArrowBack, BiSolidSave } from 'react-icons/bi';

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
  const tyre = tyreData[0];

  const { register, handleSubmit } = useForm();

  const onSubmit = (formData: any) => {
    (async () => {
      const url = '/api/tyres/updateTyre';
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: tyre.id,
          name: formData['name'],
          type: formData['type'],
          price: formData['price'],
          width: formData['width'],
          profile: formData['profile'],
          rimSize: formData['rimSize']
        })
      });
      if (res.ok) {
        Router.push({
          pathname: '/tyres/admin'
        });
      }
    })();
  };

  return (
    <div className="flex flex-col mt-10 mx-16 gap-10">
      <div className="flex flex-row items-center gap-3">
        <Link href="/tyres/admin" className="text-2xl">
          <BiArrowBack />
        </Link>
        <Label htmlFor="Title" value="Tyre Detail" className="text-2xl" />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Tyre Name" />
              </div>
              <TextInput
                id="name"
                placeholder="Input your tyre name"
                required
                type="text"
                {...register('name')}
                defaultValue={tyre.name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Type" />
              </div>
              <TextInput
                id="type"
                placeholder="185/55R15 85V"
                required
                type="text"
                {...register('type')}
                defaultValue={tyre.type}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
              </div>
              <TextInput
                icon={BiDollar}
                id="price"
                placeholder="150"
                required
                type="number"
                {...register('price')}
                defaultValue={tyre.price}
              />
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="width" value="Width" />
              </div>
              <TextInput
                id="width"
                placeholder="e.g 185"
                required
                type="number"
                {...register('width')}
                defaultValue={tyre.width}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="profile" value="Profile" />
              </div>
              <TextInput
                id="profile"
                placeholder="e.g 55"
                required
                type="number"
                {...register('profile')}
                defaultValue={tyre.profile}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="width" value="Width" />
              </div>
              <TextInput
                id="width"
                placeholder="e.g 15"
                required
                type="number"
                {...register('rimSize')}
                defaultValue={tyre.rimSize}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">{/* image gallery */}</div>
        <div className="flex flex-row gap-3">
          <Button color="success" type="submit">
            <div className="flex flex-row items-center gap-1">
              <BiSolidSave className="text-lg" />
              <span className="text-md">Update</span>
            </div>
          </Button>
          <Button href="/tyres/admin" color="failure">
            <span className="text-md">Cancel</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
