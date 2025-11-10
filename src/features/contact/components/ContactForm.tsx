import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, User, Phone, MessageSquare, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { contactService, ContactMessageData } from '@/services/contactService';

type ContactFormData = ContactMessageData;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await contactService.sendMessage(data);

      if (response.success) {
        setSubmitStatus('success');
        toast.success('Mensagem enviada com sucesso!', {
          description: 'Retornarei em breve. Obrigado pelo contato!',
        });
        reset();

        // Reseta o status após 3 segundos
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Erro:', error);
      setSubmitStatus('error');

      const axiosError = error as AxiosError<{ error?: string; errors?: Array<{ field: string; message: string }> }>;

      if (axiosError.response?.data) {
        const errorData = axiosError.response.data;

        // Se houver erros de validação específicos
        if (errorData.errors && errorData.errors.length > 0) {
          const errorMessages = errorData.errors.map(err => err.message).join(', ');
          toast.error('Erro de validação', {
            description: errorMessages,
          });
        } else {
          // Erro genérico da API
          const errorMessage = errorData.error || 'Erro ao enviar mensagem';
          toast.error('Erro ao enviar mensagem', {
            description: errorMessage,
          });
        }
      } else {
        // Erro de conexão ou timeout
        toast.error('Erro ao enviar mensagem', {
          description: 'Verifique sua conexão e tente novamente.',
        });
      }

      // Reseta o status de erro após 3 segundos
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      {/* Nome */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2 text-sm sm:text-base">
          <User className="h-4 w-4" />
          Nome *
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          className={errors.name ? 'border-red-500' : ''}
          {...register('name', {
            required: 'Nome é obrigatório',
            minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' },
            maxLength: { value: 255, message: 'Nome muito longo' },
          })}
        />
        {errors.name && (
          <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2 text-sm sm:text-base">
          <Mail className="h-4 w-4" />
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.email@exemplo.com"
          className={errors.email ? 'border-red-500' : ''}
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
        />
        {errors.email && (
          <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Telefone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2 text-sm sm:text-base">
          <Phone className="h-4 w-4" />
          Telefone (opcional)
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(00) 00000-0000"
          {...register('phone')}
        />
      </div>

      {/* Assunto */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="flex items-center gap-2 text-sm sm:text-base">
          <MessageSquare className="h-4 w-4" />
          Assunto (opcional)
        </Label>
        <Input
          id="subject"
          type="text"
          placeholder="Sobre o que você quer conversar?"
          {...register('subject', {
            maxLength: { value: 500, message: 'Assunto muito longo' },
          })}
        />
        {errors.subject && (
          <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center gap-2 text-sm sm:text-base">
          <MessageSquare className="h-4 w-4" />
          Mensagem *
        </Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Escreva sua mensagem aqui..."
          className={errors.message ? 'border-red-500' : ''}
          {...register('message', {
            required: 'Mensagem é obrigatória',
            minLength: { value: 10, message: 'Mensagem deve ter pelo menos 10 caracteres' },
            maxLength: { value: 5000, message: 'Mensagem muito longa (máximo 5000 caracteres)' },
          })}
        />
        {errors.message && (
          <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Botão Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : submitStatus === 'success' ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mensagem Enviada!
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar Mensagem
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        * Campos obrigatórios
      </p>
    </form>
  );
};
