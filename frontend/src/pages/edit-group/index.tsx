import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getGroup, getGroupInvites, updateGroup } from "../../api/groups";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { GroupData } from "../../components/Group/types";
import { InviteData } from "../../components/Invite/types";
import Invite from "../../components/Invite";

const EditGroup: React.FC = () => {
  const navigate = useNavigate();
  const { loggedUserInfo } = useAuth();
  const user = loggedUserInfo();

  const { id } = useParams<{ id: string }>();
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [name, setName] = useState(groupData?.name ?? "");
  const [description, setDescription] = useState(groupData?.description ?? "");
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  const [invites, setInvites] = useState<InviteData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedGroupData = await getGroup(parseInt(id!));
        setGroupData(fetchedGroupData);

        if (fetchedGroupData.created_by === user?.id) {
          setCanEdit(true);
        }

        setName(fetchedGroupData.name);
        setDescription(fetchedGroupData.description);

        const fetchedInvites = await getGroupInvites(parseInt(id!));
        setInvites(fetchedInvites);
      } catch (error: any) {
        toast.error(error.response.data.detail);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, user?.id]);

  const handleUpdateGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canEdit) {
      toast.error("Você não tem permissão para editar este grupo.");
      return;
    }

    if (!name || !description) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await updateGroup(parseInt(id!), name, description);

      navigate("/groups");
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  const handleRefreshInvites = async () => {
    try {
      const [invitesData] = await Promise.all([getGroupInvites(parseInt(id!))]);
      setInvites(invitesData);
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md w-120">
            <div className="flex justify-center mb-6">
              <h2 className="text-2xl font-bold">Dados do Grupo</h2>
            </div>
            <form onSubmit={handleUpdateGroup}>
              <Input
                id="name"
                label="Nome do Grupo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                disabled={!canEdit}
              />
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descrição do Grupo
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={4}
                  required
                  disabled={!canEdit}
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button type="submit" disabled={!canEdit}>
                  Atualizar
                </Button>
              </div>
            </form>
            {invites.length > 0 && (
              <div className="mb-8 mt-8">
                <h2 className="text-xl font-bold mb-4">Convites</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {invites.map((invite) => (
                    <Invite
                      key={invite.id}
                      invite={invite}
                      onRefreshInvites={handleRefreshInvites}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditGroup;
