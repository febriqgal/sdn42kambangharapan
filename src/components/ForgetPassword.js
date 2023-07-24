import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
export default function ForgetPassword() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const auth = getAuth();
  const onSubmit = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        alert("Berhasil");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/user-not-found") {
          toast.error("Email tidak terdaftar");
        } else {
          toast.error("Terjadi kesalahan, silahkan cobalagi");
        }
      });
  };
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Button variant="light" onPress={onOpen}>
        Lupa Password?
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Lupa Password
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  placeholder="Masukkan email"
                  {...register("email")}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSubmit(onSubmit)}>
                  Kirim
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
