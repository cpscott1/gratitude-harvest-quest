export interface BingoSquare {
  id: number;
  prompt: string;
  completed: boolean;
  reflection: string;
}

export const checkBingoLines = (squares: BingoSquare[]) => {
  const completedLines: number[][] = [];
  
  // Check rows
  for (let row = 0; row < 5; row++) {
    const rowIndices = Array.from({ length: 5 }, (_, i) => row * 5 + i);
    if (rowIndices.every(i => squares[i]?.completed)) {
      completedLines.push(rowIndices);
    }
  }
  
  // Check columns
  for (let col = 0; col < 5; col++) {
    const colIndices = Array.from({ length: 5 }, (_, i) => i * 5 + col);
    if (colIndices.every(i => squares[i]?.completed)) {
      completedLines.push(colIndices);
    }
  }
  
  // Check diagonal (top-left to bottom-right)
  const diag1 = [0, 6, 12, 18, 24];
  if (diag1.every(i => squares[i]?.completed)) {
    completedLines.push(diag1);
  }
  
  // Check diagonal (top-right to bottom-left)
  const diag2 = [4, 8, 12, 16, 20];
  if (diag2.every(i => squares[i]?.completed)) {
    completedLines.push(diag2);
  }
  
  return completedLines;
};

export const getRewardStatus = (squares: BingoSquare[]) => {
  const completedCount = squares.filter(s => s.completed).length;
  const completedLines = checkBingoLines(squares);
  const hasFullCard = completedCount === 25;
  const hasAtLeastOneLine = completedLines.length > 0;
  
  return {
    completedCount,
    completedLines: completedLines.length,
    hasFullCard,
    hasAtLeastOneLine,
    unlockedRewards: {
      discount: hasAtLeastOneLine,
      giveaway: hasFullCard,
      charity: hasFullCard,
    }
  };
};
