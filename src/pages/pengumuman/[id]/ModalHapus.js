import app, { db } from "@/server/db";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/router";
export default function ModalHapus({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const route = useRouter();
  const { id } = route.query;
  return (
    <>
      <Button variant="flat" color="danger" onPress={onOpen}>
        Hapus
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody className="text-center">{`Yakin Hapus?`}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={async () => {
                    const docRef = doc(db, "pengumuman", `${id}`);
                    const storage = getStorage(app);
                    const desertRef = ref(
                      storage,
                      `image/pengumuman/${data.gambar}`
                    );
                    await deleteObject(desertRef);
                    await deleteDoc(docRef);
                    route.push("/");
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  }}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
