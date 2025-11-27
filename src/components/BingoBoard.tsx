import { useState, useEffect } from "react";
import { gratitudePrompts } from "@/data/gratitudePrompts";
import { GratitudeModal } from "./GratitudeModal";
import { RewardsModal } from "./RewardsModal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { checkBingoLines, getRewardStatus, BingoSquare } from "@/utils/bingoLogic";
import { useToast } from "@/hooks/use-toast";

export const BingoBoard = () => {
  const [squares, setSquares] = useState<BingoSquare[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<BingoSquare | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [previousLineCount, setPreviousLineCount] = useState(0);
  const { toast } = useToast();

  // Initialize board
  useEffect(() => {
    const savedProgress = localStorage.getItem('bingo_progress');
    if (savedProgress) {
      const saved = JSON.parse(savedProgress);
      setSquares(saved);
      const lines = checkBingoLines(saved);
      setPreviousLineCount(lines.length);
    } else {
      const initialSquares = gratitudePrompts.map((prompt, index) => ({
        id: index,
        prompt,
        completed: index === 12, // Free space (center) starts completed
        reflection: index === 12 ? "Free Space!" : ""
      }));
      setSquares(initialSquares);
      localStorage.setItem('bingo_progress', JSON.stringify(initialSquares));
      setPreviousLineCount(0);
    }
  }, []);

  // Save progress and check for celebrations
  const saveProgress = (updatedSquares: BingoSquare[]) => {
    localStorage.setItem('bingo_progress', JSON.stringify(updatedSquares));
    setSquares(updatedSquares);
    
    const currentLines = checkBingoLines(updatedSquares);
    const rewardStatus = getRewardStatus(updatedSquares);
    
    // Check if new line completed
    if (currentLines.length > previousLineCount) {
      triggerLineCelebration();
      setPreviousLineCount(currentLines.length);
      
      toast({
        title: "🎉 Bingo Line Complete!",
        description: "You've completed a line! Check your rewards.",
      });
      
      // Show rewards modal after a delay
      setTimeout(() => {
        setIsRewardsModalOpen(true);
      }, 2000);
    }
    
    // Check if full card completed
    if (rewardStatus.hasFullCard && previousLineCount < currentLines.length) {
      triggerFullCardCelebration();
      
      toast({
        title: "🏆 FULL CARD COMPLETE!",
        description: "Amazing! You've completed your entire gratitude journey!",
      });
    }
  };
  
  const triggerLineCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  const triggerFullCardCelebration = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F97316', '#DC2626', '#FBBF24']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F97316', '#DC2626', '#FBBF24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSquareClick = (square: BingoSquare) => {
    if (square.completed) return;
    setSelectedSquare(square);
    setIsModalOpen(true);
  };

  const handleComplete = (reflection: string) => {
    if (!selectedSquare) return;

    const updatedSquares = squares.map(square =>
      square.id === selectedSquare.id
        ? { ...square, completed: true, reflection }
        : square
    );

    saveProgress(updatedSquares);
    setSelectedSquare(null);
  };

  const completedCount = squares.filter(s => s.completed).length;
  const rewardStatus = getRewardStatus(squares);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        {/* Board Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Gratitude Board
          </h2>
          <p className="text-muted-foreground">
            Click each square to reflect and complete your bingo card
          </p>
        </div>

        {/* Bingo Grid */}
        <div className="grid grid-cols-5 gap-2 md:gap-3 p-4 bg-card rounded-2xl shadow-harvest border-2 border-primary/10">
          {squares.map((square) => (
            <button
              key={square.id}
              onClick={() => handleSquareClick(square)}
              disabled={square.completed}
              className={cn(
                "aspect-square p-2 md:p-3 rounded-lg border-2 transition-smooth relative",
                "flex flex-col items-center justify-center text-center",
                square.completed
                  ? "bg-primary/20 border-primary cursor-default"
                  : "bg-background border-border hover:border-primary hover:shadow-card-harvest cursor-pointer hover:scale-105",
                square.id === 12 && "bg-accent/30 border-accent"
              )}
            >
              <span className={cn(
                "text-xs md:text-sm font-medium leading-tight",
                square.completed ? "text-foreground" : "text-muted-foreground"
              )}>
                {square.prompt}
              </span>
              
              {square.completed && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/90 rounded-lg">
                  <Check className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Progress Info */}
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={() => setIsRewardsModalOpen(true)}
            className="font-semibold"
          >
            View My Rewards
          </Button>
        </div>
      </div>

      {/* Gratitude Modal */}
      {selectedSquare && (
        <GratitudeModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          prompt={selectedSquare.prompt}
          onComplete={handleComplete}
        />
      )}
      
      {/* Rewards Modal */}
      <RewardsModal
        open={isRewardsModalOpen}
        onOpenChange={setIsRewardsModalOpen}
        hasDiscount={rewardStatus.unlockedRewards.discount}
        hasGiveaway={rewardStatus.unlockedRewards.giveaway}
        hasCharity={rewardStatus.unlockedRewards.charity}
      />
    </>
  );
};
