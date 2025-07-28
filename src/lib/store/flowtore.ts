import { writable, derived } from "svelte/store";
import { z } from "zod";
import { nodeSchema } from "$lib/api/flow/schema/node";
import { type Node } from "@xyflow/svelte";

export type nodesStor = z.infer<typeof nodeSchema>;

export const nodesStoreData = writable<nodesStor | null>(null);

export const sidebarOpenStore = writable<boolean>(false);

export const selectedNodeStore = writable<Node | null>(null);

export function setSelectedNode(node: Node | null) {
  selectedNodeStore.set(node);
}
// Optionally, a function to clear the selected node
export function clearSelectedNode() {
  selectedNodeStore.set(null);
}
