import React, { CSSProperties } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  className?: string;
  required?: boolean;
  error?: boolean;
}

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  style,
  className = "",
  required = false,
  error = false,
}: InputProps) => {
  const defaultClass =
    "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";
  const errorClass = "border-red-500";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        style={style}
        className={`${defaultClass} ${className} ${
          error ? errorClass : "border-gray-300"
        }`}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">Este campo é obrigatório.</p>
      )}
    </div>
  );
};

export default Input;
