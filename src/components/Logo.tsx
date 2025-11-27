import { Link } from "react-router-dom";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  };

  return (
    <Link 
      to="/" 
      className={`inline-block transition-smooth hover:opacity-80 ${className}`}
    >
      <div className="font-black tracking-tight leading-none">
        {/* "HARVEST GRATITUDE" in orange */}
        <div className={`${sizeClasses[size]} text-primary font-extrabold`}>
          HARVEST GRATITUDE
        </div>
        
        {/* "BINGO" in burgundy/red */}
        <div className={`${sizeClasses[size]} text-secondary font-black -mt-1`}>
          BINGO
        </div>
      </div>
    </Link>
  );
};
