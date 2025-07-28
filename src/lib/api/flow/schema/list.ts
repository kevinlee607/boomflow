import { z } from "zod";
export const flowListSchema = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    pipeline_outline: z.array(
      z.object({
        pid: z.number(),
        appID: z.string(),
        name: z.string(),
        displayName: z.string(),
        description: z.string().optional(),
        creatorID: z.string().optional(),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
      }),
    ),
  }),
});

export type flowList = z.infer<typeof flowListSchema>;
