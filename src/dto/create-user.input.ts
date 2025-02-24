import { Field, InputType } from 'type-graphql';
import z from 'zod';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  biography: string | null;

  @Field(() => String, { nullable: true })
  profileImage: string | null;
}

export const CreateUserInputSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .trim()
    .min(1, 'name cannot be empty')
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/gim, 'name cannot have numbers or symbols'),
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .trim()
    .min(1, 'username cannot be empty'),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email('email must be an email'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .trim()
    .min(8, 'password must have at least 8 characters'),
  biography: z.string({ invalid_type_error: 'biography must be a string' }).optional(),
  profileImage: z
    .string({ invalid_type_error: 'profileImage must be a string' })
    .url('profileImage must be an url')
    .optional(),
});
