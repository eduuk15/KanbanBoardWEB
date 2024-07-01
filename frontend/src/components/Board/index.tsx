import React from "react";
import Column from "../Column";
import { ColumnData } from "../Column/types";

interface BoardProps {
  columns: ColumnData[];
  loading: boolean;
  onRefreshCards: () => void;
}

const Board: React.FC<BoardProps> = ({ columns, loading, onRefreshCards }) => {
  return (
    <div className="flex w-full">
      {columns.map((column, index) => (
        <Column
          key={index}
          title={column.title}
          cards={column.cards}
          loading={loading}
          onRefreshCards={onRefreshCards}
        />
      ))}
    </div>
  );
};

export default Board;
