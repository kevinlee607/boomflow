<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    import { t } from "$lib/translations";
    let { data }: NodeProps = $props();
</script>

<div class="shadow-md rounded-md bg-white cursor-pointer w-40">
    <div class="flex justify-center shadow-md rounded-md px-2 py-2 bg-white">
        <div class="text-[10px] text-gray-500">
            {$t("flow.node.start")}
        </div>
    </div>

    <Handle
        type="source"
        position={Position.Bottom}
        class="w-16 !bg-teal-500 rounded-none border-none"
    />
</div>
