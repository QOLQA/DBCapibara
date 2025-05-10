import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ShowErrorModalProps {
  onClose: () => void;
  errorMessage: string;
}

const ShowErrorModal: React.FC<ShowErrorModalProps> = ({
  onClose,
  errorMessage,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.showModal();
  });

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onClose}
      className="bg-white p-6 m-auto rounded-xl shadow-lg w-96 border border-gray-300 backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-fade-in"
    >
      <p>{errorMessage}</p>
      <div>
        <Button
          type="button"
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => {
            modalRef.current?.close();
            onClose();
          }}
        >
          Aceptar
        </Button>
      </div>
    </dialog>,
    document.body
  );
};

export default ShowErrorModal;
