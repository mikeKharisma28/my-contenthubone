import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { BiArrowBack, BiDollar, BiSolidSave } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import ImageGalleryWithPreview from '@/components/Media/image-gallery-with-preview';
import { useState } from 'react';
import TyreForm from '@/components/Tyres/tyre-form';

const Page = () => {
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState<any[]>([]);

  const onSubmit = (formData: any) => {
    async () => {
      const url = '/api/tyres/createNewTyre';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
    };

    console.log('Form data: ', formData);
  };

  return (
    <div className="flex flex-col mt-10 mx-16 gap-10">
      <div className="flex flex-row items-center gap-3">
        <Link href="/tyres/admin" className="text-2xl">
          <BiArrowBack />
        </Link>
        <Label htmlFor="Title" value="Tyre Detail" className="text-2xl" />
      </div>

      <TyreForm />
    </div>
  );
};

export default Page;
