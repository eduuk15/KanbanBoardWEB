import React, { createContext, useContext, useState, ReactNode } from "react";
import { GroupData } from "../components/GroupCard/types";

interface GroupsContextType {
  groups: GroupData[];
  setGroups: React.Dispatch<React.SetStateAction<GroupData[]>>;
  deleteGroup: (id: number) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export const GroupsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [groups, setGroups] = useState<GroupData[]>([]);

  const deleteGroup = (id: number) => {
    setGroups((prevGroups) => prevGroups.filter((group) => group.id !== id));
  };

  return (
    <GroupsContext.Provider value={{ groups, setGroups, deleteGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = (): GroupsContextType => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error("useGroups must be used within a GroupsProvider");
  }
  return context;
};