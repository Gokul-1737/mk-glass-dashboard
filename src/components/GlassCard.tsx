
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;
