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
    <section id="skills" className="px-3 sm:px-4 md:px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl pt-12 sm:pt-16 md:pt-20 sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gradient">
          Habilidades
        </h2>

        <div className="relative h-[160vh] sm:h-[180vh] md:h-[190vh]">
          {skillCategories.map((category, categoryIndex) => {
            const topSpacing = categoryIndex === 0 ?
              "top-[60px] sm:top-[80px]" :
              categoryIndex === 1 ?
              "top-[84px] sm:top-[112px]" :
              "top-[108px] sm:top-[144px]";

            return (
              <div
                key={categoryIndex}
                ref={(el) => { cardRefs.current[categoryIndex] = el; }}
                className={`sticky animate-fade-in mb-[30vh] sm:mb-[35vh] md:mb-[40vh] ${topSpacing}`}
                style={{
                  animationDelay: `${categoryIndex * 0.1}s`,
                  transition:
                    "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="card-elegant p-4 sm:p-6 md:p-8 shadow-xl">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 text-primary">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-accent/10 text-accent rounded-lg text-xs sm:text-sm font-medium
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
