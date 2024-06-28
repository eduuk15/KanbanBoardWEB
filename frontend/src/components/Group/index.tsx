import React from "react";
import { GroupData } from "./types";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  group: GroupData;
}

const Group: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/group/${group.id}`); // Rota para a edição do grupo com o ID
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-lg font-bold">{group.name}</h3>
      <p>{group.description}</p>
    </div>
  );
};

export default Group;
