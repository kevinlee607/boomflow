<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import { nodeColors } from "$lib/flow/colors";
    let { data }: NodeProps = $props();
</script>

<div class="flow-container">
    <div class="relative">
        <header class="flow-node-header {nodeColors.get('approver')}">
            <div class="text-[10px] text-gray-500">
                {data.name}
            </div>
        </header>
        <footer class="flow-node-footer">
            {#if Array.isArray(data.param)}
                {#each data.param as p}
                    <div
                        class="text-gray-400 text-[12px] leading-[20px] font-[400]"
                    >
                        {p.label}:
                        <span class="text-gray-600">{p.data}</span>
                    </div>
                {/each}
            {/if}
        </footer>
    </div>
    <Handle
        type="target"
        position={Position.Top}
        class="w-16 !bg-teal-500 rounded-none border-none"
    />
    <Handle
        type="source"
        position={Position.Bottom}
        class="w-16 !bg-teal-500 rounded-none border-none"
    />
</div>
