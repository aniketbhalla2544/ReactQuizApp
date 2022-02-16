import { XIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PortalModalProps = {
  children: React.ReactNode;
  isOpenToggler: () => void;
  isOpen: boolean;
};

const Modal = ({ children, isOpen, isOpenToggler }: PortalModalProps) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => setIsBrowser(true), []);

  const ModalContent = () => (
    <section className='w-1/2 inline-block absolute top-[15%] left-[30%] shadow-2xl border-4 bg-white px-6 pt-4 pb-12'>
      <XIcon
        className='w-10 p-3 hover:bg-gray-200 h-auto block ml-auto cursor-pointer'
        onClick={isOpenToggler}
      />
      <section>{children}</section>
      <button
        onClick={isOpenToggler}
        className='capitalize bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-12 py-2 mx-auto block text-base'
      >
        close
      </button>
    </section>
  );

  if (isBrowser) {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
      <ModalContent />,
      document.getElementById('quizResultsModal') as Element
    );
  } else {
    return null;
  }
};

export default Modal;
