import Image from 'next/image';
import { useRef } from 'react';

const SearchResults = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col" ref={ref}>
      {/* <div className="flex mx-auto text-3xl">Nothing found.</div> */}
      <div className="flex flex-row border-2 w-[900px] h-[250px] mx-auto mb-5">
        <div className="grow-0 shrink-0 py-5 w-1/4">
          <Image
            width={145}
            height={145}
            alt="bridgestone"
            unoptimized={true}
            src="https://www.bridgestone.com.au/-/media/project/bridgestone-global/apac/apac-shared/tyres/bridgestone/ecopia/ep500/11003681/ep500-1-11003681.png?h=625&w=770&rev=e4c9cb4473f84538a686d25693ea4938&hash=C40C46BA63E512E6357D29714B27240D"
          ></Image>
        </div>
        <div className="flex flex-col px-5 py-5 w-1/2">
          <Image
            width={200}
            height={20}
            alt="bridgestone"
            unoptimized={true}
            src="https://www.bridgestone.com.au/-/media/project/bridgestone-global/global-shared/logo/plp-logos/ecopia.svg?h=31&iar=0&w=300&rev=4f346a0d9d5b4d66b26624e6420c8ea4&hash=0C885ACC893C59CE398C2BA7A27DF921"
          ></Image>
          <div className="text-4xl pt-3 font-extrabold">Ecopia EP300</div>
          <div className="text-4xl pt-3 font-medium">185/55 R16</div>
          <div className="text-2xl pt-3 font-normal overflow-hidden">
            <article dangerouslySetInnerHTML={{ __html: '<p>This is a test</p>' }} />
          </div>
        </div>
        <div className="flex flex-col w-1/4">
          <div className="relative h-32 w-full">
            <div className="absolute top-0 right-0 h-16 w-full bg-red-600 rounded-bl-3xl">
              <div className="text-white mt-3 ml-7 gap-2">
                <span className="text-2xl font-medium">IDR </span>
                {/* <span className="text-3xl font-extrabold mr-1">{`${(data.price / 1000).toLocaleString()}`}K</span> */}
                <span className="text-3xl font-extrabold mr-1">5,000K</span>
                <span className="text-lg">each</span>
              </div>
            </div>
          </div>
          <button className="hover:bg-red-500 w-52 text-red-700 font-semibold hover:text-white py-2 px-4 border-2 border-red-500">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
