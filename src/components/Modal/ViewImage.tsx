import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay opacity={0.6} >
        <ModalContent bg="transparent" display="flex" justifyContent="center" width="auto" height="auto" >
          <ModalBody bg="transparent" p="0" >
            <Image src={imgUrl} objectFit="cover" width="100%" height="100%" maxW="900px" maxH="600px" overflow="hidden" />
          </ModalBody>
          <ModalFooter display="flex" alignItems="flex-start" flexDir="column" flex="1" bg="pGray.800" w="100%" >
            <Link  href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
