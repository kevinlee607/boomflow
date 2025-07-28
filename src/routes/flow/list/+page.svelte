<script lang="ts">
    import { getList } from "$lib/flow/initList";
    import { type flowList } from "$lib/api/flow/schema/list";
    import { t } from "$lib/translations";
    let fList = $state.raw<flowList>(getList());

    import { goto } from "$app/navigation";
    function openFlowDetails(flowID: string) {
        // Handle row click, e.g., navigate to flow details
        goto(`/flow/detail/${flowID}`);
    }
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-gray-100 w-7/8">
    <div class="flex-grow p-4 md:w-3/4 lg:w-4/5">
        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <h3>
                <span class="text-lg font-semibold text-gray-800">
                    {$t("flow.flowList.title")}
                </span>
            </h3>
            <div class="overflow-auto max-h-svh">
                <table class="w-full">
                    <thead class="bg-gray-200">
                        <tr class="border-b border-gray-200">
                            <th
                                class="text-left text-sm font-bold text-gray-900 py-2 px-4 whitespace-nowrap"
                            >
                                {$t("flow.flowList.pid")}
                            </th>
                            <th
                                class="text-left text-sm font-bold text-gray-900 py-2 px-4 whitespace-nowrap"
                            >
                                {$t("flow.flowList.appID")}
                            </th>
                            <th
                                class="text-left text-sm font-bold text-gray-900 py-2 px-4 whitespace-nowrap"
                            >
                                {$t("flow.flowList.displayName")}
                            </th>
                            <th
                                class="text-left text-sm font-bold text-gray-900 py-2 px-4 whitespace-nowrap"
                            >
                                {$t("flow.flowList.creatorID")}
                            </th>
                            <th
                                class="text-left text-sm font-bold text-gray-900 py-2 px-4 whitespace-nowrap"
                            >
                                {$t("flow.flowList.createdAt")}
                            </th>
                            <th
                                class="text-left text-sm font-bold text-gray-900 py-2 px-4 whitespace-nowrap"
                            >
                                {$t("flow.flowList.updatedAt")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if fList?.data?.pipeline_outline}
                            {#each fList.data.pipeline_outline as flow}
                                <tr
                                    class="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                    onclick={() => {
                                        openFlowDetails(flow.name);
                                    }}
                                >
                                    <td
                                        class="py-3 px-4 text-sm text-gray-800 whitespace-nowrap"
                                    >
                                        {flow.name || "N/A"}
                                    </td>
                                    <td
                                        class="py-3 px-4 text-sm text-gray-600 whitespace-nowrap"
                                    >
                                        {flow.appID || "N/A"}
                                    </td>
                                    <td
                                        class="py-3 px-4 text-sm text-gray-600 whitespace-nowrap"
                                    >
                                        {flow.displayName || "N/A"}
                                    </td>
                                    <td
                                        class="py-3 px-4 text-sm text-gray-600 whitespace-nowrap"
                                    >
                                        {flow.creatorID || "N/A"}
                                    </td>
                                    <td
                                        class="py-3 px-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {flow.createdAt
                                            ? new Date(
                                                  flow.createdAt,
                                              ).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td
                                        class="py-3 px-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {flow.updatedAt
                                            ? new Date(
                                                  flow.updatedAt,
                                              ).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <aside class="right-sidebar p-4 md:w-1/4 lg:w-1/5 bg-gray-50 flex-shrink-0">
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
