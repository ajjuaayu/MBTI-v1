
"use client";

import { forwardRef, useState, useEffect } from "react";
import type { MBTIType } from "@/config/site";
import { MBTI_DESCRIPTIONS, APP_NAME } from "@/config/site";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, Link as LinkIcon, Loader2 } from "lucide-react";
import html2canvas from 'html2canvas';
import { useToast } from "@/hooks/use-toast";

interface ShareCardProps {
  mbtiType: MBTIType;
  userName?: string;
  personaDescription?: string;
}

// eslint-disable-next-line react/display-name
const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ mbtiType, userName, personaDescription }, ref) => {
  const typeInfo = MBTI_DESCRIPTIONS[mbtiType] || { title: "Personality Type", description: "Unique and special.", iconHint: "star sparkle" };
  
  // Use AI persona if available for the title, otherwise the static type title
  const dynamicTitle = personaDescription ? (personaDescription.split(/[.!?]/)[0] || typeInfo.title) : typeInfo.title;
  // Use full persona description if available, otherwise static description
  const dynamicDescription = personaDescription || typeInfo.description;

  const cardName = userName || "You";
  const [appDomain, setAppDomain] = useState("our website");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppDomain(process.env.NEXT_PUBLIC_APP_DOMAIN || window.location.hostname);
    }
  }, []);

  return (
    <div ref={ref} className="bg-gradient-to-br from-primary via-accent to-secondary p-1 rounded-xl shadow-2xl">
      <Card className="w-full max-w-md mx-auto !border-0">
        <CardHeader className="text-center p-6 bg-background rounded-t-lg">
          <div 
            className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg"
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="shareCardMbtiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: "hsl(var(--primary))"}} />
                  <stop offset="100%" style={{stopColor: "hsl(var(--accent))"}} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="50" fill="url(#shareCardMbtiGradient)" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="hsl(var(--primary-foreground))"
                fontSize="38"
                fontFamily="var(--font-geist-sans), Helvetica Neue, sans-serif"
                fontWeight="bold"
              >
                {mbtiType}
              </text>
            </svg>
          </div>
          <p className="text-sm font-medium text-primary tracking-wider uppercase">{cardName}'s {APP_NAME} Result</p>
          <CardTitle className="text-4xl font-bold text-foreground mt-1">{mbtiType}</CardTitle>
          <p className="text-xl text-muted-foreground">{dynamicTitle}</p>
        </CardHeader>
        <CardContent className="p-6 text-center bg-background">
          <p className="text-lg text-foreground mb-4 leading-relaxed">
            {dynamicDescription}
          </p>
          <div className="mt-2 text-xs text-muted-foreground">
            Discover your type at {appDomain}!
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

export const ShareCardActions = ({ cardRef, mbtiType, userName }: { cardRef: React.RefObject<HTMLDivElement>, mbtiType: MBTIType, userName?: string }) => {
  const { toast } = useToast();
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const handleShareImage = async () => {
    if (cardRef.current) {
      toast({ title: "Generating Image...", description: "Please wait a moment." });
      try {
        const canvas = await html2canvas(cardRef.current, { 
            scale: 2, 
            backgroundColor: null, 
            logging: false, 
            useCORS: true 
        });
        canvas.toBlob(async (blob) => {
          if (blob && navigator.share) {
            const file = new File([blob], `${APP_NAME.toLowerCase()}_result.png`, { type: "image/png" });
            try {
              await navigator.share({
                title: `My ${APP_NAME} Result!`,
                text: `I got ${mbtiType} on ${APP_NAME}! Check it out.`,
                files: [file],
              });
              toast({ title: "Image Shared!", variant: "default" });
            } catch (error) {
              console.error("Error sharing image:", error);
              if ((error as Error).name !== 'AbortError') {
                handleDownload(); 
                toast({ title: "Sharing Cancelled or Failed", description: "Image downloaded instead.", variant: "default" });
              } else {
                toast({ title: "Sharing Cancelled", variant: "default" });
              }
            }
          } else if (blob) { 
            handleDownload();
          } else {
             toast({ title: "Error", description: "Could not generate image for sharing.", variant: "destructive" });
          }
        }, "image/png");
      } catch (error) {
        console.error("Error generating share image:", error);
        toast({ title: "Image Generation Failed", description: "Could not generate image. Try screenshotting.", variant: "destructive" });
      }
    }
  };

  const handleDownload = async () => {
    if (cardRef.current) {
       toast({ title: "Preparing Download...", description: "Please wait a moment." });
       try {
        const canvas = await html2canvas(cardRef.current, { 
            scale: 2, 
            backgroundColor: null,
            logging: false,
            useCORS: true
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `${APP_NAME.toLowerCase()}_result_${mbtiType}.png`;
        link.click();
        toast({ title: "Image Downloaded!", variant: "default"});
      } catch (error) {
        console.error("Error generating download image:", error);
        toast({ title: "Download Failed", description: "Could not generate image for download.", variant: "destructive" });
      }
    }
  };

  const handleShareDynamicLink = async () => {
    setIsGeneratingLink(true);
    const { id: toastId } = toast({ 
      title: "Generating Share Link...", 
      description: "Please wait a moment.",
    });

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const dynamicLinksDomain = process.env.NEXT_PUBLIC_FIREBASE_DYNAMIC_LINKS_DOMAIN;
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
    const socialImage = process.env.NEXT_PUBLIC_SOCIAL_SHARE_IMAGE_URL;

    if (!apiKey || !dynamicLinksDomain || !appDomain) {
      console.error("Firebase Dynamic Links or App Domain configuration is missing.");
      toast({ id: toastId, type: "foreground", variant: "destructive", title: "Configuration Error", description: "Sharing feature is not properly configured. Please contact support.", duration: 5000 });
      setIsGeneratingLink(false);
      return;
    }

    const deepLink = `https://${appDomain}/quiz/results/${mbtiType}${userName ? `?name=${encodeURIComponent(userName)}` : ''}`;
    const socialTitle = `${userName ? userName + "'s" : "My"} ${APP_NAME} Result: ${mbtiType}!`;
    const socialDescription = `I discovered I'm ${mbtiType} (${MBTI_DESCRIPTIONS[mbtiType]?.title || ''}). Find out your personality type with ${APP_NAME}!`;

    const dynamicLinkPayload = {
      dynamicLinkInfo: {
        domainUriPrefix: dynamicLinksDomain.startsWith("http") ? dynamicLinksDomain : `https://${dynamicLinksDomain}`,
        link: deepLink,
        androidInfo: {}, // Add androidPackageName if you have an Android app
        iosInfo: {}, // Add iosBundleId if you have an iOS app
        socialMetaTagInfo: {
          socialTitle: socialTitle,
          socialDescription: socialDescription,
          socialImageLink: socialImage,
        }
      },
      suffix: {
        option: "SHORT"
      }
    };

    try {
      const response = await fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dynamicLinkPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating dynamic link:', errorData);
        throw new Error(errorData.error?.message || 'Failed to create dynamic link');
      }

      const data = await response.json();
      const shortLink = data.shortLink;

      if (navigator.share) {
        await navigator.share({
          title: socialTitle,
          text: `${socialDescription} Check it out:`,
          url: shortLink,
        });
        toast({ id: toastId, type: "foreground", variant: "default", title: "Link Shared!", description: "Dynamic link ready to share." });
      } else {
        navigator.clipboard.writeText(shortLink);
        toast({ id: toastId, type: "foreground", variant: "default", title: "Link Copied!", description: "Dynamic link copied to clipboard." });
      }
    } catch (error: any) {
      console.error("Error sharing dynamic link:", error);
      toast({ id: toastId, type: "foreground", variant: "destructive", title: "Sharing Failed", description: error.message || "Could not create or share the link.", duration: 5000 });
    } finally {
      setIsGeneratingLink(false);
    }
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 justify-center">
      <Button onClick={handleShareImage} variant="outline" size="lg" className="w-full">
        <Share2 className="mr-2 h-5 w-5" /> Share Image
      </Button>
      <Button onClick={handleShareDynamicLink} variant="outline" size="lg" className="w-full" disabled={isGeneratingLink}>
        {isGeneratingLink ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LinkIcon className="mr-2 h-5 w-5" />}
        Share Link
      </Button>
      <Button onClick={handleDownload} size="lg" className="w-full">
        <Download className="mr-2 h-5 w-5" /> Download
      </Button>
    </div>
  );
};
