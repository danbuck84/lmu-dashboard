
import * as z from "zod";

export const raceFormSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  car_id: z.string().min(1, { message: "Car is required" }),
  track_layout_id: z.string().min(1, { message: "Track and layout are required" }),
  start_position: z.coerce.number().int().min(1, { message: "Start position is required" }),
  finish_position: z.coerce.number().int().min(1, { message: "Finish position is required" }),
  driver_rating_change: z.coerce.number().int(),
  safety_rating_change: z.coerce.number().int(),
});

export type RaceFormValues = z.infer<typeof raceFormSchema>;
