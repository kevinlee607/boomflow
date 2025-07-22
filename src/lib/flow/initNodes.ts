import type { Node, Edge } from "@xyflow/svelte";
import { t } from "$lib/translations";

import { type NodeData, fetchDataWithZod } from "$lib/api/flownode";

const ApiUrl = "http://localhost:8090/";

const resp = await fetchDataWithZod(ApiUrl);

export function getNodes(): Node[] {
  const initialNodes: Node[] = [];
  resp.data.spec.nodes.forEach((n) => {
    const node: Node = {
      id: n.name,
      type: n.spec.type === "start" ? "start" : "custom",
      data: {
        name:
          n.Metadata?.Annotations?.["web.pipelineNode/name"] ||
          t.get("flow.node.defaultName", { item: n.name }),
        param: {
          label:
            n.Metadata?.Annotations?.["web.pipelineNode/name"] ||
            t.get("flow.node.defaultName", { item: n.name }),
        },
      },
      position: n.spec.position || { x: 0, y: 0 },
    };
    initialNodes.push(node);
  });
  return initialNodes;
}

export function getEdges(): Edge[] {
  const initialEdges: Edge[] = [];
  resp.data.spec.edges.forEach((e) => {
    const edge: Edge = {
      id: e.id,
      source: e.source,
      target: e.target,
      type: "custom",
      data: {
        label: t.get("flow.edge.defaultLabel", { item: e.id }),
      },
    };
    initialEdges.push(edge);
  });
  return initialEdges;
}
export function generateRondomId(prefix: string, length: number): string {
  let id = Math.random()
    .toString(36)
    .substring(2, length + 2);
  return `${prefix}-${id}`;
}
