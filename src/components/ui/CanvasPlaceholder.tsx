
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
    
    const formatHsl = (hslString: string | undefined | null): string => {
      if (!hslString) return '#cccccc'; // Default fallback color
      const parts = hslString.trim().split(' ');
      if (parts.length === 3) return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      if (parts.length === 1 && parts[0].includes(',')) return `hsl(${parts[0]})`; // for direct hsl values
      return hslString; // fallback for direct color names or hex
    };

    const bgColor = computedStyle ? formatHsl(computedStyle.getPropertyValue(backgroundColorVar)) : '#f0f0f0';
    const fgColor = computedStyle ? formatHsl(computedStyle.getPropertyValue(textColorVar)) : '#333333';

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw text
    ctx.fillStyle = fgColor;
    
    // Dynamically adjust font size
    const baseFontSize = Math.min(canvasWidth / Math.max(textToDraw.length, 5) * 1.2, canvasHeight * 0.3);
    ctx.font = `bold ${Math.max(12, baseFontSize)}px sans-serif`; // Ensure minimum font size
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Simple text wrapping if needed (basic version)
    const words = textToDraw.split(' ');
    if (words.length > 2 && canvasWidth < 200) { // Very basic condition for wrapping
        const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
        ctx.fillText(line1, canvasWidth / 2, canvasHeight / 2 - baseFontSize * 0.6);
        ctx.fillText(line2, canvasWidth / 2, canvasHeight / 2 + baseFontSize * 0.6);
    } else {
        ctx.fillText(textToDraw, canvasWidth / 2, canvasHeight / 2);
    }

  }, [canvasWidth, canvasHeight, textToDraw, backgroundColorVar, textColorVar, props.id]); // Added props.id to dependencies if it changes

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth} // Initial width for SSR, JS will override with DPI scaling
      height={canvasHeight} // Initial height for SSR
      className={cn(className)}
      data-ai-hint={dataAiHint}
      {...props}
    />
  );
};

export default CanvasPlaceholder;
