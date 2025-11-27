import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface GratitudeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: string;
  onComplete: (reflection: string) => void;
}

export const GratitudeModal = ({ open, onOpenChange, prompt, onComplete }: GratitudeModalProps) => {
  const [reflection, setReflection] = useState("");

  const handleComplete = () => {
    onComplete(reflection.trim());
    setReflection("");
    onOpenChange(false);
  };

  const handleSkip = () => {
    onComplete("");
    setReflection("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-2 border-primary/20 shadow-harvest">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center text-card-foreground">
            Take a Moment to Reflect
          </DialogTitle>
          <DialogDescription className="text-center text-lg font-medium text-foreground">
            {prompt}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Share your gratitude (optional)
            </label>
            <Textarea
              placeholder="Type what you're grateful for here..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {reflection.length}/500
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleComplete}
              className="flex-1 gradient-harvest hover:shadow-harvest transition-smooth font-semibold"
            >
              <Heart className="w-4 h-4 mr-2" />
              Complete Square
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Your reflections are private and saved to your device
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
