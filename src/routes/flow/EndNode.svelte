<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import { t } from "$lib/translations";
    let { data }: NodeProps = $props();
</script>

<div class="shadow-md rounded-md bg-white cursor-pointer w-20">
    <div class="flex justify-center shadow-md rounded-md px-1 py-1 bg-white">
        <div class=" justify-center text-[10px] text-gray-500">
            {$t("flow.node.end")}
        </div>
    </div>
    <Handle
        type="target"
        position={Position.Top}
        class="w-16 !bg-teal-500 rounded-none border-none"
    />
</div>
