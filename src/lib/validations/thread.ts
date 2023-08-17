import z from "zod";

export const threadSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Thread content should be at least 3 characters" })
    .max(500, { message: "Thread content should be at most 500 characters" }),
  media: z
    .string()
    .transform((value) => (value.trim() === "" ? undefined : value))
    .optional(),
});

export const commentSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Thread content should be at least 3 characters" })
    .max(500, { message: "Thread content should be at most 500 characters" }),
});
