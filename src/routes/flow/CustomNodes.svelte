<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import { nodeColors } from "$lib/flow/colors";
    // Assuming this path is correct for your sidebar store
    import { sidebarState as sidebar } from "./+page.svelte";

    let { data }: NodeProps = $props();

    function handleInputClick(event: MouseEvent) {
        // Prevent event bubbling to avoid triggering double-click
        event.stopPropagation();
    }

    // Function to toggle sidebar visibility (used for double-click action)
    function toggleSidebar() {
        sidebar.isSidebarOpen = !sidebar.isSidebarOpen;
    }
</script>

<div
    tabindex="0"
    class="relative flex flex-col w-32 h-10 bg-white rounded-lg shadow-lg cursor-pointer border border-gray-200"
    ondblclick={toggleSidebar}
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
        {#if Array.isArray(data.param) && data.param.length > 0}
            <div
                class="space-y-0.5 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-center"
            >
                {#each data.param as p}
                    <span class="text-[8px] text-gray-600">{p.label}: </span>
                    <span class="text-[8px] text-gray-800">{p.data}</span>
                {/each}
            </div>
        {:else}
            <div class="text-center text-gray-400 text-[8px] py-0">
                No params
            </div>
        {/if}
    </footer>

    <Handle
        type="target"
        position={Position.Top}
        class=" !bg-teal-500 rounded-b-md  !left-1/2 -translate-x-1/2"
    />
    <Handle
        type="source"
        position={Position.Bottom}
        class=" !bg-teal-500 rounded-t-md  !left-1/2 -translate-x-1/2"
    />
</div>
