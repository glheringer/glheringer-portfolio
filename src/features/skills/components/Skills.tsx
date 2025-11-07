export const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend & Mobile',
      skills: ['React', 'React Native', 'TypeScript', 'HTML', 'CSS', 'SASS', 'Material UI', 'Styled Components', 'Tailwind CSS'],
    },
    {
      title: 'Backend & Database',
      skills: ['Node.js', 'Express', 'RESTful APIs', 'SQL', 'NoSQL', 'Integração de APIs'],
    },
    {
      title: 'Ferramentas & Metodologias',
      skills: ['Git', 'Figma', 'VS Code', 'Metodologias Ágeis', 'Clean Code', 'Testes Automatizados', 'Otimização de Performance'],
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient">
          Habilidades
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="card-elegant p-6 sm:p-8 animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">{category.title}</h3>
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
          ))}
        </div>
      </div>
    </section>
  );
};
