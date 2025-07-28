//import type { PageServerLoad } from "./$types";
import { getFlowData } from "$lib/flow/initNodes";

export function load({ params }: { params: { slug: string } }) {
  const { nodes: getNodes, edges: getEdges } = getFlowData();
  return {
    nodes: getNodes,
    edges: getEdges,
    action: params.slug,
  };
}
