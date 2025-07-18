<script lang="ts">
    import {
        Background,
        SvelteFlow,
        Controls,
        MiniMap,
        useSvelteFlow,
        useNodesData,
        type OnConnectEnd,
        type Node,
        type Edge,
        type Connection,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";

    import {
        initialNodes,
        initialEdges,
        generateRondomId,
    } from "$lib/flow/initNodes";
    import CustomNode from "./CustomNodes.svelte";
    import StartNode from "./StartNode.svelte";
    import EndNode from "./EndNode.svelte";
    import { t } from "$lib/translations";

    const nodeTypes = {
        custom: CustomNode,
        end: EndNode,
        start: StartNode,
    };

    let nodes = $state.raw<Node[]>(initialNodes);
    let edges = $state.raw<Edge[]>(initialEdges);

    const { updateNode, screenToFlowPosition } = useSvelteFlow();

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
    onconnectend={handleConnectEnd}
>
    <MiniMap />
    <Controls />
    <Background gap={16} size={1} class="!bg-gray-100 dark:!bg-gray-800" />
</SvelteFlow>
