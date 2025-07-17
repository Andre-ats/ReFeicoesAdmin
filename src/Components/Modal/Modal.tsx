import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tituloModal?: string;
  descricaoModal?: string;
  children?: React.ReactNode;
  confirmModal?: boolean;
  onConfirm?: any;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  tituloModal, 
  descricaoModal, 
  children,
  confirmModal = false,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const sucesso = onConfirm();
  
    if (sucesso) {
      onClose(); 
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between mb-4">
          {tituloModal && <h3 className="text-lg font-semibold text-gray-900">{tituloModal}</h3>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>
        {descricaoModal && (
          <p className="text-sm text-gray-500 mb-4">{descricaoModal}</p>
        )}
        <div className="mt-2">
          {children}
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 mt-4 border-t">
          {confirmModal ? (
            <>
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 bg-amareloReFeicoes text-black rounded-md transition-colors"
              >
                Confirmar
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
