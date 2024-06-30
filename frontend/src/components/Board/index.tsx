import React from "react";
import Column from "../Column";
import { ColumnData } from "../Column/types";

interface BoardProps {
  columns: ColumnData[];
  loading: boolean;
}

const Board: React.FC<BoardProps> = ({ columns, loading }) => {
  return (
    <div className="flex w-full">
      {columns.map((column, index) => (
        <Column
          key={index}
          title={column.title}
          cards={column.cards}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default Board;
