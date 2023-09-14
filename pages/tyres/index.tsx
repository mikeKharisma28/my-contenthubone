import SearchTyreBySize from '@/components/Tyres/search-by-size';
import { Button } from 'flowbite-react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center m-10 max-h-fit">
      <div className="flex flex-row items-start mt-5 my-20 w-full">
        <Button
          href="/tyres/admin"
          className="bg-red-700 hover:bg-red-500 text-white font-bold my-5 w-[150px] h-10"
        >
          Admin
        </Button>
      </div>
      <SearchTyreBySize />
    </div>
  );
};

export default Page;
