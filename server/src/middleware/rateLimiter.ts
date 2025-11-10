import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'), // limite de 5 requisições
  message: {
    success: false,
    error: 'Muitas tentativas de envio. Por favor, aguarde alguns minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
