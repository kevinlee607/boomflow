<script module>
    class Sidebar {
        isSidebarOpen = $state(false);
    }
    // 定义右侧边栏的开/关状态
    export const sidebar = new Sidebar();
</script>

<script lang="ts">
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import Flow from "./flow.svelte";
    import "../../app.css"; // 确保你的全局 CSS 已导入
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-gray-100 w-7/8 relative">
    <div
        class="flex-grow
            {sidebar.isSidebarOpen ? 'md:w-3/4 lg:w-4/5' : 'md:w-full'}
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
            {sidebar.isSidebarOpen
            ? 'md:w-1/4 lg:w-1/5'
            : 'md:w-0 md:p-0 md:overflow-hidden'}"
    >
        <div class="bg-white rounded-md p-4 mb-4 shadow-sm">
            <h3 class="font-bold text-sm mb-2 text-gray-800">
                About Community
            </h3>
            <p class="text-xs text-gray-600 mb-2">
                Welcome to a calmer Internet! Here you can report bugs, share
                your thoughts and showcase your creations.
            </p>
            <p class="text-xs text-gray-500 mb-2">Created Apr 6, 2024</p>
            <p class="text-xs text-gray-500 mb-4">Public</p>
            <button
                class="w-full py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
                Join
            </button>
        </div>
        <div class="bg-white rounded-md p-4 shadow-sm">
            <h3 class="font-bold text-sm mb-2 text-gray-800">
                Trending Topics
            </h3>
            <ul class="text-sm">
                <li class="mb-1">
                    <a href="#" class="text-blue-500 hover:underline"
                        >#SvelteKitTips</a
                    >
                </li>
                <li class="mb-1">
                    <a href="#" class="text-blue-500 hover:underline"
                        >#WebDev2025</a
                    >
                </li>
                <li>
                    <a href="#" class="text-blue-500 hover:underline"
                        >#TailwindCSSMagic</a
                    >
                </li>
            </ul>
        </div>
    </aside>
</div>
