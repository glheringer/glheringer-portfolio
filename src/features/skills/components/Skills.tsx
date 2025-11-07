import { useEffect, useRef } from "react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend & Mobile",
      skills: [
        "React",
        "React Native",
        "TypeScript",
        "HTML",
        "CSS",
        "SASS",
        "Material UI",
        "Styled Components",
        "Tailwind CSS",
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        "Node.js",
        "Express",
        "RESTful APIs",
        "SQL",
        "NoSQL",
        "Integração de APIs",
      ],
    },
    {
      title: "Ferramentas & Metodologias",
      skills: [
        "Git",
        "Figma",
        "VS Code",
        "Metodologias Ágeis",
        "Clean Code",
        "Testes Automatizados",
        "Otimização de Performance",
      ],
    },
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 640;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const targetTop = isMobile ? 60 + index * 24 : 80 + index * 32;
        const windowHeight = window.innerHeight;

        // Distância do card até sua posição sticky
        const distanceFromTarget = rect.top - targetTop;

        // Calcula progresso de empilhamento
        const stackRange = windowHeight * 0.6;
        const stackProgress = Math.max(0, Math.min(1, 1 - (distanceFromTarget / stackRange)));

        // Escala e brightness diminuem conforme empilha
        const minScale = 0.90 - index * 0.03;
        const scale = 1 - (stackProgress * (1 - minScale));

        const minBrightness = 0.75;
        const brightness = 1 - (stackProgress * (1 - minBrightness));

        card.style.transform = `scale(${Math.max(minScale, scale)})`;
        card.style.filter = `brightness(${Math.max(minBrightness, brightness)})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="skills" className="px-2 sm:px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl pt-16 sm:pt-20 sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient">
          Habilidades
        </h2>

        <div className="relative h-[180vh] sm:h-[190vh]">
          {skillCategories.map((category, categoryIndex) => {
            return (
              <div
                key={categoryIndex}
                ref={(el) => { cardRefs.current[categoryIndex] = el; }}
                className="sticky animate-fade-in mb-[35vh] sm:mb-[40vh]"
                style={{
                  top: window.innerWidth >= 640 ? `${80 + categoryIndex * 32}px` : `${60 + categoryIndex * 24}px`,
                  animationDelay: `${categoryIndex * 0.1}s`,
                  transition:
                    "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="card-elegant p-6 sm:p-8 shadow-xl">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/10 text-accent rounded-lg text-xs sm:text-sm font-medium
                               hover:bg-accent hover:text-accent-foreground transition-all duration-300
                               hover:scale-105 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
