<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import { t } from "$lib/translations";

    export const operator: Map<string, Array<string>> = new Map([
        [
            "operator",
            [
                " + ",
                " - ",
                " * ",
                " / ",
                " > ",
                " < ",
                " >= ",
                " <= ",
                " ∈ ",
                " ∉ ",
                " == ",
                " != ",
                " || ",
                " && ",
                '"',
            ],
        ],
        [
            "BBQ",
            [
                "BBQ",
                "BBQ-1",
                "BBQ-2",
                "BBQ-3",
                "BBQ-4",
                "BBQ-5",
                "BBQ-6",
                "BBQ-7",
            ],
        ],
    ]);

    let editorDiv: HTMLDivElement; // Reference to the editable div
    let editor: Editor | null = null; // Tiptap Editor instance
    export let content: string = "<p>Hello, <b>Tiptap</b>!</p>"; // Initial content, can be passed as a prop

    onMount(() => {
        editor = new Editor({
            element: editorDiv,
            extensions: [StarterKit],
            content: content,
            onUpdate: ({ editor }) => {
                content = editor.getHTML(); // Update the content variable on editor changes
            },
        });
    });

    onDestroy(() => {
        editor?.destroy(); // Clean up editor instance on component unmount
    });

    function insertContent(text: string) {
        editor?.chain().focus().insertContent(text).run();
    }
</script>

<div class="rounded-md bg-white p-2 gap-2">
    {#each operator.entries() as [key, value]}
        {console.log(key, value)}
        <div class="flex space-x-2 mb-2 p-1 border-b border-gray-200">
            <div class="bg-white rounded-md p-0 flex-1">
                <h3 class="font-bold text-sm mb-2 text-gray-800">
                    {$t("flow.richTextEditor." + key)}
                </h3>
            </div>
        </div>
        {#each value as i}
            <button
                on:click={() => insertContent(`${i}`)}
                class="pt-1 pb-1 pl-3 pr-3 rounded-md bg-green-100 text-gray-500 hover:bg-green-300 transition-colors"
            >
                {i}
            </button>
        {/each}
    {/each}
    <div class="flex space-x-2 mb-2 p-1 border-b border-gray-200">
        <div class="bg-white rounded-md p-0 flex-1">
            <h3 class="font-bold text-sm mb-2 text-gray-800">
                {$t("flow.richTextEditor.inputName")}
            </h3>
        </div>
    </div>
    <div
        bind:this={editorDiv}
        class="ProseMirror min-h-[50px] p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></div>

    <div class="mt-4 p-2 bg-gray-50 rounded text-sm text-gray-700">
        <h3 class="font-semibold mb-1">Current HTML:</h3>
        <pre class="whitespace-pre-wrap break-all">{content}</pre>
    </div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
</style>
