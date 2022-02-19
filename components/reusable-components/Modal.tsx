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
    <section className='absolute top-0 left-0 h-[101.5%] w-full bg-black/40'>
      <main
        className={`${
          width ? width : 'w-1/2'
        } ${position} inline-block relative shadow-black/50 shadow-2xl bg-white px-6 pt-4 pb-12`}
      >
        {isWithCrossButton && (
          <XIcon
            className='w-10 p-3 hover:bg-gray-200 h-auto block ml-auto cursor-pointer'
            onClick={isOpenToggler}
          />
        )}
        <section>{children}</section>
        {isWithCloseButton && (
          <button
            onClick={isOpenToggler}
            className='capitalize bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-12 py-2 mx-auto block text-base'
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
