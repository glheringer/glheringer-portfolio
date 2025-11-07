interface GradientOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'hover';
  delay?: number;
}

export const GradientOrb = ({
  className = '',
  size = 'md',
  color = 'primary',
  delay = 0
}: GradientOrbProps) => {
  const sizeClasses = {
    sm: 'w-64 h-64',
    md: 'w-96 h-96',
    lg: 'w-[600px] h-[600px]',
  };

  const colorClasses = {
    primary: 'bg-primary/40 dark:bg-primary/25',
    accent: 'bg-accent/40 dark:bg-accent/25',
    hover: 'bg-hover/40 dark:bg-hover/25',
  };

  return (
    <div
      className={`absolute ${sizeClasses[size]} ${colorClasses[color]} rounded-full blur-3xl animate-pulse pointer-events-none ${className}`}
      style={{
        animationDuration: '8s',
        animationDelay: `${delay}s`
      }}
    />
  );
};
