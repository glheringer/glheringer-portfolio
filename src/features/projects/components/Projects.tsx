import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { GradientOrb } from '@/components/backgrounds/GradientOrb';

export const Projects = () => {
  const projects = [
    {
      title: 'CRM Grupo Multiluz',
      description: 'Redesign completo do CRM interno, aprimorando UX e reduzindo tempo de atendimento. Inclui calculadora fotovoltaica para totens interativos',
      tags: ['React', 'Material UI', 'Styled Components', 'Express', 'TypeScript'],
      link: '#',
      github: '#',
    },
    {
      title: 'App Connect - Rede Social Corporativa',
      description: 'Aplicativo mobile de rede social corporativa para otimizar comunicação interna, com funcionalidades de visibilidade e insights sobre publicações',
      tags: ['React Native', 'Node.js', 'APIs', 'Mobile'],
      link: '#',
      github: '#',
    },
    {
      title: 'Santander Esfera',
      description: 'Desenvolvimento de novas telas e fluxos intuitivos para o aplicativo, com criação de SDK reutilizável. Redução de 40% nos erros reportados',
      tags: ['React Native', 'APIs', 'Testes Unitários', 'Mobile'],
      link: '#',
      github: '#',
    },
  ];

  return (
    <section id="projects" className="relative py-20 px-4 overflow-hidden">
      <GradientOrb className="top-1/2 right-0 -translate-y-1/2" size="lg" color="hover" delay={1} />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Projetos
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-elegant p-6 hover-lift animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 
                            flex items-center justify-center overflow-hidden">
                <div className="text-6xl opacity-20">🚀</div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
