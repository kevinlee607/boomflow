<script lang="ts">
    import { selectedNodeStore, sidebarOpenStore } from "$lib/store/flowtore"; // Ensure sidebarOpenStore is imported
    import { type Node } from "@xyflow/svelte";
    import { t } from "$lib/translations";
    import RichTextEditor from "$lib/components/flow/richTextEditor.svelte";

    let currentNode: Node | null;
    // Auto-subscribe to the store
    $: currentNode = $selectedNodeStore;

    $: nodeParams = currentNode?.data?.param || {};
    // No need for a separate `isSidebarOpen` reactive variable if you just want to update the store.
    // If you need it for conditional rendering, it's fine, but the update should target the store.

    function closeSidebar(): void {
        // CORRECT WAY TO CLOSE THE SIDEBAR (update the store)
        $sidebarOpenStore = false; // Assign directly to the store variable using the $ shorthand
        // OR: sidebarOpenStore.set(false); // Explicit store method
    }
</script>

<div class="flex flex-col justify-between h-full">
    <div
        class="
            sticky top-0 z-20
            h-10 bg-white p-2.5 border-b border-stone-200 flex-shrink-0
        "
    >
        <div class="flex justify-between items-center w-full h-full">
            <h3
                class="font-bold text-sm text-gray-800 flex-grow mr-2 overflow-hidden whitespace-nowrap text-ellipsis"
            >
                {currentNode?.data?.name || "No Node Selected"}
            </h3>
            <button
                onclick={closeSidebar}
                class="
                    text-gray-500 p-1.5 bg-white rounded-full
                    hover:bg-gray-200 focus:outline-none z-50 border-none
                    md:block hidden
                "
                aria-label={$sidebarOpenStore ? "Hide sidebar" : "Show sidebar"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>

    <div class="flex-grow overflow-y-auto p-4 top-20">
        <div class="flex flex-col gap-4">
            {#each Object.entries(nodeParams) as [key, value]}
                <div class="bg-white rounded-md p-4 mb-4 shadow-sm flex-1">
                    <h3 class="font-bold text-sm mb-2 text-gray-800">
                        {$t("flow.node." + key)}
                    </h3>
                    {#if Array.isArray(value) && value.length > 0}
                        {#each value as p}
                            {#if p.key === "rule"}
                                <div class="text-sm text-gray-600 mb-2">
                                    <RichTextEditor />
                                </div>
                            {:else}
                                <div class="text-sm text-gray-600 mb-2">
                                    {p.key || "N/A"}: {p.value || "N/A"}
                                </div>
                            {/if}
                        {/each}
                    {/if}
                    <button
                        class="w-full py-1.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors duration-200"
                    >
                        Join
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>
