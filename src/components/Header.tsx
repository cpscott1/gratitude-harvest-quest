import { Logo } from "./Logo";

interface HeaderProps {
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg';
}

export const Header = ({ className = '', logoSize = 'sm' }: HeaderProps) => {
  return (
    <header className={`w-full py-4 px-4 md:px-6 ${className}`}>
      <div className="container mx-auto">
        <Logo size={logoSize} />
      </div>
    </header>
  );
};
