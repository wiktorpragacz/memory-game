import { ReactNode, createContext, useContext, useState } from "react";

type CardProviderProps = {
  children: ReactNode;
};

type CardContext = {
  lastCards: number[];
  setLastCards: React.Dispatch<React.SetStateAction<number[]>>;
};

export const CardsContext = createContext<CardContext>({} as CardContext);

const CardsProvider = ({ children }: CardProviderProps) => {
  const [lastCards, setLastCards] = useState<number[]>([]);

  return (
    <CardsContext.Provider value={{ lastCards, setLastCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => useContext(CardsContext);

export default CardsProvider;
