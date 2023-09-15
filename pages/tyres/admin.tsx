import TyreDetail from '@/types/tyre-type';
import Link from 'next/link';
// import { useEffect, useState } from "react";

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
  return (
    <div className="m-20 max-h-fit">
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
                  <img src={tyre.tyreImage.results[0].fileUrl} alt={tyre.name} />
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
                      href={`/tyres/update/${encodeURIComponent(tyre.id)}`}
                      className="font-medium text-green-600 dark:text-green-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
