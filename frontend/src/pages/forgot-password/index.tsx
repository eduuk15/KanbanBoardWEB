import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione aqui a lógica para chamar a API de recuperação de senha
    alert("Verifique seu e-mail para redefinir a senha!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-120">
        <div className="flex justify-center mb-6">
          <img src="/Kanban-Board.png" alt="Logo" className="h-20" />
        </div>
        <form onSubmit={handleForgotPassword}>
          <Input
            id="email"
            label="Usuário/Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <Button type="submit">Recuperar Senha</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
