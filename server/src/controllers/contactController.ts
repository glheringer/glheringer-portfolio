import { Request, Response } from 'express';
import { sql } from '../config/supabase.js';
import { ContactMessageRequest } from '../types/index.js';
import { emailService } from '../services/emailService.js';

export const createContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message }: ContactMessageRequest = req.body;

    // Captura informações adicionais
    const ip_address = req.ip || req.socket.remoteAddress || 'unknown';
    const user_agent = req.get('user-agent') || 'unknown';

    // Insere no PostgreSQL usando postgres.js
    const result = await sql`
      INSERT INTO contact_messages (
        name, email, phone, subject, message, ip_address, user_agent, status
      ) VALUES (
        ${name},
        ${email},
        ${phone || null},
        ${subject || null},
        ${message},
        ${ip_address},
        ${user_agent},
        'unread'
      )
      RETURNING id, created_at
    `;

    const data = result[0];

    // Envia email de notificação (não bloqueia a resposta)
    emailService.sendContactNotification({
      name,
      email,
      phone,
      subject,
      message,
    }).catch(error => {
      console.error('Erro ao enviar email de notificação:', error);
    });

    return res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Retornarei em breve.',
      data: {
        id: data.id,
        created_at: data.created_at,
      },
    });
  } catch (error) {
    console.error('Erro no controller:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor.',
    });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const data = await sql`
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Erro no controller:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor.',
    });
  }
};
