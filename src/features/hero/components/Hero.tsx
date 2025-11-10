import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { AnimatedDots } from "@/components/backgrounds/AnimatedDots";
import { GradientOrb } from "@/components/backgrounds/GradientOrb";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedDots />
      <GradientOrb className="top-0 left-0" size="lg" color="primary" />
      <GradientOrb
        className="bottom-0 right-0"
        size="lg"
        color="accent"
        delay={2}
      />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gradient leading-tight">
            Desenvolvedor de Software
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-center leading-relaxed">
            Criando experiências web e mobile modernas e performáticas com
            React, React Native, Node.js e as melhores práticas de
            desenvolvimento
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[140px] bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection("projects")}
            >
              Ver Projetos
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[140px] border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Contato
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 sm:gap-5 justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              asChild
            >
              <a
                href="https://github.com/glheringer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              asChild
            >
              <a
                href="https://linkedin.com/in/glheringer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
