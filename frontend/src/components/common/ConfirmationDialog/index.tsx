import React from "react";
import Button from "../Button";

interface ConfirmationDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <Button onClick={onCancel} className="mr-4 bg-gray-500">
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="bg-blue-500">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
