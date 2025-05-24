
"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface CanvasPlaceholderProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  canvasWidth: number;
  canvasHeight: number;
  textToDraw: string;
  backgroundColorVar: string; // e.g., "--primary"
  textColorVar: string;       // e.g., "--primary-foreground"
  dataAiHint?: string;
  className?: string;
}

const CanvasPlaceholder: React.FC<CanvasPlaceholderProps> = ({
  canvasWidth,
  canvasHeight,
  textToDraw,
  backgroundColorVar,
  textColorVar,
  dataAiHint,
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas is scaled correctly for high DPI displays
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    // Apply CSS scaling to fit the layout dimensions
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    
    ctx.scale(dpr, dpr);


    const computedStyle = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null;
    
    const formatHslForCanvas = (hslVarName: string, defaultColor: string): string => {
      if (!computedStyle) return defaultColor;
      const hslString = computedStyle.getPropertyValue(hslVarName).trim();
      if (!hslString) return defaultColor;
      // Assumes HSL is stored as "H S% L%" e.g. "240 60% 97%"
      const parts = hslString.split(' ');
      if (parts.length === 3) return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      // Fallback for direct color names or hex if a variable doesn't conform
      if (CSS.supports('color', hslString)) return hslString;
      return defaultColor;
    };

    const bgColor = formatHslForCanvas(backgroundColorVar, '#E0E0E0'); // Light gray fallback
    const fgColor = formatHslForCanvas(textColorVar, '#333333');   // Dark gray fallback

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw text
    ctx.fillStyle = fgColor;
    
    // Dynamically adjust font size - aiming for text to fill a good portion of height/width
    // Consider typical character aspect ratio (width ~0.5 * height)
    const maxFontSizeBasedOnWidth = canvasWidth / Math.max(textToDraw.length * 0.6, 1); // Adjusted factor
    const maxFontSizeBasedOnHeight = canvasHeight * 0.5; // Allow text to take up to 50% of height
    const baseFontSize = Math.min(maxFontSizeBasedOnWidth, maxFontSizeBasedOnHeight, 50); // Cap max font size
    
    ctx.font = `bold ${Math.max(12, baseFontSize)}px "Geist Sans", "Helvetica Neue", sans-serif`; // Using Geist Sans from layout
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Simple text wrapping if needed (basic version for 2 lines)
    const words = textToDraw.split(' ');
    // Trigger wrapping if text likely exceeds 80% of canvas width or has many words and canvas is small
    const textMetrics = ctx.measureText(textToDraw);
    if ((textMetrics.width > canvasWidth * 0.8 && words.length > 1) || (words.length > 2 && canvasWidth < 150 && textToDraw.length > 10)) { 
        const midPoint = Math.ceil(words.length / 2);
        const line1 = words.slice(0, midPoint).join(' ');
        const line2 = words.slice(midPoint).join(' ');
        const lineHeight = baseFontSize * 1.2; // Add some line spacing
        ctx.fillText(line1, canvasWidth / 2, canvasHeight / 2 - lineHeight / 2);
        ctx.fillText(line2, canvasWidth / 2, canvasHeight / 2 + lineHeight / 2);
    } else {
        ctx.fillText(textToDraw, canvasWidth / 2, canvasHeight / 2);
    }

  }, [canvasWidth, canvasHeight, textToDraw, backgroundColorVar, textColorVar, props.id]);

  return (
    <canvas
      ref={canvasRef}
      // width and height attributes are set by JS for DPR scaling
      className={cn("block", className)} // Added block display
      data-ai-hint={dataAiHint}
      aria-label={props['aria-label'] || `Placeholder image for ${textToDraw}`}
      {...props}
    />
  );
};

export default CanvasPlaceholder;

