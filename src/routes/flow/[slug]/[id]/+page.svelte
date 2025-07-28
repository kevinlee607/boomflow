<script lang="ts">
    import {
        SvelteFlowProvider,
        MiniMap,
        Controls,
        Background,
        type Node,
        type Edge,
        SvelteFlow,
    } from "@xyflow/svelte";
    import CustomNode from "$lib/components/flow/node/CustomNodes.svelte";
    import StartNode from "$lib/components/flow/node/StartNode.svelte";
    import EndNode from "$lib/components/flow/node/EndNode.svelte";
    import Sidebar from "$lib/flow/sidebar.svelte";
    import { selectedNodeStore, sidebarOpenStore } from "$lib/store/flowtore";

    let { data } = $props();

    let nodes = $state.raw<Node[]>(data.nodes);
    let edges = $state.raw<Edge[]>(data.edges);

    // Let's define `isReadonly` instead, which is more intuitive
    // If action is "design", it's NOT readonly, so `isReadonly` is `false`.
    // If action is NOT "design", it's readonly, so `isReadonly` is `true`.
    let isReadonly = $state(data.action !== "design");

    const nodeTypes = {
        custom: CustomNode,
        end: EndNode,
        start: StartNode,
    };
</script>

<div class="flex flex-col md:flex-row h-dvh bg-gray-100 w-full relative">
    <div
        class="flex-grow
                {$sidebarOpenStore ? 'md:w-3/4 lg:w-4/5' : 'md:w-full'}
                transition-all duration-300 ease-in-out"
    >
        <div class="bg-white h-full min-h-[500px]">
            <SvelteFlowProvider>
                <SvelteFlow
                    bind:nodes
                    bind:edges
                    {nodeTypes}
                    fitView
                    onnodeclick={(event) => {
                        const node = event.node;
                        selectedNodeStore.set(node);
                        $sidebarOpenStore = true;
                    }}
                    nodesDraggable={!isReadonly}
                    nodesConnectable={!isReadonly}
                    elementsSelectable={!isReadonly}
                >
                    <MiniMap />
                    <Controls />

                    <Background
                        gap={16}
                        size={1}
                        class="!bg-gray-100 dark:!bg-gray-800"
                    />
                </SvelteFlow>
            </SvelteFlowProvider>
        </div>
    </div>

    <aside
        class=" sticky flex flex-col bg-gray-50 flex-shrink-0
                    transition-all duration-300 ease-in-out
                    {$sidebarOpenStore
            ? 'md:w-2/4 lg:w-2/5 p-0' // When open, apply padding here
            : 'md:w-0 md:p-0 md:overflow-hidden'}"
    >
        <Sidebar />
    </aside>
</div>
