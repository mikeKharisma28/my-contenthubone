import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import Router from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiArrowBack, BiDollar, BiSolidFolderOpen, BiSolidSave, BiX } from 'react-icons/bi';
import ImagesFromContentHubOne from '../Media/images-from-contenthubone';
import { useDisclosure } from '@chakra-ui/react';
import { MediaReqUploadLinks } from '@/types/media-type';
import { nanoid } from 'nanoid';
import { UploadMediaItems } from '@/lib/media/media-lib';
import Error from 'next/error';

export default function TyreForm() {
  const { register, handleSubmit, control } = useForm();
  const [tyreImageMessage, setTyreImageMessage] = useState('');
  const [logoImageMessage, setLogoImageMessage] = useState('');
  const [tyreImage, setTyreImage] = useState<File[]>([]);
  const [logoImage, setLogoImage] = useState<File[]>([]);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  async function UploadImages(bodyReq: MediaReqUploadLinks[], formData: FormData, accessToken: Promise<string>) {
    const uploadLinks = await UploadMediaItems(bodyReq, formData, accessToken);
    return uploadLinks;
  }

  async function GetToken(): Promise<string> {
    const res = await fetch('/api/auth/getAccessToken');
    if (res.ok) {
      return res.text();
    } else {
      return "Error";
    }
  }

  async function GenerateUploadLinks(reqUploadLinks: MediaReqUploadLinks[]): Promise<string> {
    const res = await fetch('/api/media/generateUploadLinks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqUploadLinks)
    });
    return res.json();
  }

  const onSubmit = (data: any) => {
    const tyreImageFormData = new FormData();
    const logoImageFormData = new FormData();
    const token = GetToken();
    // formData.append('name', control._formValues['name']);
    // formData.append('type', control._formValues['type']);
    // formData.append('price', control._formValues['price']);
    // formData.append('width', control._formValues['width']);
    // formData.append('profile', control._formValues['profile']);
    // formData.append('rimSize', control._formValues['rimSize']);
    const reqTyreImgUploadLinks: MediaReqUploadLinks[] = tyreImage.map((item) => ({
      requestId: nanoid(),
      filename: item.name,
      contentType: item.type,
      contentLength: item.size.toString()
    }));
    const reqLogoImgUploadLinks: MediaReqUploadLinks[] = logoImage.map((item) => ({
      requestId: nanoid(),
      filename: item.name,
      contentType: item.type,
      contentLength: item.size.toString()
    }));

    tyreImage.forEach((file, index) => {
      tyreImageFormData.append(`tyreImage[${index}]`, file);
    });
    logoImage.forEach((file, index) => {
      logoImageFormData.append(`logoImage[${index}]`, file);
    });

    console.log("Generated Upload Links requests:", GenerateUploadLinks(reqTyreImgUploadLinks));
    // console.log("Token from local API: ", token);
    // console.log("Generated upload links: ", UploadImages(reqTyreImgUploadLinks, tyreImageFormData, token));
    // async () => {
    //   const url = '/api/tyres/createNewTyre';
    //   const res = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: formData['name'],
    //       type: formData['type'],
    //       price: formData['price'],
    //       width: formData['width'],
    //       profile: formData['profile'],
    //       rimSize: formData['rimSize']
    //     })
    //   });
    //   if (res.ok) {
    //     Router.push({
    //       pathname: '/tyres/admin'
    //     });
    //   }
    // };
  };

  const handleTyreFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setTyreImageMessage('');

    const selectedFiles = e.target.files;

    if (selectedFiles !== null) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileType = selectedFiles[i].type;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
          setTyreImage([...tyreImage, selectedFiles[i]]);
          // _Props.onChange(files);
        } else {
          setTyreImageMessage("Only image's files accepted");
        }
      }
    }
  };

  const handleLogoFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoImageMessage('');

    const selectedFiles = e.target.files;

    if (selectedFiles !== null) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileType = selectedFiles[i].type;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
          setLogoImage([...logoImage, selectedFiles[i]]);
          // _Props.onChange(files);
        } else {
          setLogoImageMessage("Only image's files accepted");
        }
      }
    }
  };

  const removeTyreImage = (fileName: string) => {
    setTyreImage(tyreImage.filter((file) => file.name !== fileName));
  };

  const removeLogoImage = (fileName: string) => {
    setLogoImage(logoImage.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex flex-col mt-10 mx-16 gap-10">
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
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rimSize" value="Rim Size" />
              </div>
              <TextInput
                id="rimSize"
                placeholder="e.g 15"
                required
                type="number"
                {...register('rimSize')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex flex-col">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Tyre Images" />
            </div>
            {/* <ImageGalleryWithPreview {...register('tyreImages')} /> */}
            <div className="flex">
              <div className="w-full bg-white rounded-md">
                <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                  {tyreImageMessage}
                </span>
                <div className="h-20 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                  <input
                    type="file"
                    onChange={handleTyreFiles}
                    className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
                    multiple={false}
                    name="tyreImage"
                  />
                  <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                    <div className="flex flex-col justify-center items-center">
                      <i className="text-gray-400 text-2xl">
                        <BiSolidFolderOpen />
                      </i>
                      <span className="text-[12px] font-semibold">Drag and Drop a file</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tyreImage.map((file, key) => (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => {
                          removeTyreImage(file.name);
                        }}
                        className="absolute right-0 text-gray-600 hover:text-gray-400 cursor-pointer text-2xl"
                      >
                        <BiX />
                      </i>
                      <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
                    </div>
                  ))}
                </div>
                {/* <div className="mt-2 flex flex-col items-center gap-2">
                  <span className="text-[10px]">Or</span>
                  <Button onClick={onOpen}>
                    <span className="text-[12px] font-semibold">
                      Get images from Content Hub One Media
                    </span>
                  </Button>
                </div> */}
              </div>
              {/* <ImagesFromContentHubOne isOpenDialog={isOpen} onCloseDialog={onClose} /> */}
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Logo Image" />
            </div>
            {/* <ImageGalleryWithPreview {...register('logoImage')} /> */}
            <div className="flex">
              <div className="w-full bg-white rounded-md">
                <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                  {logoImageMessage}
                </span>
                <div className="h-20 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
                  <input
                    type="file"
                    onChange={handleLogoFiles}
                    className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
                    multiple={false}
                    name="logoImage"
                  />
                  <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                    <div className="flex flex-col justify-center items-center">
                      <i className="text-gray-400 text-2xl">
                        <BiSolidFolderOpen />
                      </i>
                      <span className="text-[12px] font-semibold">Drag and Drop a file</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {logoImage.map((file, key) => (
                    <div key={key} className="overflow-hidden relative">
                      <i
                        onClick={() => {
                          removeLogoImage(file.name);
                        }}
                        className="absolute right-0 text-gray-600 hover:text-gray-400 cursor-pointer text-2xl"
                      >
                        <BiX />
                      </i>
                      <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
                    </div>
                  ))}
                </div>
                {/* <div className="mt-2 flex flex-col items-center gap-2">
                  <span className="text-[10px]">Or</span>
                  <Button onClick={onOpen}>
                    <span className="text-[12px] font-semibold">
                      Get images from Content Hub One Media
                    </span>
                  </Button>
                </div> */}
              </div>
              {/* <ImagesFromContentHubOne isOpenDialog={isOpen} onCloseDialog={onClose} /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <Button color="success" type="submit">
            <div className="flex flex-row items-center gap-1">
              <BiSolidSave className="text-lg" />
              <span className="text-md">Save</span>
            </div>
          </Button>
          <Button href="/tyres/admin" color="failure">
            <span className="text-md">Cancel</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
