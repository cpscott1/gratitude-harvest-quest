import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BingoBoard } from "@/components/BingoBoard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ShareButton } from "@/components/ShareButton";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { GratitudeWall } from "@/components/GratitudeWall";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { getRewardStatus, BingoSquare } from "@/utils/bingoLogic";
import { useToast } from "@/hooks/use-toast";

const Board = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [squares, setSquares] = useState<BingoSquare[]>([]);
  const { toast } = useToast();

  // Clear localStorage function for testing
  const clearBingoData = () => {
    localStorage.removeItem('bingo_progress');
    localStorage.removeItem('harvest_user');
    toast({
      title: "🔄 Data Cleared!",
      description: "Bingo progress and user data have been cleared. Redirecting to start...",
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  useEffect(() => {
    // Check if user has submitted email
    const userData = localStorage.getItem('harvest_user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const { firstName } = JSON.parse(userData);
    setUserName(firstName);
    
    // Load bingo progress
    const savedProgress = localStorage.getItem('bingo_progress');
    if (savedProgress) {
      setSquares(JSON.parse(savedProgress));
    }
    
    // Poll for updates to bingo progress
    const interval = setInterval(() => {
      const updatedProgress = localStorage.getItem('bingo_progress');
      if (updatedProgress) {
        setSquares(JSON.parse(updatedProgress));
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [navigate]);
  // Add keyboard shortcut for clearing data (Ctrl+Shift+R)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        clearBingoData();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearBingoData]);
  
  const rewardStatus = getRewardStatus(squares);

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
          <Button
            variant="destructive"
            size="sm"
            onClick={clearBingoData}
            className="opacity-50 hover:opacity-100 ml-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset (Dev)
          </Button>
          
          {userName && (
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {userName}! 🍁
            </h1>
          )}
        </div>

        {/* Progress Tracker */}
        {squares.length > 0 && (
          <ProgressTracker
            completedCount={rewardStatus.completedCount}
            totalCount={25}
            completedLines={rewardStatus.completedLines}
            hasFullCard={rewardStatus.hasFullCard}
          />
        )}

        {/* Bingo Board */}
        <BingoBoard />

        {/* Action Buttons */}
        {squares.length > 0 && (
          <div className="w-full max-w-4xl mx-auto mt-6 flex flex-wrap gap-3 justify-center">
            <ShareButton completedCount={rewardStatus.completedCount} />
            <CertificateGenerator 
              userName={userName}
              completedCount={rewardStatus.completedCount}
              hasFullCard={rewardStatus.hasFullCard}
            />
          </div>
        )}

        {/* Dev Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground opacity-75">
            Dev: Press <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">Ctrl+Shift+R</kbd> to reset data
          </p>
        </div>
        {/* Gratitude Wall */}
        <GratitudeWall />

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
