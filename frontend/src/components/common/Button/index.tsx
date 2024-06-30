import React, { CSSProperties } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
  disabled?: boolean; // Adicionando a propriedade disabled
}

const Button = ({
  type = "button",
  onClick,
  className = "",
  children,
  style,
  disabled = false, // Inicializando como falso
}: ButtonProps) => {
  const defaultClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={`${defaultClass} ${className}`}
      disabled={disabled} // Aplicando a propriedade disabled aqui
    >
      {children}
    </button>
  );
};

export default Button;
