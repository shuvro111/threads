"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import Image from "next/image";

import { FiEdit3, FiImage } from "react-icons/fi";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils/helper.functions";
import { ChangeEvent, useState } from "react";

import { CreateThread } from "@/lib/types/thread";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useRouter } from "next/navigation";
import { threadSchema } from "@/lib/validations/thread";
import { fileInputStyles } from "@/lib/design/styles";
import { createThread, updateThread } from "@/lib/actions/thread.actions";

export default function CreateThread({
  user,
  btnText,
  currentThread,
}: CreateThread) {
  const [media, setMedia] = useState<File[]>([]);
  const router = useRouter();
  const { startUpload } = useUploadThing("media");

  const form = useForm({
    defaultValues: {
      content: currentThread?.content || "",
      media:
        (currentThread && currentThread?.media === "null"
          ? ""
          : currentThread?.media) || "",
    },
    resolver: zodResolver(threadSchema),
  });

  // onSubmit function
  const onSubmit = async (values: z.infer<typeof threadSchema>) => {
    const blob = values.media;

    const hasImageChanged = isBase64Image(String(blob));
    if (hasImageChanged) {
      const image = await startUpload(media);

      if (image && image[0].fileUrl) {
        values.media = image[0].fileUrl;
      }
    }

    if (currentThread) {
      await updateThread({
        id: currentThread.id,
        author: user.id,
        content: values.content,
        media: values.media || null,
        communityId: null,
      });
    } else {
      await createThread({
        author: user.id,
        content: values.content,
        media: values.media || null,
        communityId: null,
      });
    }

    router.push("/");
  };

  // handle media function
  const handleMedia = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      //file validation
      if (!["image/png", "image/jpeg"].includes(file.type)) return;
      if (file.size > 1 * 1024 * 1024) return alert("Avatar must be under 1mb");
      setMedia(Array.from(e.target.files));

      fileReader.onloadend = async (event) => {
        event.target?.result && onChange(event.target.result.toString());
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem className="space-y-8">
              <FormLabel>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAU"
                  />
                ) : (
                  <div className="bg-slate-800 p-6 w-fit flex justify-center items-center rounded-md">
                    <FiImage className="text-4xl text-slate-500 font-thin" />
                  </div>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="@threads"
                  type="file"
                  accept="image/png, image/jpeg"
                  className={fileInputStyles}
                  onChange={(e) => {
                    handleMedia(e, field.onChange);
                  }}
                />
              </FormControl>
              <FormDescription>
                Upload a image to your thread (optional), must be a png or jpeg
                under 1mb
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex gap-2 items-center">
                  <Image
                    src={user?.avatar}
                    width={48}
                    height={48}
                    alt="user"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-200">{user?.name}</span>
                    <span className="text-slate-400">@{user?.username}</span>
                  </div>
                </div>
                <p className="mt-8 text-emerald-400 text-lg flex items-center gap-2">
                  Start a thread <FiEdit3 />
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="What's on your mind?"
                  className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 background-transparent border-0 rounded-none border-l border-slate-700 px-8 py-4 text-lg font-light text-slate-300"
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
          className="capitalize w-full py-6"
        >
          {currentThread ? "Update Thread" : btnText}
        </Button>
      </form>
    </Form>
  );
}
