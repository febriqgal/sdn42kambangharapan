import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";

export default function SignUp() {
  const auth = getAuth();
  const { register, handleSubmit, resetField } = useForm();
  const onSubmit = async (data) => {
   
  await  createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert(`Berhasil ${user}`);
        resetField("email");
        resetField("password");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
      await updateProfile(auth.currentUser, {
        displayName: data.namalengkap,
      });
      setVisible(false)
  };

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button flat bordered className="text-[#172554] w-full" onPress={handler}>
        Buat Akun
      </Button>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h1 className="text-xl">Buat Akun</h1>
        </Modal.Header>
        <Modal.Body>
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
          <Input.Password
            label="Password"
            placeholder="Masukkan password"
            {...register("password")}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            onPress={handleSubmit(onSubmit)}
            className="bg-[#172554]"
          >
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
