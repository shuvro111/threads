"use client";

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

import { z } from "zod";
import Image from "next/image";

import { FiSend } from "react-icons/fi";

import { CreateComment } from "@/lib/types/comment";
import { useRouter } from "next/navigation";
import { commentSchema } from "@/lib/validations/thread";
import { textInputStyles } from "@/lib/design/styles";
import { cn } from "@/lib/utils/helper.functions";
import { addCommentToThread } from "@/lib/actions/thread.actions";

export default function Comment({
  threadId,
  userId,
  userAvatar,
  btnText,
}: CreateComment) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      content: "",
      media: "",
    },
    resolver: zodResolver(commentSchema),
  });

  // onSubmit function
  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    console.log(values);
    const comment = await addCommentToThread(threadId, {
      author: userId,
      content: values.content,
      media: null,
      communityId: null,
    });

    if (comment) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center w-full"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-1 items-center space-y-0">
              <FormLabel>
                <Image
                  src={userAvatar}
                  width={48}
                  height={48}
                  objectFit="cover"
                  alt="user"
                  className="w-12 h-12 object-cover rounded-full mr-8"
                />
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Comment..."
                  className={cn(
                    textInputStyles,
                    "no-focus focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full px-6 text-white"
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
          className="gap-2 capitalize m-0 ml-4 p-0 lg:px-6 text-emerald-400 lg:text-slate-950 lg:bg-emerald-400 lg:rounded-full"
        >
          <span className="hidden lg:block">{btnText}</span>
          <FiSend size={20} />
        </Button>
      </form>
    </Form>
  );
}
