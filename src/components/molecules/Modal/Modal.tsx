import { ModalProps } from '../../../interfaces/interfaces';



const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children}) => {
  // const modalClassName = isOpen ? 'modal modal-open' : 'modal';

  return (
    <>
      {isOpen && (
        <div className="absolute z-50 w-full">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="relative bg-white mx-auto h-[85%] w-[90%] md:w-[70%] rounded-lg shadow-lg">
            <button
              className="flex justify-center items-center pb-1 absolute size-8 text-2xl top-4 right-4 text-blueDark bg-blueLight rounded-full cursor-pointer hover:text-whiteLight transition-all duration-300"
              onClick={onClose}
            >
              x
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;