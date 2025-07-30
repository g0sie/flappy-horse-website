import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { doesDisplayNameExist } from "@/lib/doesDisplayNameExist";
import { db } from "@/utils/firebase.utils";
import { doc, setDoc } from "firebase/firestore";

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

interface DisplayNameFormProps {
  refreshData: () => Promise<void>;
}

const formSchema = z.object({
  displayName: z
    .string()
    .nonempty("No coś musisz wpisać")
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

const DisplayNameForm = ({ refreshData }: DisplayNameFormProps) => {
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsFetching(true);
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { displayName: data.displayName }, { merge: true });
      refreshData();
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    }
  }

  if (isError) {
    return <p className="text-primary">coś poszło nie tak :(</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormDescription className="text-secondary mb-2">
          Jeżeli chcesz pojawić się w leaderboardzie oraz przeglądać swój wynik
          - musisz ustawić nazwę użytkownika.
        </FormDescription>
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
        <Button
          type="submit"
          disabled={isFetching}
          className="mt-3 font-bold bg-secondary"
          size="sm"
        >
          {isFetching ? "czekaj..." : "Zapisz"}
        </Button>
      </form>
    </Form>
  );
};
export default DisplayNameForm;
