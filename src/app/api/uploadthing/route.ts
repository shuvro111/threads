import { createNextRouteHandler } from "uploadthing/next";

import { uploadAvatarRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadAvatarRouter,
});
