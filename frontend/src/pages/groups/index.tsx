import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GroupsList from "../../components/GroupsList";
import { GroupData } from "../../components/GroupCard/types";

const GroupsPage: React.FC = () => {
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockGroups: GroupData[] = [
            {
                id: 1,
                name: "Grupo 1",
                photo: "/group1.jpg",
            },
            {
                id: 2,
                name: "Grupo 2",
                photo: "/group2.jpg",
            },
            {
                id: 3,
                name: "Grupo 3",
                photo: "/group3.jpg",
            },
        ];

        setTimeout(() => {
            setGroups(mockGroups);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-4 bg-gray-200">
                <GroupsList groups={groups} loading={loading} />
            </main>
            <Footer />
        </div>
    );
};

export default GroupsPage;