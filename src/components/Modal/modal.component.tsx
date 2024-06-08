import React from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalPropsInterface {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalPortal: React.FC<ModalPortalPropsInterface> = ({
  children,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-slate-100 bg-opacity-75 flex items-center justify-center z-50 mx-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg mx-auto relative">
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ModalPortal;
