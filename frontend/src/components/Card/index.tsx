import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaEquals, FaUserAlt } from "react-icons/fa";
import { CardData } from "./types";
import { UserData } from "../User/types";
import { getUserById } from "../../api/users";
import Button from "../common/Button";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { deleteCard, updateCard } from "../../api/cards";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CardProps {
  card: CardData;
  onRefreshCards: () => void;
}

const Card: React.FC<CardProps> = ({ card, onRefreshCards }) => {
  const navigate = useNavigate();

  const {
    title,
    description,
    priority,
    type,
    due_date,
    assigned_user_id,
    status,
  } = card;
  const [user, setUser] = useState<UserData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [assignedUserData] = await Promise.all([
          getUserById(assigned_user_id),
        ]);

        setUser(assignedUserData);
      } catch (error: any) {
        toast.error(error.response.data.detail);
      }
    }
    fetchData();
  }, [assigned_user_id]);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "3":
        return <FaArrowUp className="text-priority-high" />;
      case "2":
        return <FaEquals className="text-priority-medium" />;
      case "1":
        return <FaArrowDown className="text-priority-low" />;
      default:
        return null;
    }
  };

  const handleDeleteCard = async () => {
    try {
      await deleteCard(card.id);
      toast.success("Cartão removido com sucesso!");
      onRefreshCards();
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleChangeStatus = async (next: boolean) => {
    let newStatus: string;

    switch (card.status) {
      case "To Do":
        newStatus = "In Progress";
        break;
      case "In Progress":
        newStatus = next ? "Done" : "To Do";
        break;
      case "Done":
        newStatus = "In Progress";
        break;
      default:
        throw new Error(`Status desconhecido: ${card.status}`);
    }

    try {
      await updateCard(
        card.id,
        card.title,
        card.description,
        newStatus,
        card.type,
        card.assigned_user_id,
        card.priority,
        card.due_date
      );

      toast.success("Status atualizado com sucesso!");
      onRefreshCards();
    } catch (error: any) {
      toast.error(error.response.data.detail);
    } finally {
      setShowDialog(false);
    }
  };

  const handleEdit = () => {
    navigate(`/card/${card.id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {user?.avatar ? (
            <img
              src={`/avatar${parseInt(user.avatar)}.jpg`}
              alt="User"
              className="h-6 w-6 rounded-full mr-2"
            />
          ) : (
            <FaUserAlt className="h-6 w-6 rounded-full mr-2" />
          )}
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <h3 className="font-bold text-lg">{type.toUpperCase()}</h3>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center">
          {getPriorityIcon(priority)}
          <p className="ml-4 text-gray-600">
            {new Date(due_date).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <Button
            onClick={() => handleEdit()}
            className="bg-yellow-400 text-black mr-2"
          >
            Editar
          </Button>

          {status === "To Do" && (
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-red-500 text-white"
            >
              Deletar
            </Button>
          )}

          {status === "In Progress" && (
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-red-500 text-white"
            >
              Deletar
            </Button>
          )}

          {status === "Done" && (
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-red-500 text-white"
            >
              Deletar
            </Button>
          )}
        </div>

        <div>
          {status === "To Do" && (
            <>
              <Button onClick={() => handleChangeStatus(true)} className="mr-2">
                Começar
              </Button>
            </>
          )}

          {status === "In Progress" && (
            <>
              <Button
                onClick={() => handleChangeStatus(false)}
                className="mr-2"
              >
                Parar
              </Button>
              <Button onClick={() => handleChangeStatus(true)} className="mr-2">
                Finalizar
              </Button>
            </>
          )}

          {status === "Done" && (
            <>
              <Button onClick={() => handleChangeStatus(true)} className="mr-2">
                Refazer
              </Button>
            </>
          )}
        </div>
      </div>

      {showDialog && (
        <ConfirmationDialog
          title="Confirmação"
          message={`Você realmente quer deletar o cartão "${title}"?`}
          onConfirm={() => {
            handleDeleteCard();
            handleCloseDialog();
          }}
          onCancel={() => handleCloseDialog()}
        />
      )}
    </div>
  );
};

export default Card;
