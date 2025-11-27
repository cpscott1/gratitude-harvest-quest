import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BingoBoard } from "@/components/BingoBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Board = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user has submitted email
    const userData = localStorage.getItem('harvest_user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const { firstName } = JSON.parse(userData);
    setUserName(firstName);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden">
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-fall opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🍂
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          {userName && (
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {userName}! 🍁
            </h1>
          )}
        </div>

        {/* Bingo Board */}
        <BingoBoard />

        {/* American Harvest Foods Branding */}
        <div className="mt-12 text-center opacity-75">
          <p className="text-sm text-muted-foreground">
            Presented by <span className="font-semibold text-foreground">American Harvest Foods</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board;
