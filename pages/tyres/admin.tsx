import DeleteTyreConfirmation from '@/components/Tyres/delete-tyre-confirmation';
import TyreDetail from '@/types/tyre-type';
import { useDisclosure } from '@chakra-ui/react';
import { Button, Label } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { BiArrowBack, BiPlus } from 'react-icons/bi';

export async function getStaticProps() {
  const baseUrl = (
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_PROD
      : process.env.NEXT_PUBLIC_API_DEV
  ) as string;
  const endpoint = '/api/tyres/getAllTyres';
  const response = await fetch(baseUrl + endpoint);
  const tyresList = await response.json();

  return {
    props: { tyresList },
    revalidate: 10
  };
}

type Props = {
  tyresList: TyreDetail[];
};

const Page = ({ tyresList }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tyreId, setTyreId] = useState('');

  const removeConfirmation = (paramTyreId: string) => {
    setTyreId(paramTyreId);
    onOpen();
  };

  return (
    <div className="flex flex-col mt-10 mx-16 gap-10">
      <div className="flex flex-row items-center gap-3">
        <Link href="/tyres" className="text-2xl">
          <BiArrowBack />
        </Link>
        <Label htmlFor="Title" value="Admin - Tyres" className="text-2xl" />
        <Button href="/tyres/create/">
          <div className="flex flex-row items-center gap-1">
            <BiPlus className="text-lg" />
            <span className="text-md">Create new</span>
          </div>
        </Button>
      </div>
      <div className="max-h-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tyresList.map((tyre) => (
                <tr
                  key={tyre.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-32 p-4">
                    {tyre.tyreImage?.results.length !== 0 ? (
                      <img src={tyre.tyreImage?.results[0].fileUrl} alt={tyre.name} />
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {tyre.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${tyre.price}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {tyre.type}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row gap-4">
                      <Link
                        href={`/tyres/update/${encodeURIComponent(tyre.id ?? '')}`}
                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <Link href="#" passHref onClick={() => removeConfirmation(tyre.id ?? '')}>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                          Remove
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <DeleteTyreConfirmation
            isOpenDialog={isOpen}
            onCloseDialog={onClose}
            contentItemId={tyreId ?? ''}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
