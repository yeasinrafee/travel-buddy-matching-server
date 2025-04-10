import { z } from 'zod';

const createTripZodValidation = z.object({
  body: z.object({
    destination: z.string({
      required_error: 'Destination field is required.',
    }),
    startDate: z.string({
      required_error: 'Start date field is required.',
    }),
    endDate: z.string({
      required_error: 'End date field is required.',
    }),
    budget: z.number({
      required_error: 'Budget field is required.',
    }),
    activities: z.array(
      z.string({
        required_error: 'Activities field is required.',
      })
    ),
  }),
});

export const TripValidation = {
  createTripZodValidation,
};
