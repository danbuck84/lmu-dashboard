
import * as z from "zod";

// Define the form schema with Zod
export const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  country: z.string().optional(),
  city: z.string().optional(),
  age: z.coerce.number().min(13).max(120).optional(),
  preferredCar: z.string().optional(),
  preferredTrack: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof formSchema>;
