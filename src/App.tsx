import { useEffect, useState } from "react";
import Board from "./Board";
import Card from "./Card";
import Scoreboard from "./Scoreboard";
import { cards as importedCards } from "../cards.ts";
import { v4 as uuidv4 } from "uuid";

export type Card = {
  id: number;
  url: string;
  isHidden: boolean;
  matched: boolean;
  uniqueId?: string;
};

const App = () => {
  const [completed, setCompleted] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (!(completed === 128)) {
      const timer = setTimeout(() => {
        if (seconds === 59) {
          setMinutes((prevSeconds) => prevSeconds + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      console.log("koniec");
    }
  }, [seconds]);

  const [cards, setCards] = useState<Card[]>(
    shuffleArray([
      ...importedCards.map((c) => ({
        ...c,
        uniqueId: uuidv4(),
      })),
      ...importedCards.map((c) => ({
        ...c,
        uniqueId: uuidv4(),
      })),
    ])
  );

  function handleCompleted() {
    setCompleted((prev) => prev + 1);
  }

  function shuffleArray(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleRestart() {
    setLoaded(false);

    setCompleted(0);
    setCards(
      shuffleArray([
        ...importedCards.map((c) => ({
          ...c,
          uniqueId: uuidv4(),
        })),
        ...importedCards.map((c) => ({
          ...c,
          uniqueId: uuidv4(),
        })),
      ])
    );
    setTimeout(() => {
      setLoaded(true);
      setMinutes(0);
      setSeconds(0);
    }, 2000);
  }

  return (
    <>
      <section className="h-screen grid place-content-center w-full">
        {completed / 16 === 8 ? (
          <>
            <h1>
              You won in{" "}
              <span className="text-green-500 font-bold">
                {minutes < 10 && "0"}
                {minutes}:{seconds < 10 && "0"}
                {seconds}
              </span>{" "}
              {minutes > 0 ? "minutes" : "seconds"}
            </h1>
            <button
              onClick={handleRestart}
              className=" border rounded-md mt-10 py-2 capitalize hover:bg-slate-50"
            >
              restart
            </button>
          </>
        ) : (
          <>
            <h1 className="text-center text-3xl mb-5">Memory Game</h1>
            <Board>
              {loaded
                ? cards.map((card, index) => (
                    <Card
                      key={index}
                      card={card}
                      setCards={setCards}
                      setCompleted={setCompleted}
                      completed={completed}
                      handleCompleted={handleCompleted}
                    />
                  ))
                : cards.map((_, index) => (
                    <div
                      key={index}
                      role="status"
                      className="space-y-8 w-16 h-16 md:h-32 md:w-32 flex items-center transition-colors  delay-200 rounded-lg animate-pulse  "
                    >
                      <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded  dark:bg-gray-200"></div>

                      <span className="sr-only">Loading...</span>
                    </div>
                  ))}
            </Board>

            <Scoreboard
              completed={completed}
              seconds={seconds}
              minutes={minutes}
              restart={handleRestart}
            />
          </>
        )}
      </section>
    </>
  );
};

export default App;
