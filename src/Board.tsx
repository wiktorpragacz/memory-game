import { ReactNode } from "react";

type BoardProps = {
  children: ReactNode;
};

const Board = ({ children }: BoardProps) => {
  return (
    <section className="grid grid-cols-4 gap-2 md:gap-5 grid-rows-4 place-content-center">
      {children}
    </section>
  );
};

export default Board;
