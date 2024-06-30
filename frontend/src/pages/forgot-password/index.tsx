import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { changeUserPassword, getUserByEmail } from "../../api/users";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [confirmationQuestion, setConfirmationQuestion] = useState("");
  const [confirmationAnswer, setConfirmationAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await getUserByEmail(email);

      toast.success(
        "Usuário encontrado com sucesso! Responda a sua pergunta de segurança e atualize a senha..."
      );
      setUserExists(!!response);
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem!");
      return;
    }

    if (!confirmationQuestion || !confirmationAnswer) {
      toast.warning(
        "Por favor, preencha a pergunta e a resposta de confirmação."
      );
      return;
    }

    try {
      const response = await changeUserPassword(
        email,
        password,
        confirmationQuestion,
        confirmationAnswer
      );

      toast.success("Login realizado com sucesso!");
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
        {!userExists ? (
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
        ) : (
          <form onSubmit={handleSubmit}>
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione uma pergunta</option>
                <option value="1">
                  Qual é/foi o nome do seu primeiro pet?
                </option>
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
              className="mt-4"
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="confirm-password"
              label="Confirme a Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <Button type="submit">Alterar Senha</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
