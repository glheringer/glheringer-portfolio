import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/features/hero/components/Hero';
import { About } from '@/features/about/components/About';
import { Skills } from '@/features/skills/components/Skills';
import { Projects } from '@/features/projects/components/Projects';
import { Contact } from '@/features/contact/components/Contact';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { useThemeStore } from '@/features/theme/store/themeStore';
import { useLenis } from '@/hooks/useLenis';

const Index = () => {
  const { theme, setTheme } = useThemeStore();

  // Inicializa o Lenis para smooth scroll
  useLenis();

  useEffect(() => {
    // Initialize theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, setTheme]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
