<script lang="ts">
    import {
        Background,
        SvelteFlow,
        Controls,
        MiniMap,
        useSvelteFlow,
        type OnConnectEnd,
        type Node,
        type Edge,
        type Connection,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";

    import { generateRondomId, getFlowData } from "$lib/flow/initNodes";
    import CustomNode from "$lib/components/flow/node/CustomNodes.svelte";
    import StartNode from "$lib/components/flow/node/StartNode.svelte";
    import EndNode from "$lib/components/flow/node/EndNode.svelte";
    import { t } from "$lib/translations";
    import {
        nodesStoreData,
        selectedNodeStore,
        sidebarOpenStore,
    } from "$lib/store/flowtore";

    import { onMount } from "svelte";

    const nodeTypes = {
        custom: CustomNode,
        end: EndNode,
        start: StartNode,
    };

    const { nodes: getNodes, edges: getEdges } = getFlowData();
    //let nodes = $state.raw<Node[]>(getNodes());
    //let edges = $state.raw<Edge[]>(getEdges());
    let nodes = $state.raw<Node[]>(getNodes);
    let edges = $state.raw<Edge[]>(getEdges);

    const { updateNode, screenToFlowPosition } = useSvelteFlow();

    onMount(() => {
        // Initialize the nodes and edges from the store
        nodes;
        edges;
    });
    const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
        if (connectionState.isValid) return;

        const sourceNodeId = connectionState.fromNode?.id ?? "1";
        const id = generateRondomId("app", 8);
        const { clientX, clientY } =
            "changedTouches" in event ? event.changedTouches[0] : event;

        const newNode: Node = {
            id,
            data: {
                name: id,
                param: [
                    { label: t.get("flow.node.approver"), data: "Kevin Li" },
                    {
                        label: t.get("flow.node.approver-rule"),
                        data: "Approver Node",
                    },
                ],
            },
            type: "custom",
            // project the screen coordinates to pane coordinates
            position: screenToFlowPosition({
                x: clientX,
                y: clientY,
            }),
            // set the origin of the new node so it is centered
            origin: [0.5, 0.0],
        };
        nodes = [...nodes, newNode];
        edges = [
            ...edges,
            {
                source: sourceNodeId,
                target: id,
                id: `${sourceNodeId}--${id}`,
            },
        ];
    };

    // updateNode is used to update the node position when dragging
    const updateNodeData = (nodeId: string, newData: Record<string, any>) => {
        updateNode(nodeId, (node) => ({
            ...node,
            data: {
                ...node.data,
                ...newData,
            },
        }));
    };

    const updateNodeType = (nodeId: string, newType: string) => {
        updateNode(nodeId, (node) => ({
            ...node,
            type: newType,
        }));
    };
    const updateNodePosition = (
        nodeId: string,
        newPosition: { x: number; y: number },
    ) => {
        updateNode(nodeId, (node) => ({
            ...node,
            position: newPosition,
        }));
    };
</script>

<SvelteFlow
    bind:nodes
    {nodeTypes}
    bind:edges
    fitView
    onnodeclick={(event) => {
        const node = event.node;
        selectedNodeStore.set(node);
        $sidebarOpenStore = true;
    }}
    onconnectend={handleConnectEnd}
>
    <MiniMap />
    <Controls />
    <Background gap={16} size={1} class="!bg-gray-100 dark:!bg-gray-800" />
</SvelteFlow>
