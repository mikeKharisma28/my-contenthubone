import { MediaResult } from '@/types/media-type';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  isOpenDialog: boolean;
  onCloseDialog: () => void;
}

function ImagesFromContentHubOne({ isOpenDialog, onCloseDialog }: Props) {
  const [mediaResults, setMediaResults] = useState<MediaResult[]>([]);

  useEffect(() => {
    (async () => {
      const url = '/api/media/fetchAllMediaItems';
      const response = await fetch(url);
      const data = await response.json();
      setMediaResults(data);
    })();
  });

  const selectImages = () => {
    onCloseDialog();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Modal size="5xl" isOpen={isOpenDialog} onClose={onCloseDialog}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Images from Content Hub One</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {mediaResults.map((media) => (
                <div className="bg-gray-100" key={media.id}>
                  <img className="h-auto max-w-auto rounded-lg" src={media.fileUrl} />
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={selectImages}>
              Yes
            </Button>
            <Button colorScheme="green" variant={'outline'} onClick={onCloseDialog}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ImagesFromContentHubOne;
