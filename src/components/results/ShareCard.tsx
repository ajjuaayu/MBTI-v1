
"use client";

import { forwardRef } from "react";
import type { MBTIType } from "@/config/site";
import { MBTI_DESCRIPTIONS, APP_NAME } from "@/config/site";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import html2canvas from 'html2canvas'; // Ensure this is installed: npm install html2canvas

interface ShareCardProps {
  mbtiType: MBTIType;
  userName?: string;
  personaDescription?: string; // Optional: AI generated persona
}

// eslint-disable-next-line react/display-name
const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ mbtiType, userName, personaDescription }, ref) => {
  const typeInfo = MBTI_DESCRIPTIONS[mbtiType] || { title: "Personality Type", description: "Unique and special.", iconHint: "star sparkle" };
  const displayTitle = personaDescription ? personaDescription.split(/[,.]/)[0] : typeInfo.title; // Use first part of AI persona as title if available
  const cardName = userName || "You";

  return (
    <div ref={ref} className="bg-gradient-to-br from-primary via-accent to-secondary p-1 rounded-xl shadow-2xl">
      <Card className="w-full max-w-md mx-auto !border-0">
        <CardHeader className="text-center p-6 bg-background rounded-t-lg">
          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src={`https://placehold.co/100x100.png?text=${mbtiType}`}
              alt={mbtiType}
              layout="fill"
              objectFit="cover"
              data-ai-hint={typeInfo.iconHint}
            />
          </div>
          <p className="text-sm font-medium text-primary tracking-wider uppercase">{cardName}'s {APP_NAME} Result</p>
          <CardTitle className="text-4xl font-bold text-foreground mt-1">{mbtiType}</CardTitle>
          <p className="text-xl text-muted-foreground">{displayTitle}</p>
        </CardHeader>
        <CardContent className="p-6 text-center bg-background">
          <p className="text-lg text-foreground mb-4">
            {personaDescription ? personaDescription : typeInfo.description}
          </p>
          <div className="mt-2 text-xs text-muted-foreground">
            Discover your type at typecast.site (example)
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-accent/30 rounded-b-lg flex justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary mr-2">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z"></path>
            <path d="M12 12a4 4 0 100 8 4 4 0 000-8z" opacity="0.5"></path>
          </svg>
          <span className="font-semibold text-primary">{APP_NAME}</span>
        </CardFooter>
      </Card>
    </div>
  );
});

export default ShareCard;

export const ShareCardActions = ({ cardRef }: { cardRef: React.RefObject<HTMLDivElement> }) => {
  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: null });
        canvas.toBlob(async (blob) => {
          if (blob && navigator.share) {
            const file = new File([blob], "typecast_result.png", { type: "image/png" });
            try {
              await navigator.share({
                title: `My ${APP_NAME} Result!`,
                text: `I got ${cardRef.current?.querySelector('h2[class*="text-4xl"]')?.textContent || 'my personality type'} on ${APP_NAME}! Check it out.`, // More specific selector for MBTI type
                files: [file],
              });
            } catch (error) {
              console.error("Error sharing:", error);
              // Fallback for browsers that may not support sharing files or specific errors
              alert("Sharing failed. You can try downloading the image and sharing it manually.");
            }
          } else if (blob) {
            // Fallback for browsers that don't support navigator.share
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'typecast_result.png';
            link.click();
            URL.revokeObjectURL(link.href);
          } else {
             alert("Could not generate image for sharing.");
          }
        }, "image/png");
      } catch (error) {
        console.error("Error generating share image:", error);
        alert("Could not generate image. Try taking a screenshot.");
      }
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
       try {
        const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: null });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'typecast_result.png';
        link.click();
      } catch (error) {
        console.error("Error generating download image:", error);
        alert("Could not generate image for download.");
      }
    }
  };

  return (
    <div className="flex gap-4 mt-6 justify-center">
      <Button onClick={handleShare} variant="outline" size="lg">
        <Share2 className="mr-2 h-5 w-5" /> Share
      </Button>
      <Button onClick={handleDownload} size="lg">
        <Download className="mr-2 h-5 w-5" /> Download
      </Button>
    </div>
  );
};
