import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { getInvites, getMyGroups, getOtherGroups } from "../../api/groups";
import { GroupData } from "../../components/Group/types";
import { InviteData } from "../../components/Invite/types";
import Group from "../../components/Group";
import Invite from "../../components/Invite";
import Loader from "../../components/common/Loader";

const GroupsPage: React.FC = () => {
  const { loggedUserInfo } = useAuth();
  const user = loggedUserInfo();

  const [myGroups, setMyGroups] = useState<GroupData[]>([]);
  const [otherGroups, setOtherGroups] = useState<GroupData[]>([]);
  const [invites, setInvites] = useState<InviteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [myGroupsData, otherGroupsData, invitesData] = await Promise.all([
          getMyGroups(),
          getOtherGroups(),
          getInvites(),
        ]);

        setMyGroups(myGroupsData);
        setOtherGroups(otherGroupsData);
        setInvites(invitesData);
      } catch (error) {
        console.error("Erro ao buscar dados dos grupos e convites", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user?.id]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Meus Grupos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myGroups.map((group) => (
                  <Group key={group.id} group={group} />
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Outros Grupos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherGroups.map((group) => (
                  <Group key={group.id} group={group} />
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Convites</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {invites.map((invite) => (
                  <Invite key={invite.id} invite={invite} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GroupsPage;
