import { XIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PortalModalProps = {
  children: React.ReactNode;
  isOpenToggler: () => void;
  isOpen: boolean;
  position: string;
  width?: string;
  isWithCloseButton?: boolean;
  isWithCrossButton?: boolean;
};

const Modal = ({
  children,
  isOpen,
  isOpenToggler,
  width,
  position,
  isWithCloseButton,
  isWithCrossButton,
}: PortalModalProps) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => setIsBrowser(true), []);

  const ModalContent = () => (
    <section className='fixed inset-0 z-50 grid min-h-screen w-full place-items-center overflow-x-hidden bg-black/60 lg:block'>
      <main
        className={`${
          width ? width : 'w-1/2'
        } ${position} relative inline-block -translate-x-[12%] -translate-y-[10%] bg-white px-6 pt-4 pb-12 shadow-2xl shadow-black/50`}
      >
        {isWithCrossButton && (
          <XIcon
            className='ml-auto block h-auto w-10 cursor-pointer p-3 hover:bg-gray-200'
            onClick={isOpenToggler}
          />
        )}
        <section>{children}</section>
        {isWithCloseButton && (
          <button
            onClick={isOpenToggler}
            className='mx-auto block rounded-full bg-green-600 px-12 py-2 text-base font-semibold capitalize text-white hover:bg-green-700'
          >
            close
          </button>
        )}
      </main>
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
