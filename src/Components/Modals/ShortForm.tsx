import React, { useState, useEffect , FormEvent} from "react";
import Button from "../Buttons/Button";
import { FormInput } from "../FormInputs/FormInput";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title:string,
  onsubmit:(e: FormEvent<HTMLFormElement>)=>Promise<void>,
  isEditPost : boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children , title="" , onsubmit=()=>{} , isEditPost=false}) => {
  const [showModal, setShowModal] = useState(false);

  // Control internal state for animation
  useEffect(() => {
    let id : any;
    if (isOpen) {
      setShowModal(true);
    } else {
      id = setTimeout(() => setShowModal(false), 200); // Match the duration of the exit animation
    }

    return ()=>clearTimeout(id)
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg p-6 min-w-[550px] max-w-[600px] shadow-xl transform transition-transform duration-300 `}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>
        <form onSubmit={(e)=>onsubmit(e)}>
        <h2 className="font-bold text-blue-500 text-xl">{title}</h2>
        {children}
        </form>
      </div>
    </div>
  );
};

export default Modal;