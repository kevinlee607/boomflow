<script lang="ts">
    import { t } from "$lib/translations";
    import "../app.css";
    let { children } = $props();
</script>

<div class="centainer max-auto px-4">
    <main class="main-container">
        <div class="flex-header-container">
            <div class="logo-home-place">
                <a href="/" class="logo-link">
                    <img src="./logo.png" alt="Logo" class="logo-image" />
                </a>
            </div>
            <div class="flex-top-search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    class="search-input"
                />
            </div>
        </div>
        <div class="flex-main-container">
            <div class="flex-left-nav-container">
                <li>
                    <a href="/"> home </a>
                </li>
                <li>
                    <a href="/flow">flow</a>
                </li>
            </div>
            <div class="main-content-container">
                {@render children()}
            </div>
        </div>
    </main>
</div>
