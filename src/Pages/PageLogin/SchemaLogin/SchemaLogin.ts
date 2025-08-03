import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string()
      .email('Email inválido')
      .min(1, 'Email é obrigatório'),
  
    senha: z.string()
      .min(1, 'Senha é obrigatória') //
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.'
      ),
  });