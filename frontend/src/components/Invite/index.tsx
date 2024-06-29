import React, { useEffect, useState } from "react";
import { InviteData } from "./types";
import { GroupData } from "../Group/types";
import { getGroup } from "../../api/groups";
import { getUserById } from "../../api/users";
import { UserData } from "../User/types";
import { toast } from "react-toastify";

interface InviteCardProps {
  invite: InviteData;
}

const Invite: React.FC<InviteCardProps> = ({ invite }) => {
  const [userInvite, setUserInvite] = useState<UserData | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUserInvite = await getUserById(invite.user_id);
        setUserInvite(fetchedUserInvite);
      } catch (error) {
        console.error("Erro ao buscar dados do grupo e/ou usuário", error);
        toast.error(
          "Erro ao buscar dados do grupo e/ou usuário. Por favor, tente novamente."
        );
      }
    }
    fetchData();
  }, [invite.user_id, invite.group_id]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{userInvite?.name}</h3>
      <p>Convite de: {userInvite?.name}</p>
    </div>
  );
};

export default Invite;
