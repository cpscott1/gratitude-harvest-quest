import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = (data: { email: string; firstName: string }) => {
    setIsModalOpen(false);
    toast({
      title: `Welcome, ${data.firstName}! 🎉`,
      description: "Your gratitude journey begins now. Let's start filling that bingo card!",
    });
    
    // Navigate to board after a short delay
    setTimeout(() => {
      navigate('/board');
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <Logo />
      </div>
      
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-fall opacity-60"
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
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 pt-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Harvest Gratitude
              <span className="block text-primary">Bingo</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Turn gratitude into a game this Thanksgiving. Complete your bingo card, 
              unlock rewards, and create meaningful moments with loved ones.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="text-lg px-8 py-6 gradient-harvest hover:shadow-harvest transition-smooth animate-gentle-pulse font-semibold"
            >
              Start My Gratitude Bingo
            </Button>
          </div>

          {/* Email Capture Modal */}
          <EmailCaptureModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            onSubmit={handleEmailSubmit}
          />

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            {[
              {
                emoji: "🎯",
                title: "Interactive Play",
                description: "Click squares, share gratitude, complete your card"
              },
              {
                emoji: "🎁",
                title: "Unlock Rewards",
                description: "Earn discounts and enter giveaways as you play"
              },
              {
                emoji: "❤️",
                title: "Make an Impact",
                description: "Complete your card and we'll donate to charity"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 shadow-card-harvest hover:shadow-harvest transition-smooth"
              >
                <div className="text-5xl mb-3">{feature.emoji}</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* American Harvest Foods Branding */}
          <div className="pt-8 opacity-75">
            <p className="text-sm text-muted-foreground">
              Presented by <span className="font-semibold text-foreground">American Harvest Foods</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
