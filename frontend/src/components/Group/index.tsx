import React, { useState } from "react";
import { GroupData } from "./types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { sendInvite } from "../../api/groups";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import Button from "../../components/common/Button";

interface GroupCardProps {
  group: GroupData;
  canJoin: boolean;
}

const Group: React.FC<GroupCardProps> = ({ group, canJoin }) => {
  const navigate = useNavigate();
  const { loggedUserInfo } = useAuth();
  const user = loggedUserInfo();
  const [showDialog, setShowDialog] = useState(false);

  const handleEdit = () => {
    navigate(`/group/${group.id}`);
  };

  const handleSendInvite = async () => {
    try {
      await sendInvite(group.id);
      toast.success("Convite enviado com sucesso!");
    } catch (error: any) {
      toast.error(error.response.data.detail);
    } finally {
      setShowDialog(false);
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold cursor-pointer">{group.name}</h3>
          <p>{group.description}</p>
        </div>
        {canJoin ? (
          <Button onClick={handleOpenDialog} className="ml-auto">
            Participar
          </Button>
        ) : (
          <Button onClick={handleEdit} className="ml-auto">
            {group.created_by != user?.id ? "Visualizar" : "Editar"}
          </Button>
        )}
      </div>
      {showDialog && (
        <ConfirmationDialog
          title="Confirmação"
          message={`Você realmente quer participar do grupo "${group.name}"?`}
          onConfirm={handleSendInvite}
          onCancel={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Group;
