import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

class EmailService {
  private transporter: Transporter | null = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.warn('⚠️  Configurações de email não encontradas. Emails não serão enviados.');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });

      console.log('✅ Serviço de email configurado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao configurar serviço de email:', error);
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.error('❌ Transporter de email não configurado');
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: `"Portfólio - Guilherme Heringer" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        replyTo: options.replyTo,
      });

      console.log(`✅ Email enviado com sucesso para ${options.to}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      return false;
    }
  }

  async sendContactNotification(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4a5568;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: bold;
              color: #4a5568;
              margin-bottom: 5px;
            }
            .field-value {
              padding: 10px;
              background-color: #f7fafc;
              border-left: 3px solid #4a5568;
              border-radius: 4px;
            }
            .message-box {
              background-color: #f7fafc;
              padding: 15px;
              border-radius: 4px;
              border-left: 3px solid #4299e1;
              white-space: pre-wrap;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              font-size: 12px;
              color: #718096;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Nova Mensagem de Contato</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Nome:</div>
                <div class="field-value">${data.name}</div>
              </div>

              <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value">${data.email}</div>
              </div>

              ${data.phone ? `
                <div class="field">
                  <div class="field-label">📱 Telefone:</div>
                  <div class="field-value">${data.phone}</div>
                </div>
              ` : ''}

              ${data.subject ? `
                <div class="field">
                  <div class="field-label">📋 Assunto:</div>
                  <div class="field-value">${data.subject}</div>
                </div>
              ` : ''}

              <div class="field">
                <div class="field-label">💬 Mensagem:</div>
                <div class="message-box">${data.message}</div>
              </div>

              <div class="footer">
                Mensagem recebida através do formulário de contato do seu portfólio
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER || '',
      subject: data.subject || `Nova mensagem de ${data.name}`,
      html,
      replyTo: data.email,
    });
  }
}

export const emailService = new EmailService();
