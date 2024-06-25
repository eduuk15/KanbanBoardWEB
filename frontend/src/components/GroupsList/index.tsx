import React from "react";
import GroupCard from "../GroupCard";
import { GroupData } from "../GroupCard/types";

interface GroupsListProps {
    groups: GroupData[];
    loading: boolean;
}

const GroupsList: React.FC<GroupsListProps> = ({ groups, loading }) => {
    if (loading) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col w-full">
            {groups.map((group) => (
                <GroupCard key={group.id}  group={group} />
            ))}
        </div>
    );
};

export default GroupsList;