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
import Router from 'next/router';

interface DeleteTyreConfirmationProps {
  isOpenDialog: boolean;
  onCloseDialog: () => void;
  contentItemId: string;
}

function DeleteTyreConfirmation({
  isOpenDialog,
  onCloseDialog,
  contentItemId
}: DeleteTyreConfirmationProps) {
  const deleteConfirmed = () => {
    (async () => {
      const url = '/api/tyres/deleteTyre';
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: contentItemId
        })
      });
      if (res.ok) {
        Router.push({
          pathname: '/tyres/admin'
        });
      }
    })();

    onCloseDialog();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Modal isOpen={isOpenDialog} onClose={onCloseDialog}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col justify-start items-start">The id is {contentItemId}</div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteConfirmed}>
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

export default DeleteTyreConfirmation;
