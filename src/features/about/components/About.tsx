import { Code2, Palette, Zap } from 'lucide-react';
import { GridBackground } from '@/components/backgrounds/GridBackground';
import { TextReveal } from '@/components/ui/text-reveal';

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
    <section id="about" className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <GridBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <TextReveal className="mb-12">
          <h2 className="heading-section text-center text-gradient">
            Sobre Mim
          </h2>
        </TextReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card-elegant p-4 sm:p-5 md:p-6 lg:p-8 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-block p-3 rounded-xl bg-accent/10">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-body-small text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="card-elegant p-5 sm:p-6 md:p-8 lg:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/profile.jpg"
                  alt="Guilherme Heringer Cordeiro"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-body text-muted-foreground text-center md:text-left">
                Desenvolvedor de Software Pleno, 25 anos, Ipatinga-MG. Especializado em React, React Native e Node.js,
                transformo ideias em aplicações modernas e escaláveis. Disponível para viagens a trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
