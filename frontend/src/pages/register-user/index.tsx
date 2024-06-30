import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { registerUser } from "../../api/users";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationQuestion, setConfirmationQuestion] = useState("");
  const [confirmationAnswer, setConfirmationAnswer] = useState("");
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem!");
      return;
    }

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !confirmationQuestion ||
      !confirmationAnswer
    ) {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await registerUser(
        email,
        password,
        confirmationQuestion,
        confirmationAnswer
      );

      toast.success(response.message);
      login(response.access_token);
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-120">
        <div className="flex justify-center mb-6">
          <img src="/Kanban-Board.png" alt="Logo" className="h-20" />
        </div>
        <form onSubmit={handleRegister}>
          <Input
            id="email"
            label="Usuário/Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <Input
            id="confirm-password"
            label="Confirme a Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
          />
          <div className="mt-4 mb-4">
            <label
              htmlFor="confirmation-question"
              className="block text-sm font-medium text-gray-700"
            >
              Pergunta de Confirmação
            </label>
            <select
              id="confirmation-question"
              value={confirmationQuestion}
              onChange={(e) => setConfirmationQuestion(e.target.value)}
              className={`mt-1 block w-full py-2 px-3 border border-red-500 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
            >
              <option value="">Selecione uma pergunta</option>
              <option value="1">Qual é/foi o nome do seu primeiro pet?</option>
              <option value="2">Onde você cursou o ensino médio?</option>
              <option value="3">Qual é o nome do meio da sua mãe?</option>
            </select>
          </div>
          <Input
            id="confirmation-answer"
            label="Resposta"
            type="text"
            value={confirmationAnswer}
            onChange={(e) => setConfirmationAnswer(e.target.value)}
            required={true}
          />
          <div className="flex justify-center mt-4">
            <Button type="submit">Registrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
