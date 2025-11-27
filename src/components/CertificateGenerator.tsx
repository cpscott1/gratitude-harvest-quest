import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateGeneratorProps {
  userName: string;
  completedCount: number;
  hasFullCard: boolean;
}

export const CertificateGenerator = ({ 
  userName, 
  completedCount, 
  hasFullCard 
}: CertificateGeneratorProps) => {
  const { toast } = useToast();

  const generateCertificate = () => {
    // Create a canvas to generate the certificate
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FFF7ED');
    gradient.addColorStop(1, '#FED7AA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner border
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 3;
    ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

    // Title
    ctx.fillStyle = '#7C2D12';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Gratitude', canvas.width / 2, 160);

    // Decorative line
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 200);
    ctx.lineTo(900, 200);
    ctx.stroke();

    // Main text
    ctx.fillStyle = '#292524';
    ctx.font = '32px Arial';
    ctx.fillText('This certifies that', canvas.width / 2, 280);

    // Name
    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 56px Arial';
    ctx.fillText(userName, canvas.width / 2, 360);

    // Achievement text
    ctx.fillStyle = '#292524';
    ctx.font = '28px Arial';
    const achievementText = hasFullCard 
      ? 'has completed their entire Gratitude Journey'
      : `has completed ${completedCount} gratitude reflections`;
    ctx.fillText(achievementText, canvas.width / 2, 440);
    ctx.fillText('on Harvest Gratitude Bingo', canvas.width / 2, 480);

    // Emoji decoration
    ctx.font = '48px Arial';
    ctx.fillText('🍂 🍁 🦃 🍁 🍂', canvas.width / 2, 560);

    // Date
    ctx.fillStyle = '#78716C';
    ctx.font = '24px Arial';
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    ctx.fillText(date, canvas.width / 2, 640);

    // Footer
    ctx.font = 'italic 20px Arial';
    ctx.fillText('American Harvest Foods', canvas.width / 2, 720);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `gratitude-certificate-${userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Certificate Downloaded!",
        description: "Your Certificate of Gratitude has been saved.",
      });
    });
  };

  return (
    <Button
      onClick={generateCertificate}
      variant="outline"
      className="font-semibold"
      disabled={completedCount === 0}
    >
      <Download className="w-4 h-4 mr-2" />
      Download Certificate
    </Button>
  );
};
