import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";

export const Skills = () => {
  const [showAll, setShowAll] = useState(false);

  // Top 12 skills principais
  const mainSkills = [
    "React",
    "React Native",
    "TypeScript",
    "Node.js",
    "RESTful APIs",
    "Git",
    "Tailwind CSS",
    "Material UI",
    "Express",
    "SQL",
    "Metodologias Ágeis",
    "Clean Code",
  ];

  // Skills complementares
  const secondarySkills = [
    "HTML",
    "CSS",
    "SASS",
    "Styled Components",
    "NoSQL",
    "Integração de APIs",
    "Figma",
    "VS Code",
    "Testes Automatizados",
    "Otimização de Performance",
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <TextReveal className="mb-12">
          <h2 className="heading-section text-center text-gradient">
            Habilidades
          </h2>
        </TextReveal>

        <div className="card-elegant p-8 lg:p-10 animate-fade-in">
          <h3 className="heading-subsection mb-6 text-primary text-center">
            Principais Tecnologias
          </h3>

          {/* Skills Principais */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center mb-6 sm:mb-8">
            {mainSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-accent/10 text-accent rounded-lg text-xs sm:text-sm md:text-base font-medium
                       hover:bg-accent hover:text-accent-foreground transition-all duration-300
                       hover:scale-105 cursor-default animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Skills Complementares (Expandível) */}
          {showAll && (
            <div className="border-t border-border/50 pt-8 animate-fade-in">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-muted-foreground text-center">
                Tecnologias Complementares
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center mb-6 sm:mb-8">
                {secondarySkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-muted/50 text-muted-foreground rounded-lg text-xs sm:text-sm md:text-base font-medium
                           hover:bg-muted hover:text-foreground transition-all duration-300
                           hover:scale-105 cursor-default animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Botão Ver Todas/Menos */}
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-xs sm:text-sm hover:bg-accent hover:text-accent-foreground transition-all"
            >
              {showAll ? (
                <>
                  Ver Menos
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Ver Todas as Skills
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
