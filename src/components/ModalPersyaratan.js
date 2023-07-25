import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

const ModalPersyaratan = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className="bg-gradient-to-br from-primary-100 to-primary-200"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Persyaratan
      </Button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid h-screen p-8 overflow-hidden cursor-pointer bg-slate-900/20 backdrop-blur place-items-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg p-6 overflow-hidden text-white rounded-lg shadow-xl cursor-default bg-gradient-to-br from-primary-100 to-primary-200"
          >
            <div className="relative z-10">
              <div className="grid w-16 h-16 mx-auto mb-2 text-3xl text-indigo-600 bg-white rounded-full place-items-center"></div>
              <h3 className="mb-2 text-3xl font-bold text-center">
                One more thing!
              </h3>
              <p className="mb-6 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                aperiam vitae, sapiente ducimus eveniet in velit.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="w-full text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Kembali
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPersyaratan;
