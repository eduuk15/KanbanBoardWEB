import React, { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { updateUser } from "../../api/users";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const EditUser: React.FC = () => {
  const { loggedUserInfo, login } = useAuth();
  const user = loggedUserInfo();

  const [email, setEmail] = useState(user?.email ?? "");
  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationQuestion, setConfirmationQuestion] = useState(
    user?.confirmationQuestion ?? ""
  );
  const [confirmationAnswer, setConfirmationAnswer] = useState(
    user?.confirmationAnswer ?? ""
  );
  const [avatar, setAvatar] = useState(user?.avatar ?? "1");

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem!");
      return;
    }

    if (user) {
      try {
        const response = await updateUser(
          user.id,
          email,
          name,
          password,
          confirmationQuestion,
          confirmationAnswer,
          avatar
        );
        login(response.access_token);
        toast.success(response.message);
      } catch (error: any) {
        toast.error(error.response.data.detail);
      }
    }
  };

  const handleAvatarChange = (direction: string) => {
    let newAvatar = parseInt(avatar);
    if (direction === "left") {
      newAvatar = newAvatar > 1 ? newAvatar - 1 : 8;
    } else if (direction === "right") {
      newAvatar = newAvatar < 8 ? newAvatar + 1 : 1;
    }
    setAvatar(newAvatar.toString());
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-120">
          <div className="flex justify-center mb-6">
            <img src="/Kanban-Board.png" alt="Logo" className="h-20" />
          </div>
          <div className="flex items-center justify-center mb-6">
            <FiArrowLeft
              className="cursor-pointer"
              onClick={() => handleAvatarChange("left")}
            />
            <img
              src={`/avatar${parseInt(avatar)}.jpg`}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-4"
            />
            <FiArrowRight
              className="cursor-pointer"
              onClick={() => handleAvatarChange("right")}
            />
          </div>
          <form onSubmit={handleUpdateUser}>
            <Input
              id="name"
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <Input
              id="password"
              label="Nova Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="confirm-password"
              label="Confirme a Nova Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                required
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
              label="Nova Resposta"
              type="text"
              value={confirmationAnswer}
              onChange={(e) => setConfirmationAnswer(e.target.value)}
              required={true}
            />
            <div className="flex justify-center mt-4">
              <Button type="submit">Atualizar</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
