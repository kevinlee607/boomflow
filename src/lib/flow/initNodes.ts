import type { Node, Edge } from "@xyflow/svelte";
import { t } from "$lib/translations";

export const initialNodes: Node[] = [
  {
    id: "start",
    type: "start",
    data: {
      lable: t.get("flow.node.start"),
      type: "start",
    },
    position: { x: 0, y: 50 },
  },
];

export const initialEdges: Edge[] = [];

export function generateRondomId(prefix: string, length: number): string {
  let id = Math.random()
    .toString(36)
    .substring(2, length + 2);
  return `${prefix}-${id}`;
}
