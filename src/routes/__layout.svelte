<script>
  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";

  import "../global.scss";
  import "../normalize.min.css";
</script>

<ThemeSwitcher />
<div class="twoColumn">
  <Sidebar />
  <div>
    <slot />
    <CopyrightNotice />
  </div>
</div>
