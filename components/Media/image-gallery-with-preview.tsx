import { Button, useDisclosure } from '@chakra-ui/react';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import { BiX, BiSolidFolderOpen } from 'react-icons/bi';
import ImagesFromContentHubOne from './images-from-contenthubone';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

// function ImageGalleryWithPreview({ name }: Props) {
const ImageGalleryWithPreview = forwardRef((_Props: Props) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage('');

    const selectedFiles = e.target.files;

    if (selectedFiles !== null) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileType = selectedFiles[i].type;
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
          setFiles([...files, selectedFiles[i]]);
          // _Props.onChange(files);
        } else {
          setMessage("Only image's files accepted");
        }
      }
    }
  };

  const removeImage = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex">
      <div className="w-full bg-white rounded-md">
        <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
          {message}
        </span>
        <div className="h-20 w-full relative border-2 items-center rounded-md cursor-pointer bg-gray-300 border-gray-400 border-dotted">
          <input
            type="file"
            onChange={handleFile}
            className="h-full w-full bg-green-200 opacity-0 z-10 absolute"
            multiple={false}
            name={_Props.name}
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
          {files.map((file, key) => (
            <div key={key} className="overflow-hidden relative">
              <i
                onClick={() => {
                  removeImage(file.name);
                }}
                className="absolute right-0 text-gray-600 hover:text-gray-400 cursor-pointer text-2xl"
              >
                <BiX />
              </i>
              <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-col items-center gap-2">
          <span className="text-[10px]">Or</span>
          <Button onClick={onOpen}>
            <span className="text-[12px] font-semibold">Get images from Content Hub One Media</span>
          </Button>
        </div>
      </div>
      <ImagesFromContentHubOne isOpenDialog={isOpen} onCloseDialog={onClose} />
    </div>
  );
});

export default ImageGalleryWithPreview;
