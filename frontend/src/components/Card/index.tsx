import React from "react";
import { FaArrowDown, FaArrowUp, FaEquals } from "react-icons/fa";
import { CardData } from "./types";

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { title, description, priority, type, dueDate } = card;

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <FaArrowUp className="text-priority-high" />;
      case "medium":
        return <FaEquals className="text-priority-medium" />;
      case "low":
        return <FaArrowDown className="text-priority-low" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src="/eduardo_pessoal.jpg"
            alt="User"
            className="h-6 w-6 rounded-full mr-2"
          />
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <h3 className="font-bold text-lg">{type.toUpperCase()}</h3>
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center">
          {getPriorityIcon(priority)}
          <p className="ml-4 text-gray-600">
            {new Date(dueDate).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
