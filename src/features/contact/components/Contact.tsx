import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';
import { TextReveal } from '@/components/ui/text-reveal';
import { ContactForm } from './ContactForm';

export const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <TextReveal className="mb-12">
          <h2 className="heading-section text-center text-gradient">
            Vamos Conversar?
          </h2>
        </TextReveal>

        <div className="card-elegant p-8 lg:p-10 animate-fade-in">
          <p className="text-center text-body-small text-muted-foreground mb-8">
            Interessado em trabalhar juntos? Envie uma mensagem ou entre em contato diretamente!
          </p>

          {/* Formulário de Contato */}
          <ContactForm />

          {/* Linha divisória */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou entre em contato por</span>
            </div>
          </div>

          {/* Links diretos */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-none sm:min-w-[160px] hover:bg-accent hover:text-accent-foreground transition-all"
              asChild
            >
              <a href="mailto:guilhermeheringer1999@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-none sm:min-w-[160px] hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
              asChild
            >
              <a href="https://www.linkedin.com/in/guilherme-heringer-cordeiro/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 sm:flex-none sm:min-w-[160px] hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all"
              asChild
            >
              <a href="https://github.com/glheringer" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
