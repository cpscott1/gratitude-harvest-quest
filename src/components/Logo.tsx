import { Link } from "react-router-dom";
import logoImage from "@/assets/harvest-gratitude-logo.png";

export const Logo = () => {
  return (
    <Link to="/" className="block group transition-smooth hover:scale-105">
      <img 
        src={logoImage} 
        alt="Harvest Gratitude Bingo Logo" 
        className="w-24 h-24 md:w-32 md:h-32"
      />
    </Link>
  );
};
