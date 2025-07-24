import { z } from "zod";

export const nodeSchema = z.object({
  code: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    name: z.string(),
    displayName: z.string(),
    spec: z.object({
      params: z.array(
        z.object({
          name: z.string(),
          default: z.string().optional(),
          description: z.string().optional(),
        }),
      ),
      nodes: z.array(
        z.object({
          name: z.string(),
          Metadata: z.object({
            Annotations: z
              .object({
                "web.pipelineNode/name": z.string().optional(),
                "web.pipelineNode/branchID": z.string().optional(),
                "web.pipelineNode/branchTargetElementID": z.string().optional(),
                "web.pipelineNode/updateFormType": z.string().optional(),
                "web.pipelineNode/isElseBranch": z.boolean().optional(),
              })
              .optional(),
          }),
          type: z.string().optional(),
          position: z
            .object({
              x: z.number(),
              y: z.number(),
            })
            .optional(),
          spec: z.object({
            outPut: z.any().optional(),
            inPut: z.any().optional(),
            config: z
              .array(
                z.object({
                  key: z.string(),
                  value: z.string(),
                }),
              )
              .optional(),
            rules: z
              .array(
                z.object({
                  key: z.string(),
                  value: z.string(),
                }),
              )
              .optional(),
            params: z
              .array(
                z.object({
                  key: z.string(),
                  value: z.string(),
                }),
              )
              .optional(),
          }),
        }),
      ),
      edges: z.array(
        z.object({
          source: z.string(),
          target: z.string(),
          id: z.string(),
        }),
      ),
      communal: z.array(
        z.object({
          name: z.string(),
          default: z.boolean(),
          description: z.string().optional(),
        }),
      ),
    }),
    config: z.object({
      canCancel: z.number(),
      canCancelType: z.number(),
      canMsg: z.number(),
      canUrge: z.number(),
      canViewStatusMsg: z.number(),
    }),
    variable: z.array(
      z.object({
        code: z.string(),
        defaultValue: z.boolean(),
        desc: z.string(),
        fieldType: z.string(),
        id: z.string(),
        name: z.string(),
        type: z.string(),
      }),
    ),
  }),
});

async function fetchDataUnknown<T = any>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorText || response.statusText}`,
      );
    }

    // 直接将结果断言为 any
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch unknown data:", error);
    throw error;
  }
}

export type NodeData = z.infer<typeof nodeSchema>;

export async function fetchDataWithZod(apiUrl: string): Promise<NodeData> {
  const data = await fetchDataUnknown(apiUrl);
  try {
    const parsedData = nodeSchema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Data validation error:", error);
    throw new Error("Invalid data format");
  }
}
