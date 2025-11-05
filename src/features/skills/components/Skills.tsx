export const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Zustand', 'React Query'],
    },
    {
      title: 'Ferramentas',
      skills: ['Git', 'Vite', 'ESLint', 'Prettier', 'Figma', 'VS Code'],
    },
    {
      title: 'Conceitos',
      skills: ['Responsive Design', 'Clean Code', 'Feature-Based Architecture', 'RESTful APIs', 'State Management', 'Testing'],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          Habilidades
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="card-elegant p-8 animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium 
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
