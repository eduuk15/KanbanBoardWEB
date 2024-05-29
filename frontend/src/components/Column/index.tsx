import React from "react";
import Card from "../Card";
import Loader from "../common/Loader";
import { CardData } from "../Card/types";

interface ColumnProps {
  title: string;
  cards: CardData[];
  loading: boolean;
}

const Column: React.FC<ColumnProps> = ({ title, cards, loading }) => {
  return (
    <div className="flex-1 bg-gray-100 p-4 m-2 rounded-md shadow-md">
      <h2 className="font-bold text-xl mb-4">{title}</h2>
      {loading ? (
        <Loader />
      ) : (
        cards.map((card, index) => <Card key={index} card={card} />)
      )}
    </div>
  );
};

export default Column;
