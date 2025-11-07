import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { AnimatedDots } from "@/components/backgrounds/AnimatedDots";
import { GradientOrb } from "@/components/backgrounds/GradientOrb";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden"
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gradient leading-tight">
            Desenvolvedor de Software
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2 text-justify">
            Criando experiências web e mobile modernas e performáticas com
            React, React Native, Node.js e as melhores práticas de
            desenvolvimento
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver Projetos
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contato
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-3 sm:gap-4 justify-center px-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a
                href="https://github.com/glheringer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a
                href="https://linkedin.com/in/glheringer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
