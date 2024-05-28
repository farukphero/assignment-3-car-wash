import { z } from 'zod';

const userValidationSchemaForCreateUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .trim()
      .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
    role: z.enum(['user', 'admin']).default('user'),
    status: z.enum(['active', 'block']).default('active'),
    token: z.string().optional(),
  }),
});
const userValidationSchemaForLogin = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .trim()
      .email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

export const userValidations = {
  userValidationSchemaForCreateUser,
  userValidationSchemaForLogin,
};
