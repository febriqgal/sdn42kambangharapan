import { Button, Input, Modal } from "@nextui-org/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";

export default function ForgetPassword() {
  const auth = getAuth();
  const onSubmit = (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        alert("Berhasil");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button color={"primary"} className="w-full text-black" onPress={handler}>
        Lupa Password?
      </Button>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h1 className="text-xl">Lupa Password</h1>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Email"
            placeholder="Masukkan email"
            {...register("email")}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            onPress={(closeHandler, handleSubmit(onSubmit))}
            className="bg-[#172554]"
          >
            Kirim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
