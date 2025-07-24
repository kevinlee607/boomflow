<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import { nodeColors } from "$lib/flow/colors";
    import { t } from "$lib/translations";

    let { data }: NodeProps = $props();

    function handleInputClick(event: MouseEvent) {
        // Prevent event bubbling to avoid triggering double-click
        event.stopPropagation();
    }
    let nodesParam = data.param as Map<string, any>;
</script>

<div
    tabindex="0"
    class="relative flex flex-col w-32 h-10 bg-white rounded-lg shadow-lg cursor-pointer border border-gray-200"
    role="button"
    aria-label="Open node details"
>
    <header
        class="flex items-center justify-center h-2 flex-shrink-0
                rounded-t-lg font-bold text-[8px] px-2 py-1
                text-white {nodeColors.get('approver')}"
    >
        <div class="flex-grow overflow-hidden whitespace-nowrap text-ellipsis">
            <input
                class="w-full text-center bg-transparent border-none outline-none
                        text-[8px] text-white placeholder-gray-200"
                value={data.name}
                placeholder="Node Name"
                onclick={handleInputClick}
            />
        </div>
    </header>

    <footer
        class="flex items-center justify-center h-4 flex-shrink-0 py-0.5 px-2 bg-gray-50 border-t border-gray-100"
    >
        {#each Object.entries(nodesParam) as [key, value]}
            {#if key === "rules"}
                {#if Array.isArray(value) && value.length > 0}
                    {#each value as p}
                        <div
                            class="flex items-center justify-center
                                   space-y-0.5 flex-grow overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-gray-100 h-full"
                        >
                            <span class="text-[8px] text-gray-600"
                                >{$t("flow.node." + key)}:
                            </span>
                            <span class="text-[8px] text-gray-800"
                                >{p.value || ""}</span
                            >
                        </div>
                    {/each}
                {:else}
                    <span class="text-[8px] text-gray-400">
                        {$t("flow.node.no_rules_data")}
                    </span>
                {/if}
            {:else}
                <div
                    class="flex items-center justify-center
                           flex-grow overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-gray-100 h-full"
                >
                    <span class="text-[8px] text-gray-600">{key}: </span>
                    <span class="text-[8px] text-gray-800"
                        >{JSON.stringify(value)}</span
                    >
                </div>
            {/if}
        {/each}

        {#if nodesParam.size === 0}
            <span class="text-[8px] text-gray-400">
                {$t("flow.node.no_param_data")}
            </span>
        {/if}
    </footer>

    <Handle
        type="target"
        position={Position.Top}
        class=" !bg-teal-500 rounded-b-md !left-1/2 -translate-x-1/2"
    />
    <Handle
        type="source"
        position={Position.Bottom}
        class=" !bg-teal-500 rounded-t-md !left-1/2 -translate-x-1/2"
    />
</div>
