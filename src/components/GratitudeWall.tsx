import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface GratitudeEntry {
  name: string;
  reflection: string;
  prompt: string;
  timestamp: number;
}

export const GratitudeWall = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);

  useEffect(() => {
    // Load shared gratitudes from localStorage
    const loadEntries = () => {
      const allEntries: GratitudeEntry[] = [];
      
      // Get user info
      const userData = localStorage.getItem('harvest_user');
      if (!userData) return;
      
      const { firstName } = JSON.parse(userData);
      
      // Get bingo progress
      const progress = localStorage.getItem('bingo_progress');
      if (!progress) return;
      
      const squares = JSON.parse(progress);
      
      // Collect reflections that have text
      squares.forEach((square: any) => {
        if (square.completed && square.reflection && square.reflection !== "Free Space!") {
          allEntries.push({
            name: firstName,
            reflection: square.reflection,
            prompt: square.prompt,
            timestamp: Date.now()
          });
        }
      });
      
      // Sort by most recent
      allEntries.sort((a, b) => b.timestamp - a.timestamp);
      
      // Take top 6 entries
      setEntries(allEntries.slice(0, 6));
    };
    
    loadEntries();
    
    // Refresh every 5 seconds
    const interval = setInterval(loadEntries, 5000);
    return () => clearInterval(interval);
  }, []);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-6 bg-card rounded-2xl border-2 border-primary/10 shadow-card-harvest">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-secondary" fill="currentColor" />
          <h3 className="text-2xl font-bold text-card-foreground">
            Your Gratitude Reflections
          </h3>
          <Heart className="w-5 h-5 text-secondary" fill="currentColor" />
        </div>
        <p className="text-sm text-muted-foreground">
          The moments of thankfulness you've captured
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {entries.map((entry, index) => (
          <Card key={index} className="bg-background/50 border-border hover:border-primary/50 transition-smooth">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                {entry.prompt}
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                "{entry.reflection}"
              </p>
              <p className="text-xs text-muted-foreground">
                — {entry.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
