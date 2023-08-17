import { generateComponents } from "@uploadthing/react";

import type { fileRouter } from "~/server/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<fileRouter>();
