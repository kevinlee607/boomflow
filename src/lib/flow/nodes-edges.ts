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

export default function generateRondomId(length: number): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
