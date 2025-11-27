import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="w-10 h-10 rounded-lg bg-gradient-harvest flex items-center justify-center shadow-card-harvest transition-smooth group-hover:scale-105">
        <span className="text-2xl">🍁</span>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground leading-tight">
          Harvest Gratitude
        </span>
        <span className="text-xs text-muted-foreground leading-tight">
          Bingo
        </span>
      </div>
    </Link>
  );
};
