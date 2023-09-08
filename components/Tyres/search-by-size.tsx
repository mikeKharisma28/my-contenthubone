import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { LuCheck, LuChevronsUpDown } from 'react-icons/lu';

const SearchTyreBySize = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-6xl font-bold">Search tyres by size</div>
      <div className="text-4xl font-bold pt-4">Search tyres by size</div>
      <div className="flex flex-row pt-4">
        <div className="flex flex-col mx-2">
          <div className="text-md font-semibold">
            Width<span className="text-red-700">*</span>
          </div>
          <div className="relative w-72">
            <Listbox>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full h-14 cursor-default rounded-lg bg-white border-2 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-lg text-black">185</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <LuChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option
                      className={({ active }: any) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 text-lg ${
                          active ? 'bg-sky-700 text-white' : 'text-gray-900'
                        }`
                      }
                      value={185}
                    >
                      {({ selected }: any) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            185
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <LuCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex flex-col mx-2">
          <div className="text-md font-semibold">
            Profiles<span className="text-red-700">*</span>
          </div>
          <div className="relative w-72">
            <Listbox>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full h-14 cursor-default rounded-lg bg-white border-2 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-lg text-black">45</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <LuChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option
                      className={({ active }: any) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 text-lg ${
                          active ? 'bg-sky-700 text-white' : 'text-gray-900'
                        }`
                      }
                      value={45}
                    >
                      {({ selected }: any) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            45
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <LuCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex flex-col mx-2">
          <div className="text-md font-semibold">
            Rim<span className="text-red-700">*</span>
          </div>
          <div className="relative w-72">
            <Listbox>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full h-14 cursor-default rounded-lg bg-white border-2 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-lg text-black">16</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <LuChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option
                      className={({ active }: any) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 text-lg ${
                          active ? 'bg-sky-700 text-white' : 'text-gray-900'
                        }`
                      }
                      value={16}
                    >
                      {({ selected }: any) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            16
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <LuCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      <div>
        <button className="bg-red-700 hover:bg-red-500 text-white font-bold my-5 w-[350px] h-20">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchTyreBySize;
