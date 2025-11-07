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
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gradient">
          Entre em Contato
        </h2>

        <div className="card-elegant p-5 sm:p-6 md:p-8 lg:p-12 animate-fade-in">
          <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-5 sm:mb-6 md:mb-8 leading-relaxed">
            Interessado em trabalhar juntos? Vamos conversar sobre seu próximo projeto!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-5 sm:mb-6 md:mb-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  className="flex flex-col items-center text-center p-3 sm:p-4 rounded-lg
                           hover:bg-accent/10 transition-all duration-300 group"
                >
                  <div className="mb-2 sm:mb-3 p-2 sm:p-2.5 md:p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-accent" />
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm font-medium group-hover:text-accent transition-colors break-words max-w-full px-1">
                    {info.value}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg
                       hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
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
