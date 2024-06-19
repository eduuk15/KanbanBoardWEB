import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // Usando useNavigate para navegação

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicione aqui a lógica para chamar a API de autenticação e obter o token
    const token = "fake-token"; // Substitua pelo token real obtido da API
    login(token);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-120">
        <div className="flex justify-center mb-6">
          <img src="/Kanban-Board.png" alt="Logo" className="h-20" />
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
            <Button type="button" onClick={() => navigate("/forgot-password")}>
              Esqueceu a senha?
            </Button>
          </div>
          <div className="flex justify-center">
            <Button type="button" onClick={() => navigate("/register-user")}>
              Cadastrar Novo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;