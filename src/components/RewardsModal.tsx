import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RewardsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasDiscount: boolean;
  hasGiveaway: boolean;
  hasCharity: boolean;
}

export const RewardsModal = ({ 
  open, 
  onOpenChange, 
  hasDiscount,
  hasGiveaway,
  hasCharity 
}: RewardsModalProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const discountCode = "GRATEFUL10";

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    toast({
      title: "Code Copied!",
      description: "Your discount code has been copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-2 border-primary/20 shadow-harvest">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center text-card-foreground">
            🎉 Rewards Unlocked!
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Congratulations on your progress! Here are your earned rewards.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {hasDiscount && (
            <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg">
              <h3 className="font-semibold text-card-foreground mb-2">
                10% Discount Code
              </h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-background rounded font-mono text-lg font-bold text-primary">
                  {discountCode}
                </code>
                <Button
                  size="sm"
                  onClick={copyDiscountCode}
                  className="gradient-harvest"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Use this code at checkout on AmericanHarvestFoods.com
              </p>
            </div>
          )}

          {hasGiveaway && (
            <div className="p-4 bg-secondary/10 border-2 border-secondary rounded-lg">
              <h3 className="font-semibold text-card-foreground mb-2">
                🏆 Giveaway Entry Confirmed
              </h3>
              <p className="text-sm text-muted-foreground">
                You're entered to win our Thanksgiving Grand Prize! Winner announced December 1st.
              </p>
            </div>
          )}

          {hasCharity && (
            <div className="p-4 bg-accent/10 border-2 border-accent rounded-lg">
              <h3 className="font-semibold text-card-foreground mb-2">
                ❤️ Charity Donation
              </h3>
              <p className="text-sm text-muted-foreground">
                Thank you for completing your gratitude journey! We've donated $5 to Feeding America in your honor.
              </p>
            </div>
          )}

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full gradient-harvest hover:shadow-harvest transition-smooth font-semibold"
          >
            Continue Playing
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Share your progress to inspire others and spread gratitude this Thanksgiving!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
