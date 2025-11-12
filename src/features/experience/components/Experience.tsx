import { Briefcase } from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'Grupo Multiluz',
      role: 'Desenvolvedor Full Stack',
      period: '2022 - Presente',
      description: 'Desenvolvimento de soluções web e mobile para energia solar',
      achievements: [
        'Desenvolvimento de landing pages com foco em conversão',
        'Redesign completo do CRM interno com calculadora fotovoltaica',
        'Melhorias significativas na experiência do usuário',
      ],
    },
    {
      company: 'Ci&T',
      role: 'Desenvolvedor Mobile',
      period: '2021 - 2022',
      description: 'Desenvolvimento de aplicativos mobile para grandes clientes',
      achievements: [
        'Desenvolvimento do Santander Esfera (app mobile)',
        'Criação de SDK reutilizável reduzindo 40% dos erros',
        'Desenvolvimento de app de rede social corporativa',
      ],
    },
    {
      company: 'Freelancer',
      role: 'Desenvolvedor Full Stack',
      period: '2020 - 2021',
      description: 'Projetos diversos de desenvolvimento web e e-commerce',
      achievements: [
        'E-commerce completo para Oliva Originals',
        'Integração com gateways de pagamento',
        'Otimização de performance e SEO',
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto relative z-10">
        <TextReveal className="mb-16">
          <h2 className="heading-section text-center text-gradient">
            Experiência
          </h2>
        </TextReveal>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="card-elegant p-6 md:p-8 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="heading-card text-foreground">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>

                  <p className="text-lg font-medium text-primary mb-2">{exp.company}</p>
                  <p className="text-body-small text-muted-foreground mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-body-small text-foreground flex items-start">
                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
