import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { email: string; firstName: string }) => void;
}

export const EmailCaptureModal = ({ open, onOpenChange, onSubmit }: EmailCaptureModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { firstName?: string; email?: string } = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = "Please enter your first name";
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = "Name must be at least 2 characters";
    }
    
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Save to localStorage for now
    localStorage.setItem('harvest_user', JSON.stringify({ email, firstName }));
    
    onSubmit({ email: email.trim(), firstName: firstName.trim() });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-2 border-primary/20 shadow-harvest">
        <DialogHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-card-foreground">
            Welcome to Gratitude Bingo!
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Enter your details to start your journey of gratitude and unlock exclusive rewards.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-card-foreground font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors({ ...errors, firstName: undefined });
              }}
              className={`transition-smooth ${errors.firstName ? 'border-destructive' : ''}`}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`transition-smooth ${errors.email ? 'border-destructive' : ''}`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full gradient-harvest hover:shadow-harvest transition-smooth font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Getting Ready..." : "Start Playing"}
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground pt-2">
            By continuing, you agree to receive updates from American Harvest Foods. 
            We respect your privacy and won't spam you.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
