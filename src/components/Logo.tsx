import { Link } from "react-router-dom";
import logoImage from "@/assets/harvest-gratitude-logo.png";

export const Logo = () => {
  return (
    <Link to="/" className="block transition-smooth hover:scale-105">
      <img 
        src={logoImage} 
        alt="Harvest Gratitude Bingo Logo" 
        className="w-20 h-20 md:w-28 md:h-28"
      />
    </Link>
  );
};
