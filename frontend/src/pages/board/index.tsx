// HomePage.tsx
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Board from "../../components/Board";
import Footer from "../../components/Footer";
import { CardData } from "../../components/Card/types";

const BoardPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockCards: CardData[] = [
      {
        title: "Task 1",
        description: "Description for Task 1",
        status: "To Do",
        type: "feature",
        assignedUserId: 1, // Exemplo de valor para assignedUser
        priority: "high", // Exemplo de valor para priorityIcon
        dueDate: "2024-06-01", // Exemplo de valor para dueDate
      },
      {
        title: "Task 2",
        description: "Description for Task 2",
        status: "To Do",
        type: "investigation",
        assignedUserId: 2, // Exemplo de valor para assignedUser
        priority: "medium", // Exemplo de valor para priorityIcon
        dueDate: "2024-06-03", // Exemplo de valor para dueDate
      },
      {
        title: "Task 3",
        description: "Description for Task 3",
        status: "In Progress",
        type: "refactor",
        assignedUserId: 3, // Exemplo de valor para assignedUser
        priority: "low", // Exemplo de valor para priorityIcon
        dueDate: "2024-06-05", // Exemplo de valor para dueDate
      },
      {
        title: "Task 4",
        description: "Description for Task 6",
        status: "Done",
        type: "fix",
        assignedUserId: 4, // Exemplo de valor para assignedUser
        priority: "high", // Exemplo de valor para priorityIcon
        dueDate: "2024-06-07", // Exemplo de valor para dueDate
      },
    ];

    setTimeout(() => {
      setCards(mockCards);
      setLoading(false);
    }, 1001);
  }, []);

  const columns = [
    { title: "To Do", cards: cards.filter((card) => card.status === "To Do") },
    {
      title: "In Progress",
      cards: cards.filter((card) => card.status === "In Progress"),
    },
    { title: "Done", cards: cards.filter((card) => card.status === "Done") },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 bg-gray-200">
        <Board columns={columns} loading={loading} />
      </main>
      <Footer />
    </div>
  );
};

export default BoardPage;
