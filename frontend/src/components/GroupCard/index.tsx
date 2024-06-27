import React from "react";
import { GroupData } from "./types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGroups } from "../../context/GroupsContext";

interface GroupCardProps {
    group: GroupData;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    const { id, name, photo } = group;
    const { deleteGroup } = useGroups;

    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja remover o grupo ${name}?`)) {
            deleteGroup(id);
        }  
    };
    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={photo}
              alt="Group"
              className="h-10 w-10 rounded-full mr-4"
            />
            <h3 className="font-bold text-lg">{name}</h3>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleDelete}
            >
              <FaTrash />
            </button>
          </div>
        </div>
    );
};

export default GroupCard;