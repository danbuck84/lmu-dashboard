
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RaceFormValues, raceFormSchema } from "./race-form-schema";

interface RaceFormProps {
  onSubmit: (values: RaceFormValues) => Promise<void>;
  cars: any[];
  trackLayouts: any[];
  loading: boolean;
  defaultValues?: Partial<RaceFormValues>;
}

const RaceForm = ({ onSubmit, cars, trackLayouts, loading, defaultValues }: RaceFormProps) => {
  const form = useForm<RaceFormValues>({
    resolver: zodResolver(raceFormSchema),
    defaultValues: defaultValues || {
      date: new Date().toISOString().split('T')[0],
      car_id: "",
      track_layout_id: "",
      start_position: 0,
      finish_position: 0,
      driver_rating_change: 0,
      safety_rating_change: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="car_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select car" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.model} ({car.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="track_layout_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track & Layout *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select track and layout" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {trackLayouts.map((layout) => (
                      <SelectItem key={layout.id} value={layout.id}>
                        {layout.tracks?.name} ({layout.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Position *</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="finish_position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finish Position *</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="driver_rating_change"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Rating Change</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="safety_rating_change"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Safety Rating Change</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Race"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RaceForm;
