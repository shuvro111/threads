"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FiSearch } from "react-icons/fi";

import { textInputStyles } from "@/lib/design/styles";
import { cn } from "@/lib/utils/helper.functions";
import { searchSchema } from "@/lib/validations/search";
import { z } from "zod";

export default function SearchForm() {
  const form = useForm({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(searchSchema),
  });

  // onSubmit function
  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    //TODO: work on search feature
  };

  return (
    <div className=" flex flex-col justify-between w-full p-2 bg-slate-900 rounded-lg shadow-md text-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center w-full"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex flex-1 items-center space-y-0">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search..."
                    className={cn(
                      textInputStyles,
                      "no-focus focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full px-6 bg-transparent text-slate-300 text:lg"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="brand"
            type="submit"
            className="gap-2 capitalize m-0 ml-4 p-0 lg:px-6 text-emerald-400 bg-transparent hover:bg-transparent"
          >
            <FiSearch size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
