import z from "zod";

export const userSchema = z.object({
  avatar: z
    .string()
    .url({ message: "Avatar should be a valid URL" })
    .nonempty(),
  name: z
    .string()
    .min(3, { message: "Name should be at least 3 characters" })
    .max(60, { message: "Name should be at most 60 characters" }),
  username: z
    .string()
    .min(3, { message: "Username should be at least 3 characters" })
    .max(30, { message: "Username should be at most 30 characters" }),
  bio: z.string().max(160, { message: "Bio should be at most 160 characters" }),
});
