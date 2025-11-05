import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '../store/themeStore';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-accent/10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300 rotate-0 hover:rotate-45" />
      )}
    </Button>
  );
};
