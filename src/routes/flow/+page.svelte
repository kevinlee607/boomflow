<script module>
    class SidebarState {
        isSidebarOpen = $state(false);
    }
    // 定义右侧边栏的开/关状态
    export const sidebarState = new SidebarState();
</script>

<script lang="ts">
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Flow from "./flow.svelte";
    import "../../app.css"; // 确保你的全局 CSS 已导入
    import Sidebar from "$lib/flow/sidebar.svelte";
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-gray-100 w-full relative">
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
        class="right-sidebar p-4 bg-gray-50 flex-shrink-0
            transition-all duration-300 ease-in-out
            {sidebarState.isSidebarOpen
            ? 'md:w-1/4 lg:w-1/5'
            : 'md:w-0 md:p-0 md:overflow-hidden'}"
    >
        <Sidebar />
    </aside>
</div>
