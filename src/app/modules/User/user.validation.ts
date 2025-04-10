import { z } from 'zod';

const registerUserZodValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name field is required.',
    }),
    email: z
      .string({
        required_error: 'Email field is required.',
      })
      .email('Email must be a valid email address.'),
    password: z
      .string({
        required_error: 'Password field is required.',
      })
      .min(6, 'Password must be at least 6 characters long.'),
    profile: z.object({
      bio: z.string({
        required_error: 'Bio field is required.',
      }),
      age: z.number({
        required_error: 'Age field is required.',
      }),
    }),
  }),
});

const updateUserZodValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name field is required.',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email field is required.',
      })
      .email('Email must be a valid email address.')
      .optional(),
  }),
});

export const UserValidation = {
  registerUserZodValidation,
  updateUserZodValidation,
};
