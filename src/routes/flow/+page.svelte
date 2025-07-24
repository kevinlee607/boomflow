<script module>
    class SidebarState {
        isSidebarOpen = $state(false);
    }
    // 定义右侧边栏的开/关状态
    export const sidebarState = new SidebarState();
    // Function to toggle sidebar visibility (used for double-click action)
    function closeSidebar() {
        sidebarState.isSidebarOpen = false;
    }
</script>

<script lang="ts">
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Flow from "./flow.svelte";
    import "../../app.css"; // 确保你的全局 CSS 已导入
    import Sidebar from "$lib/flow/sidebar.svelte";
</script>

<div class="flex flex-col md:flex-row h-dvh bg-gray-100 w-full relative">
    <div
        class="flex-grow
            {sidebarState.isSidebarOpen ? 'md:w-3/4 lg:w-4/5' : 'md:w-full'}
            transition-all duration-300 ease-in-out"
    >
        <div class="bg-white h-full min-h-[500px]">
            <SvelteFlowProvider>
                <Flow />
            </SvelteFlowProvider>
        </div>
    </div>

    <aside
        class=" sticky flex flex-col bg-gray-50 flex-shrink-0
                transition-all duration-300 ease-in-out
                {sidebarState.isSidebarOpen
            ? 'md:w-2/4 lg:w-2/5 p-0' // When open, apply padding here
            : 'md:w-0 md:p-0 md:overflow-hidden'}"
    >
        <Sidebar />
    </aside>
</div>
