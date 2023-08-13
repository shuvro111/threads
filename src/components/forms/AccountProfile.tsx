"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validations/user";

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

import { FiImage } from "react-icons/fi";
import { Textarea } from "../ui/textarea";
import { cn, isBase64Image } from "@/lib/utils/helper.functions";
import { ChangeEvent, useState } from "react";

import { AccountProfile } from "@/lib/types/user";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

const fileInputStyles = `bg-transparent border-none text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-emerald-400 file:text-slate-950
      hover:file:bg-emerald-400 h-full px-0 file:cursor-pointer`;

const textInputStyles = `bg-slate-800 border-none focus-visible:ring-0 focus-visible:ring-emerald-400/30 focus-visible:ring-offset-emerald-400/10 focus:ring-0 h-12`;

export default function AccountProfile({ user, btnText }: AccountProfile) {
  const [avatar, setAvatar] = useState<File[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { startUpload } = useUploadThing("avatar");

  const form = useForm({
    defaultValues: {
      avatar: user?.avatar || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    resolver: zodResolver(userSchema),
  });

  // onSubmit function
  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const blob = values.avatar;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const image = await startUpload(avatar);

      if (image && image[0].fileUrl) {
        values.avatar = image[0].fileUrl;
      }
    }

    await updateUser(
      {
        id: user.id,
        name: values.name,
        username: values.username,
        bio: values.bio,
        avatar: values.avatar,
      },
      pathname
    );

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  // handleAvatar function
  const handleAvatar = (
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
      setAvatar(Array.from(e.target.files));

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
          name="avatar"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-full"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAU"
                  />
                ) : (
                  <div className="bg-slate-800 p-6 w-fit flex justify-center items-center rounded-full">
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
                    handleAvatar(e, field.onChange);
                  }}
                />
              </FormControl>
              <FormDescription>
                Upload your avatar, must be a png or jpg under 1mb
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Threads"
                  className={textInputStyles}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="@threads"
                  className={textInputStyles}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Enter Your Bio"
                  className={cn(textInputStyles, "h-full resize-none")}
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
          {btnText}
        </Button>
      </form>
    </Form>
  );
}
