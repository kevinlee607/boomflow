<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import { nodeColors } from "$lib/flow/colors";
    import { sidebar } from "./+page.svelte";

    let { data }: NodeProps = $props();

    function handleInputClick(event: MouseEvent) {
        // 阻止事件冒泡，避免触发双击事件
        event.stopPropagation();
    }
    // 切换边栏可见性的函数
    function toggleSidebar() {
        sidebar.isSidebarOpen = !sidebar.isSidebarOpen;
    }
</script>

<div
    tabindex="0"
    class="relative flex flex-col w-32 min-h-[5rem] bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden border border-gray-200"
    ondblclick={toggleSidebar}
    role="button"
    aria-label="Open node details"
>
    <header
        class="flex items-center justify-center h-8 flex-shrink-0
               rounded-t-lg font-bold text-sm px-2 py-1
               text-white {nodeColors.get('approver')}"
    >
        <div class="flex-grow overflow-hidden whitespace-nowrap text-ellipsis">
            <input
                class="w-full text-center bg-transparent border-none outline-none
                       text-sm text-white placeholder-gray-200"
                value={data.name}
                placeholder="Node Name"
                onclick={handleInputClick}
            />
        </div>
    </header>

    <footer
        class="flex-grow flex flex-col justify-center p-2 bg-gray-50 border-t border-gray-100"
    >
        {#if Array.isArray(data.param) && data.param.length > 0}
            <div class="space-y-0.5">
                {#each data.param as p}
                    <div
                        class="text-gray-600 text-xs overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                        <span class="font-medium">{p.label}:</span>
                        <span class="text-gray-800">{p.data}</span>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="text-center text-gray-400 text-xs py-1">No params</div>
        {/if}
    </footer>

    <Handle
        type="target"
        position={Position.Top}
        class="w-16 !bg-teal-500 rounded-b-md !-top-2 !left-1/2 -translate-x-1/2"
    />
    <Handle
        type="source"
        position={Position.Bottom}
        class="w-16 !bg-teal-500 rounded-t-md !-bottom-2 !left-1/2 -translate-x-1/2"
    />
</div>
