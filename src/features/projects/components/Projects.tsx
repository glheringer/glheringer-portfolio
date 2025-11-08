import { Button } from "@/components/ui/button";
import { ExternalLink, Images } from "lucide-react";
import { GradientOrb } from "@/components/backgrounds/GradientOrb";
import { MagicCard } from "@/components/ui/magic-card";

export const Projects = () => {
  const projects = [
    {
      title: "Landing Pages - Grupo Multiluz",
      description:
        "Landing pages institucionais e de produtos para o Grupo Multiluz, focadas em conversão e performance com design moderno e responsivo",
      tags: ["React", "TypeScript", "Tailwind CSS", "SEO", "Performance"],
      link: "https://grupomultiluz.com.br/",
      gallery: "#",
      image: "/images/multiluz-indicacao.png",
    },
    {
      title: "E-commerce - Oliva Originals",
      description:
        "Plataforma de e-commerce completa para venda de produtos online, com checkout otimizado, painel administrativo e integração com meios de pagamento",
      tags: ["React", "Node.js", "E-commerce", "Payment Gateway", "TypeScript"],
      link: "https://olivaoriginals.com.br/",
      gallery: "#",
      image: null,
    },
    {
      title: "CRM Grupo Multiluz",
      description:
        "Redesign completo do CRM interno, aprimorando UX e reduzindo tempo de atendimento. Inclui calculadora fotovoltaica para totens interativos",
      tags: [
        "React",
        "Material UI",
        "Styled Components",
        "Express",
        "TypeScript",
      ],
      link: "#",
      gallery: "#",
      image: null,
    },
    {
      title: "App Connect - Rede Social Corporativa",
      description:
        "Aplicativo mobile de rede social corporativa para otimizar comunicação interna, com funcionalidades de visibilidade e insights sobre publicações",
      tags: ["React Native", "Node.js", "APIs", "Mobile"],
      link: "#",
      gallery: "#",
      image: null,
    },
    {
      title: "Santander Esfera",
      description:
        "Desenvolvimento de novas telas e fluxos intuitivos para o aplicativo, com criação de SDK reutilizável. Redução de 40% nos erros reportados",
      tags: ["React Native", "APIs", "Testes Unitários", "Mobile"],
      link: "#",
      gallery: "#",
      image: null,
    },
  ];

  return (
    <section id="projects" className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <GradientOrb
        className="top-1/2 right-0 -translate-y-1/2"
        size="lg"
        color="hover"
        delay={1}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gradient">
          Projetos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <MagicCard
              key={index}
              className="animate-fade-in"
              gradientSize={250}
              gradientColor="#3b82f6"
              gradientOpacity={0.4}
            >
              <div
                className="p-3 sm:p-4 md:p-5 lg:p-6 h-full group flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="h-28 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-3 sm:mb-4
                              flex items-center justify-center overflow-hidden flex-shrink-0"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl opacity-20">🚀</div>
                  )}
                </div>

                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-3 sm:mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-md text-[10px] sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                    asChild
                  >
                    <a
                      href={project.gallery}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Images className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Galeria
                    </a>
                  </Button>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
};
