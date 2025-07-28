import type { Node, Edge } from "@xyflow/svelte";
import { t } from "$lib/translations";

import { fetchDataWithZod } from "$lib/api/common";
import { nodeSchema, type NodeData } from "$lib/api/flow/schema/node";
import { nodesStoreData } from "$lib/store/flowtore";

const ApiUrl = "http://localhost:8090/flow";

const resp = await fetchDataWithZod(ApiUrl, nodeSchema);

export function getFlowData(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  nodesStoreData.set(resp);
  resp.data.spec.nodes.forEach((n: any) => {
    const node: Node = {
      id: n.name,
      type: "custom",
      data: {
        type: n.type,
        name:
          n.Metadata?.Annotations?.["web.pipelineNode/name"] ||
          t.get("flow.node.defaultName", { item: n.name }),
        param: n.spec || { params: [] },
      },
      position: n.position || { x: 0, y: 0 },
    };
    nodes.push(node);
  });

  resp.data.spec.edges.forEach((e: any) => {
    const edge: Edge = {
      id: e.id,
      source: e.source,
      target: e.target,
      type: "custom",
      data: {
        label: t.get("flow.edge.defaultName", { item: e.id }),
      },
    };
    edges.push(edge);
  });
  return { nodes, edges };
}

export function generateRondomId(prefix: string, length: number): string {
  let id = Math.random()
    .toString(36)
    .substring(2, length + 2);
  return `${prefix}-${id}`;
}
