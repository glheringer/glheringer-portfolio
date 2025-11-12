import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Images } from "lucide-react";
import { GradientOrb } from "@/components/backgrounds/GradientOrb";
import { MagicCard } from "@/components/ui/magic-card";
import { LazyImage } from "@/components/ui/lazy-image";
import { TextReveal } from "@/components/ui/text-reveal";
import { ProjectGalleryModal } from "./ProjectGalleryModal";

type ProjectCategory = "all" | "web" | "mobile" | "crm";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  image: string;
  galleryImages: string[];
  customMessage?: string;
  category: ProjectCategory;
}

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const projects: Project[] = [
    {
      title: "Landing Pages - Grupo Multiluz",
      description:
        "Landing pages institucionais focadas em conversão e performance com design moderno e responsivo",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      link: "https://grupomultiluz.com.br/",
      image: "/images/multiluz-indicacao.png",
      galleryImages: [
        "/images/multiluz-indicacao.png",
        "/images/multiluz-recompensas.png",
        "/images/multiluz-feirao.png",
        "/images/multiluz-beneficios.png",
      ],
      category: "web",
    },
    {
      title: "E-commerce - Oliva Originals",
      description:
        "Plataforma completa de e-commerce com checkout otimizado e integração de pagamentos",
      tags: ["React", "Node.js", "E-commerce"],
      link: "https://olivaoriginals.com.br/",
      image: "/images/oliva-home.png",
      galleryImages: [
        "/images/oliva-home.png",
        "/images/oliva-body.jpg",
        "/images/oliva-cart.png",
        "/images/oliva-footer-2.png",
      ],
      category: "web",
    },
    {
      title: "CRM Grupo Multiluz",
      description:
        "Redesign do CRM interno com calculadora fotovoltaica e melhorias de UX",
      tags: [
        "React",
        "Material UI",
        "Express",
      ],
      link: null,
      image: "/images/crm-multiluz1.png",
      galleryImages: [
        "/images/crm-multiluz1.png",
        "/images/crm-multiluz2.png",
        "/images/crm-multiluz3.png",
        "/images/crm-multiluz4.png",
      ],
      category: "crm",
    },
    {
      title: "App Connect - Rede Social Corporativa",
      description:
        "App mobile de rede social corporativa com insights sobre publicações",
      tags: ["React Native", "Node.js", "APIs"],
      link: null,
      image: "/images/connect1.jpeg",
      galleryImages: [
        "/images/connect-video.mp4",
        "/images/connect1.jpeg",
        "/images/connect2.jpeg",
        "/images/connect3.jpeg",
      ],
      category: "mobile",
    },
    {
      title: "Santander Esfera",
      description:
        "Desenvolvimento de telas e SDK reutilizável, reduzindo 40% dos erros",
      tags: ["React Native", "APIs", "Testes"],
      link: null,
      image: "/images/esfera.webp",
      galleryImages: [],
      customMessage: "Disponível nas lojas de aplicativos",
      category: "mobile",
    },
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const filterButtons = [
    { id: "all" as ProjectCategory, label: "Todos", count: projects.length },
    { id: "web" as ProjectCategory, label: "Web Apps", count: projects.filter(p => p.category === "web").length },
    { id: "mobile" as ProjectCategory, label: "Mobile", count: projects.filter(p => p.category === "mobile").length },
    { id: "crm" as ProjectCategory, label: "CRM/Dashboards", count: projects.filter(p => p.category === "crm").length },
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
        <TextReveal className="mb-12">
          <h2 className="heading-section text-center text-gradient">
            Projetos
          </h2>
        </TextReveal>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          {filterButtons.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300
                hover:scale-105 active:scale-95
                ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-foreground hover:bg-muted border border-border"
                }
              `}
            >
              {filter.label}
              <span
                className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                  activeFilter === filter.id
                    ? "bg-primary-foreground/20"
                    : "bg-foreground/10"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
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
                {project.image ? (
                  <div className="rounded-lg mb-4 overflow-hidden flex-shrink-0">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      aspectRatio="16/10"
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="h-48 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex-shrink-0">
                    <div className="text-5xl opacity-20">🚀</div>
                  </div>
                )}

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

                {project.customMessage ? (
                  <div className="text-center text-xs sm:text-sm text-muted-foreground italic mt-auto pt-2 border-t border-border/50">
                    {project.customMessage}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    {project.link && (
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
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs sm:text-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setSelectedProject(index)}
                      disabled={!project.galleryImages || project.galleryImages.length === 0}
                    >
                      <Images className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                      Galeria
                    </Button>
                  </div>
                )}
              </div>
            </MagicCard>
          ))}
        </div>
      </div>

      {/* Modal de Galeria */}
      {selectedProject !== null && (
        <ProjectGalleryModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          projectTitle={projects[selectedProject].title}
          images={projects[selectedProject].galleryImages}
        />
      )}
    </section>
  );
};
