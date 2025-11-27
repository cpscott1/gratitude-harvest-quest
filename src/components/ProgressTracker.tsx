import { Progress } from "@/components/ui/progress";
import { Trophy, Gift, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTrackerProps {
  completedCount: number;
  totalCount: number;
  completedLines: number;
  hasFullCard: boolean;
}

export const ProgressTracker = ({ 
  completedCount, 
  totalCount, 
  completedLines,
  hasFullCard 
}: ProgressTrackerProps) => {
  const percentage = (completedCount / totalCount) * 100;
  const hasAtLeastOneLine = completedLines > 0;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 p-6 bg-card rounded-2xl border-2 border-primary/10 shadow-card-harvest">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            Your Progress
          </h3>
          <span className="text-2xl font-bold text-primary">
            {completedCount}/{totalCount}
          </span>
        </div>
        <Progress value={percentage} className="h-3" />
        {completedLines > 0 && (
          <p className="text-sm text-accent font-medium mt-2">
            🎉 {completedLines} Bingo {completedLines === 1 ? 'Line' : 'Lines'} Completed!
          </p>
        )}
      </div>

      {/* Milestone Rewards */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Milestone Rewards
        </h4>
        
        <div className="grid gap-3">
          {/* 10% Discount - One Line */}
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border-2 transition-smooth",
              hasAtLeastOneLine
                ? "bg-primary/10 border-primary"
                : "bg-muted/50 border-border"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              hasAtLeastOneLine ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Gift className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={cn(
                "font-semibold",
                hasAtLeastOneLine ? "text-foreground" : "text-muted-foreground"
              )}>
                10% Discount Code
              </p>
              <p className="text-xs text-muted-foreground">
                Complete any line (row, column, or diagonal)
              </p>
            </div>
            {hasAtLeastOneLine && (
              <span className="text-xs font-bold text-primary uppercase">Unlocked!</span>
            )}
          </div>

          {/* Giveaway Entry - Full Card */}
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border-2 transition-smooth",
              hasFullCard
                ? "bg-secondary/10 border-secondary"
                : "bg-muted/50 border-border"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              hasFullCard ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={cn(
                "font-semibold",
                hasFullCard ? "text-foreground" : "text-muted-foreground"
              )}>
                Thanksgiving Giveaway Entry
              </p>
              <p className="text-xs text-muted-foreground">
                Complete all 25 squares
              </p>
            </div>
            {hasFullCard && (
              <span className="text-xs font-bold text-secondary uppercase">Unlocked!</span>
            )}
          </div>

          {/* Charity Donation - Full Card */}
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border-2 transition-smooth",
              hasFullCard
                ? "bg-accent/10 border-accent"
                : "bg-muted/50 border-border"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              hasFullCard ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Heart className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className={cn(
                "font-semibold",
                hasFullCard ? "text-foreground" : "text-muted-foreground"
              )}>
                Charity Donation Match
              </p>
              <p className="text-xs text-muted-foreground">
                We'll donate $5 to charity on your behalf
              </p>
            </div>
            {hasFullCard && (
              <span className="text-xs font-bold text-accent uppercase">Unlocked!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
