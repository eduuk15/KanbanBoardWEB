import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione a lógica de login aqui
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-20" />
        </div>
        <form onSubmit={handleLogin}>
          <Input
            id="email"
            label="Usuário/Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center mb-4">
            <Button type="submit">Login</Button>
            <Button type="button" onClick={() => alert("Esqueceu a senha?")}>
              Esquecer a Senha
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => alert("Cadastrar novo usuário")}
            >
              Cadastrar Novo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
