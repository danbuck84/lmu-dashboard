
import * as z from "zod";

export const raceFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  car_id: z.string().min(1, { message: "Car is required" }),
  track_layout_id: z.string().min(1, { message: "Track and layout are required" }),
  start_position: z.coerce.number().int().min(1, { message: "Start position is required" }),
  finish_position: z.coerce.number().int().min(1, { message: "Finish position is required" }),
  notes: z.string().optional(),
  driver_rating_change: z.string()
    .refine(val => /^-?\d+(\.\d+)?$/.test(val), {
      message: "Use dot (.) for decimal places, not comma (,)"
    })
    .transform(val => parseFloat(val)),
  safety_rating_change: z.string()
    .refine(val => /^-?\d+(\.\d+)?$/.test(val), {
      message: "Use dot (.) for decimal places, not comma (,)"
    })
    .transform(val => parseFloat(val)),
});

// This is the type before transform
export type RaceFormInputValues = z.input<typeof raceFormSchema>;

// This is the type after transform (what we get after validation)
export type RaceFormValues = z.infer<typeof raceFormSchema>;
