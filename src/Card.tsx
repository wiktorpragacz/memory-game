import { useEffect, useState } from "react";
import { useCards } from "./CardsProvider";
import { Card as CardType } from "./App";

type CardProps = {
  card: CardType;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  completed?: number;
  setCompleted?: React.Dispatch<React.SetStateAction<number>>;
  handleCompleted: () => void;
};

const Card = ({ card, setCards, handleCompleted }: CardProps) => {
  const { lastCards, setLastCards } = useCards();
  const [loading, setLoading] = useState(false);

  function handlePreviewCard() {
    setLastCards((prevCards) => [...prevCards, card.id]);
    handleFlip();
  }

  useEffect(() => {
    if (lastCards.length === 2) {
      setLoading(true);
      if (lastCards[0] === lastCards[1]) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === lastCards[0] ? { ...c, matched: true } : c
            )
          );
        }, 300);
        handleCompleted();
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
          setCards((prevCards) =>
            prevCards.map((c) => {
              if (c.matched) {
                return { ...c, isHidden: false };
              } else {
                return { ...c, isHidden: true };
              }
            })
          );
        }, 1500);
      }
      setLastCards([]);
    }
  }, [lastCards]);

  const handleFlip = () => {
    setCards((prevCard) =>
      prevCard.map((c) =>
        c.uniqueId === card.uniqueId ? { ...card, isHidden: false } : c
      )
    );
  };

  return (
    <button
      disabled={card.matched}
      className="flip-card-outer fade-in w-16 h-16 md:h-32 md:w-32 flex items-center transition-colors  delay-200 rounded-lg"
      onClick={() => !loading && card.isHidden && handlePreviewCard()}
    >
      <div
        className={`flip-card-inner  ${card.isHidden && "is-flipped "} ${
          card.matched && "bg-blue-500/20"
        } border  rounded-lg`}
      >
        <div className="card front  ">
          <div className="card-body rounded-lg d-flex justify-content-center align-items-center">
            <img src={card.url} />
          </div>
        </div>
        <div className="card back ">
          <div className="card-body active:bg-slate-50 transition-colors rounded-lg bg-white d-flex justify-content-center align-items-center"></div>
        </div>
      </div>
    </button>
  );
};

export default Card;
