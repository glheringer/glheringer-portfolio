import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'guilhermeheringer1999@gmail.com',
      href: 'mailto:guilhermeheringer1999@gmail.com',
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (31) 99757-7741',
      href: 'tel:+553199757-7741',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Ipatinga - Minas Gerais, Brasil',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient">
          Entre em Contato
        </h2>

        <div className="card-elegant p-6 sm:p-8 md:p-12 animate-fade-in">
          <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 text-justify">
            Interessado em trabalhar juntos? Vamos conversar sobre seu próximo projeto!
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  className="flex flex-col items-center text-center p-3 sm:p-4 rounded-lg
                           hover:bg-accent/10 transition-all duration-300 group"
                >
                  <div className="mb-2 sm:mb-3 p-2 sm:p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-xs sm:text-sm font-medium group-hover:text-accent transition-colors break-words max-w-full">
                    {info.value}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg
                       hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="mailto:guilhermeheringer1999@gmail.com">
                Enviar Mensagem
                <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
