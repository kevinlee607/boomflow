import type { Node, Edge, Connection, XYPosition } from "@xyflow/svelte";
import { cubicOut } from "svelte/easing";

let nodeId = 0;
const getInitialNode = (position: XYPosition): Node => {
  nodeId += 1;
  return {
    id: `node_${nodeId}`,
    type: "custom", // 假设你要添加一个 'custom' 类型的节点
    position,
    data: { label: `Node ${nodeId}` },
    width: 150,
    height: 50,
  };
};

export function addNode(
  currentNodes: Node[],
  currentEdges: Edge[],
  position: XYPosition,
) {
  const newNode = getInitialNode(position);
  return {
    newNodes: [...currentNodes, newNode],
    newEdges: currentEdges,
  };
}
