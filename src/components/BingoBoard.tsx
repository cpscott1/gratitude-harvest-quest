import { useState, useEffect } from "react";
import { gratitudePrompts } from "@/data/gratitudePrompts";
import { GratitudeModal } from "./GratitudeModal";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BingoSquare {
  id: number;
  prompt: string;
  completed: boolean;
  reflection: string;
}

export const BingoBoard = () => {
  const [squares, setSquares] = useState<BingoSquare[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<BingoSquare | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize board
  useEffect(() => {
    const savedProgress = localStorage.getItem('bingo_progress');
    if (savedProgress) {
      setSquares(JSON.parse(savedProgress));
    } else {
      const initialSquares = gratitudePrompts.map((prompt, index) => ({
        id: index,
        prompt,
        completed: index === 12, // Free space (center) starts completed
        reflection: index === 12 ? "Free Space!" : ""
      }));
      setSquares(initialSquares);
      localStorage.setItem('bingo_progress', JSON.stringify(initialSquares));
    }
  }, []);

  // Save progress
  const saveProgress = (updatedSquares: BingoSquare[]) => {
    localStorage.setItem('bingo_progress', JSON.stringify(updatedSquares));
    setSquares(updatedSquares);
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
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {completedCount} of 25 squares completed
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
    </>
  );
};
