<script lang="ts">
    import "../app.css"; // 导入你的全局 CSS 文件
    import { t } from "$lib/translations";
    import { navList } from "$lib/config/navigation";
    import { page } from "$app/stores";
    import CollapsibleCategory from "$lib/category/CollapsibleCategory.svelte";
    function isActive(href: string): boolean {
        return $page.url.pathname.startsWith(href);
    }
    let { children } = $props();
    // 定义右侧边栏的开/关状态
    let isSidebarOpen = $state(true); // 默认打开

    // 切换边栏可见性的函数
    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
</script>

<div class="cosp-layout-container">
    <header class="top-navbar">
        <div class="flex items-center">
            <img src="/logo.png" alt="COSP" class="h-8 mr-2" />
            <span class="text-xl font-bold text-gray-800"
                >{t.get("common.title")}</span
            >
        </div>
        <div class="search-bar-container relative">
            <input type="text" placeholder="Search..." class="search-input" />
        </div>

        <div class="user-actions">
            <button class="profile-button">
                <img
                    src="/user-avatar.png"
                    alt="User Avatar"
                    class="h-7 w-7 rounded-full"
                />
            </button>
            <button class="profile-button">
                <span class="text-gray-700 font-semibold">Create</span>
            </button>
            <button class="profile-button">
                <span class="text-gray-700 font-semibold">▾</span>
            </button>
        </div>
    </header>

    <div class="content-wrapper">
        <nav
            class="left-sidebar {isSidebarOpen
                ? 'md:w-1/5 lg:w-1/7'
                : 'md:w-0 md:p-0 md:overflow-hidden'}"
        >
            <div class="p-4">
                <nav class="border-t-stone-100">
                    {#each navList as category (category.name)}
                        <CollapsibleCategory {category} />
                    {/each}
                </nav>
            </div>
        </nav>
        <button
            onclick={toggleSidebar}
            class="absolute top-1/10 -translate-y-1/2 bg-white text-gray-600 border border-gray-400
                       p-1.5 rounded-full hover:bg-gray-200 focus:outline-none z-50 flex items-center justify-center"
            style={isSidebarOpen ? "left: 14.5rem;" : "left: -0.5rem;"}
            aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d={isSidebarOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"}
                />
            </svg>
        </button>
        <main class="page-content-wrapper">
            {@render children()}
        </main>
    </div>
</div>
