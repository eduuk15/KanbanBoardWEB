import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Board from "../../components/Board";
import Footer from "../../components/Footer";
import { CardData } from "../../components/Card/types";
import { getCards } from "../../api/cards";
import { toast } from "react-toastify";

const BoardPage: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [cardsData] = await Promise.all([getCards()]);

        setCards(cardsData);
      } catch (error: any) {
        toast.error(error.response.data.detail);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { title: "To Do", cards: cards.filter((card) => card.status === "To Do") },
    {
      title: "In Progress",
      cards: cards.filter((card) => card.status === "In Progress"),
    },
    { title: "Done", cards: cards.filter((card) => card.status === "Done") },
  ];

  const handleRefreshCards = async () => {
    try {
      const [cardsData] = await Promise.all([getCards()]);
      setCards(cardsData);
    } catch (error: any) {
      toast.error(error.response.data.detail);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 bg-gray-200">
        <Board
          columns={columns}
          loading={loading}
          onRefreshCards={handleRefreshCards}
        />
      </main>
      <Footer />
    </div>
  );
};

export default BoardPage;
