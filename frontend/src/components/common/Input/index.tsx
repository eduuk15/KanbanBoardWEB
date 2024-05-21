import React, { CSSProperties } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  className?: string;
}

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  style,
  className = "",
}: InputProps) => {
  const defaultClass =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";

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
        className={`${defaultClass} ${className}`}
      />
    </div>
  );
};

export default Input;
