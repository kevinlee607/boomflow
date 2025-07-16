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
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";
    import { t } from "$lib/translations";

    import { initialNodes, initialEdges } from "$lib/flow/nodes-edges";
    import generateRandomId from "$lib/flow/nodes-edges";
    import CustomNode from "./CustomNodes.svelte";
    import StartNode from "./StartNode.svelte";
    import EndNode from "./EndNode.svelte";
    import CustomNodes from "./CustomNodes.svelte";

    const nodeTypes = {
        custom: CustomNode,
        end: EndNode,
        start: StartNode,
    };
    const { screenToFlowPosition } = useSvelteFlow();

    const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
        if (connectionState.isValid) return;

        const sourceNodeId = connectionState.fromNode?.id ?? "start";
        const tartgetNodeId = connectionState.toNode?.id ?? "end";
        const id = generateRandomId(12);
        const { clientX, clientY } =
            "changedTouches" in event ? event.changedTouches[0] : event;

        const newNode: Node = {
            id,
            data: {
                name: `Node-${id}`,
                param: [
                    { label: t.get("flow.node.approver"), data: "Kevin Li" },
                    {
                        label: t.get("flow.node.approver-rule"),
                        data: "Approver Node",
                    },
                ],
            },
            // project the screen coordinates to pane coordinates
            position: screenToFlowPosition({
                x: clientX,
                y: clientY,
            }),

            // set the origin of the new node so it is centered
            origin: [0.5, 0.0],
        };
        newNode.type = "custom";
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

    let nodes = $state.raw<Node[]>(initialNodes);
    let edges = $state.raw<Edge[]>(initialEdges);
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
