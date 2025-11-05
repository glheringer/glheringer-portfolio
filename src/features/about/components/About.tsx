import { Code2, Palette, Zap } from 'lucide-react';
import { GridBackground } from '@/components/backgrounds/GridBackground';

export const About = () => {
  const features = [
    {
      icon: Code2,
      title: 'Código Limpo',
      description: 'Desenvolvimento seguindo as melhores práticas e padrões da indústria',
    },
    {
      icon: Palette,
      title: 'Design Moderno',
      description: 'Interfaces elegantes e responsivas que encantam os usuários',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Aplicações rápidas e otimizadas para a melhor experiência',
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4">
      <GridBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Sobre Mim
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card-elegant p-8 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-block p-3 rounded-xl bg-accent/10">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="card-elegant p-8 md:p-12 animate-fade-in">
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
            Desenvolvedor frontend apaixonado por criar experiências web excepcionais. 
            Com foco em React, TypeScript e arquitetura moderna, transformo ideias em 
            aplicações robustas e escaláveis. Sempre em busca de novos desafios e 
            oportunidades para crescer profissionalmente.
          </p>
        </div>
      </div>
    </section>
  );
};
