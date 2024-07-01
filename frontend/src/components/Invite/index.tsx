import React, { useEffect, useState } from "react";
import { InviteData } from "./types";
import { getUserById } from "../../api/users";
import { UserData } from "../User/types";
import { toast } from "react-toastify";
import Button from "../common/Button";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { acceptInvite, declineInvite } from "../../api/groups";

interface InviteCardProps {
  invite: InviteData;
  onRefreshInvites: () => void;
}

const Invite: React.FC<InviteCardProps> = ({ invite, onRefreshInvites }) => {
  const [userInvite, setUserInvite] = useState<UserData | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [actionType, setActionType] = useState<"accept" | "decline" | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUserInvite = await getUserById(invite.user_id);
        setUserInvite(fetchedUserInvite);
      } catch (error: any) {
        toast.error(error.response.data.detail);
      }
    }
    fetchData();
  }, [invite.user_id, invite.group_id]);

  const handleOpenDialog = (action: "accept" | "decline") => {
    setActionType(action);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setActionType(null);
  };

  const handleConfirm = async () => {
    try {
      if (actionType === "accept") {
        await acceptInvite(invite.id);
      } else if (actionType === "decline") {
        await declineInvite(invite.id);
      }
      toast.success(
        `Convite ${
          actionType === "accept" ? "aceito" : "recusado"
        } com sucesso.`
      );
      onRefreshInvites();
      handleCloseDialog();
    } catch (error: any) {
      toast.error(
        `Erro ao ${actionType === "accept" ? "aceitar" : "recusar"} o convite.`
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{userInvite?.name}</h3>
      <p>{userInvite?.email}</p>
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => handleOpenDialog("decline")}
          className="mr-2 bg-red-500"
        >
          Recusar
        </Button>
        <Button onClick={() => handleOpenDialog("accept")}>Aceitar</Button>
      </div>
      {showDialog && (
        <ConfirmationDialog
          title="Confirmação"
          message={`Você realmente quer ${
            actionType === "accept" ? "aceitar" : "recusar"
          } o convite?`}
          onConfirm={handleConfirm}
          onCancel={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Invite;
