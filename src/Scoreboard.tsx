type ScoreboardProps = {
  completed: number;
  restart: () => void;
  seconds: number;
  minutes: number;
};

const Scoreboard = ({
  completed,
  restart,
  seconds,
  minutes,
}: ScoreboardProps) => {
  return (
    <section className="w-full text-slate-600 flex justify-between border mt-5 rounded-lg p-3 text-center">
      <div>
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </div>
      <button onClick={restart}>restart</button>
      <div>{completed / 16}/8 completed</div>
    </section>
  );
};

export default Scoreboard;
