import { generateReactHelpers } from "@uploadthing/react/hooks";
import { uploadAvatarRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<uploadAvatarRouter>();
