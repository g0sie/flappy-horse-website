import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { doesDisplayNameExist } from "@/lib/doesDisplayNameExist";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
  displayName: z
    .string()
    .min(3, { message: "Muszą być przynajmniej 3 znaki kochanie." })
    .max(30, { message: "Nie może być więcej niż 30 znaków kochanie." })
    .trim()
    .refine(
      async (displayName) => {
        const exist = await doesDisplayNameExist(displayName);
        return !exist;
      },
      {
        message: "Taka nazwa już istnieje :(",
      }
    ),
});

const DisplayNameForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-base">
                Nazwa użytkownika
              </FormLabel>
              <FormControl>
                <Input
                  className="text-accent border-accent"
                  placeholder="twoja nazwa"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-accent text-xs">
                To będzie twoja nazwa w leaderboardzie. Będzie widoczna dla
                innych. Możesz ustawić ją tylko raz. Dobrze się zastanów.
              </FormDescription>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3 font-bold" size="sm">
          Zapisz
        </Button>
      </form>
    </Form>
  );
};
export default DisplayNameForm;
