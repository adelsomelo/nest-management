
import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: <AlertTriangle className="text-rose-600" size={28} />,
      iconBg: 'bg-rose-50',
      button: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200',
      title: 'text-rose-900'
    },
    warning: {
      icon: <AlertTriangle className="text-amber-600" size={28} />,
      iconBg: 'bg-amber-50',
      button: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200',
      title: 'text-amber-900'
    },
    info: {
      icon: <AlertTriangle className="text-blue-600" size={28} />,
      iconBg: 'bg-blue-50',
      button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
      title: 'text-blue-900'
    }
  };

  const style = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className={`p-5 ${style.iconBg} rounded-3xl`}>
              {style.icon}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className={`text-2xl font-black tracking-tight ${style.title}`}>
              {title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 font-black rounded-2xl transition-all disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-6 py-4 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${style.button}`}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : confirmLabel}
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default ConfirmationModal;
