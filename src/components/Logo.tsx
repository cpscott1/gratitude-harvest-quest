import logo from "@/assets/harvest-gratitude-logo.png";

export const Logo = () => {
  return (
    <img 
      src={logo} 
      alt="Harvest Gratitude Bingo" 
      className="h-16 w-16 md:h-20 md:w-20 drop-shadow-lg"
    />
  );
};
