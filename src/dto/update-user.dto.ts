import z from 'zod';

export const UpdateUserDtoSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .trim()
    .min(1, 'name cannot be empty')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/gim, 'name cannot have numbers or symbols')
    .optional(),
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .trim()
    .min(1, 'username cannot be empty')
    .optional(),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email('email must be an email')
    .optional(),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .trim()
    .min(8, 'password must have at least 8 characters')
    .optional(),
  biography: z.string({ invalid_type_error: 'biography must be a string' }).optional(),
  profileImage: z
    .string({ invalid_type_error: 'profileImage must be a string' })
    .url('profileImage must be an url')
    .optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
