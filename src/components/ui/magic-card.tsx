import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
}

export const MagicCard = ({ children, className }: MagicCardProps) => {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition duration-500 animate-tilt" />

      {/* Card content */}
      <div className="relative h-full w-full rounded-lg bg-card border border-border/50 group-hover:border-blue-500/50 transition-all duration-500">
        {children}
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-shine" />
      </div>
    </div>
  );
};
