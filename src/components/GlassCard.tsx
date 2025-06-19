
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, style }) => {
  return (
    <div 
      className={cn(
        "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
