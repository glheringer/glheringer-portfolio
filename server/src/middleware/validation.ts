import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 255 })
    .withMessage('Nome deve ter entre 2 e 255 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Telefone inválido'),

  body('subject')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Assunto deve ter no máximo 500 caracteres'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Mensagem é obrigatória')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Mensagem deve ter entre 10 e 5000 caracteres'),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
      })),
    });
  }

  next();
};
