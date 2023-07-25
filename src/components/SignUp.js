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
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";
export default function SignUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const auth = getAuth();

  const { register, handleSubmit, resetField } = useForm();
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`Berhasil ${user}`);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-email") {
          toast.error("Email yang dimasukkan tidak sah");
        }
        if (errorCode === "auth/missing-password") {
          toast.error("Password terlalu lemah");
        } else {
          toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
      });
    if (data.email) {
      await updateProfile(auth.currentUser, {
        displayName: data.namalengkap,
      });
    } else {
      return null;
    }
  };
  return (
    <>
      <Button color="primary" variant="bordered" onPress={onOpen}>
        Buat Akun
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Buat Akun
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Nama Lengkap"
                  placeholder="Masukkan Nama Lengkap"
                  {...register("namalengkap")}
                />
                <Input
                  label="Email"
                  placeholder="Masukkan email"
                  {...register("email")}
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Masukkan password"
                  {...register("password")}
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
