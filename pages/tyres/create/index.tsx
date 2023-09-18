import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { BiArrowBack, BiDollar, BiSolidSave } from 'react-icons/bi';

const Page = () => {
  return (
    <div className="flex flex-col mt-10 mx-16 gap-10">
      <div className="flex flex-row items-center gap-3">
        <Link href="/tyres/admin" className="text-2xl">
          <BiArrowBack />
        </Link>
        <Label htmlFor="Title" value="Tyre Detail" className="text-2xl" />
      </div>
      <form className="flex flex-col gap-4">
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
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">{/* image gallery */}</div>
        <div className="flex flex-row gap-3">
          <Button color="success">
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
