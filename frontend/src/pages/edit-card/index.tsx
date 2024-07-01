import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCard, updateCard } from "../../api/cards";

const EditCard: React.FC = () => {
  const navigate = useNavigate();
  const { loggedUserInfo } = useAuth();
  const user = loggedUserInfo();

  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"To Do" | "In Progress" | "Done">(
    "To Do"
  );
  const [type, setType] = useState<
    "fix" | "feature" | "investigation" | "refactor"
  >("fix");
  const [priority, setPriority] = useState<"1" | "2" | "3">("1");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchCard() {
      try {
        const cardData = await getCard(parseInt(id!));
        console.log("cardData", cardData);
        setTitle(cardData.title);
        setDescription(cardData.description);
        setStatus(cardData.status);
        setType(cardData.type);
        setPriority(cardData.priority);
        setDueDate(new Date(cardData.due_date));
      } catch (error: any) {
        toast.error(error.response.data.detail);
      } finally {
        setLoading(false);
      }
    }
    fetchCard();
  }, [id]);

  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      await updateCard(
        parseInt(id!),
        title,
        description,
        status,
        type,
        user?.id ?? null,
        priority,
        dueDate?.toISOString() || ""
      );

      navigate("/board");
      toast.success("Cartão atualizado com sucesso!");
    } catch (error: any) {
      toast.error(error.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md w-120">
            <div className="flex justify-center mb-6">
              <h2 className="text-2xl font-bold">Editar Cartão</h2>
            </div>
            <form onSubmit={handleUpdateCard}>
              <Input
                id="title"
                label="Título"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrição
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={4}
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value as
                        | "fix"
                        | "feature"
                        | "investigation"
                        | "refactor"
                    )
                  }
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="fix">Fix</option>
                  <option value="feature">Feature</option>
                  <option value="investigation">Investigation</option>
                  <option value="refactor">Refactor</option>
                </select>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prioridade
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "1" | "2" | "3")
                  }
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="1">Baixa</option>
                  <option value="2">Média</option>
                  <option value="3">Alta</option>
                </select>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Data de Conclusão
                </label>
                <DatePicker
                  id="dueDate"
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  popperPlacement="bottom-start"
                  placeholderText="DD/MM/AAAA"
                  required
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button type="submit">Atualizar</Button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditCard;
