import React from "react";
import { InviteData } from "./types";

interface InviteCardProps {
  invite: InviteData;
}

const Invite: React.FC<InviteCardProps> = ({ invite }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{invite.groupId}</h3>
      <p>Convite de: {invite.userId}</p>
    </div>
  );
};

export default Invite;
