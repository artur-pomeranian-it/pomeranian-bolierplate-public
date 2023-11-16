import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup.string().email(),
  password: yup.string().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const loginSchema = registerSchema.pick(['email', 'password']);
