<script lang="ts">
    import { page } from "$app/stores";
    import { t } from "$lib/translations";

    // 接收 category 数据作为 props
    let { category } = $props();

    // 为当前组件实例声明一个独立的 isOpen 状态
    let isOpen = $state(false);

    // 切换折叠状态的函数
    function toggleCategory() {
        isOpen = !isOpen;
    }

    // 检查当前链接是否激活
    function isActive(href: string): boolean {
        return $page.url.pathname.startsWith(href);
    }
</script>

<h3
    class="text-sm font-semibold text-gray-500 uppercase mt-4 mb-2 border-b-1 border-stone-100"
>
    {#if category.children && category.children.length > 0}
        <button
            onclick={toggleCategory}
            class="
        flex items-center justify-between w-full p-2 rounded-md
        transition-colors duration-150
        text-gray-700
        hover:bg-gray-100
        focus:outline-none
        border-none
        bg-transparent
      "
            aria-expanded={isOpen}
            aria-controls={`menu-${category.name.replace(/\s+/g, "-")}`}
            aria-label={`Toggle ${category.name} menu`}
        >
            <span class="flex-grow text-left">{$t(category.name)}</span>
            <svg
                class="w-4 h-4 transition-transform duration-200 {isOpen
                    ? 'rotate-90'
                    : ''}"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                ></path>
            </svg>
        </button>
    {:else if category.href?.length}
        <a
            href={category.href}
            class="flex items-center p-2 rounded-md transition-colors duration-150 {isActive(
                category.href,
            )
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'hover:bg-gray-100 text-gray-700'}"
        >
            {$t(category.name)}
        </a>
    {:else}
        {$t(category.name)}
    {/if}
</h3>

{#if category.children && category.children.length > 0}
    <ul
        id={`menu-${category.name.replace(/\s+/g, "-")}`}
        class="pl-4 py-2
      transition-all duration-300 ease-in-out
      overflow-hidden
      {isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}"
    >
        {#each category.children as item}
            <li class="mb-1 text-xs ml-3">
                <a
                    href={item.href}
                    class="flex items-center p-2 rounded-md transition-colors duration-150 {isActive(
                        item.href,
                    )
                        ? 'bg-blue-100 text-blue-700 font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'}"
                >
                    <span class="mr-2">🔗</span>
                    {$t(item.name)}
                </a>
            </li>
        {/each}
    </ul>
{/if}
