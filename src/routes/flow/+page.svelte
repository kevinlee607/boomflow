<script lang="ts">
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Flow from "./flow.svelte";
    import "../../app.css";
</script>

<SvelteFlowProvider>
    <Flow />
    <div class="right-sider-container">hahah</div>
</SvelteFlowProvider>
