<script lang="ts">
    import Languages from "$lib/components/Languages.svelte";
    import { t } from "$lib/translations";
    // You might need to import your global app.css here if it's not already imported in a layout.
    // import "../app.css";
</script>

<div class="flex flex-col md:flex-row min-h-screen bg-gray-100 w-7/8">
    <div class="flex-grow p-4 md:w-3/4 lg:w-4/5">
        <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                Welcome to SvelteKit
            </h1>
            <p class="text-gray-700">
                Visit
                <a
                    href="https://svelte.dev/docs/kit"
                    class="text-blue-600 hover:underline">svelte.dev/docs/kit</a
                >
                to read the documentation.
            </p>
            <div class="mt-4">
                <Languages />
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-2">More Content Section</h2>
            <p class="text-gray-600">
                This is another section of your main content area.
            </p>
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
