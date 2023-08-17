import { getAuth } from "@clerk/nextjs/server";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
    "application/msword": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(({ req }) => {
      const auth = getAuth(req);
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: auth.userId };
    })
    .onUploadComplete(({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type fileRouter = typeof fileRouter;
