import { Router } from 'express';
import { createContactMessage, getContactMessages } from '../controllers/contactController.js';
import { validateContact, handleValidationErrors } from '../middleware/validation.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/contact - Criar nova mensagem de contato
router.post(
  '/',
  contactLimiter,
  validateContact,
  handleValidationErrors,
  createContactMessage
);

// GET /api/contact - Buscar todas as mensagens (para admin)
router.get('/', getContactMessages);

export default router;
