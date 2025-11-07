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
    <section id="about" className="relative py-16 sm:py-20 px-4 sm:px-6">
      <GridBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient">
          Sobre Mim
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
                <p className="text-muted-foreground text-justify">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="card-elegant p-6 sm:p-8 md:p-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/profile.jpg"
                  alt="Guilherme Heringer Cordeiro"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-justify">
                Desenvolvedor de Software Pleno de 25 anos de idade, residente em Ipatinga - Minas Gerais.
                Com experiência consolidada em desenvolvimento de aplicações web e mobile, atuo com React, React Native,
                Node.js, TypeScript e frameworks modernos. Forte atuação em metodologias ágeis, participei de projetos
                de grande porte incluindo integração de APIs, testes automatizados e otimização de performance.
                Transformo ideias em aplicações robustas e escaláveis, sempre em busca de novos desafios e
                oportunidades para crescer profissionalmente. Disponível para viagens a trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
