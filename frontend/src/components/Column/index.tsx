import React from "react";
import Card from "../Card";
import Loader from "../common/Loader";
import { CardData } from "../Card/types";
import { FaPlus } from "react-icons/fa";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

interface ColumnProps {
  title: string;
  cards: CardData[];
  loading: boolean;
  onRefreshCards: () => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  cards,
  loading,
  onRefreshCards,
}) => {
  const navigate = useNavigate();

  const handleAddNewCard = () => {
    navigate(`/create-card`, { state: { status: title } });
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 m-2 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">{title}</h2>
        <Button
          onClick={handleAddNewCard}
          className="bg-blue-500 text-white p-2 rounded-md shadow-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Adicionar Novo
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : cards.length === 0 ? (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
          <p className="text-gray-600">Não existem cartões.</p>
        </div>
      ) : (
        cards.map((card, index) => (
          <Card key={index} card={card} onRefreshCards={onRefreshCards} />
        ))
      )}
    </div>
  );
};

export default Column;
