<script>
  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  import "../global.scss";
  import "../normalize.min.css";
</script>

<ThemeSwitcher />
<div class="twoColumn">
  <Sidebar />
  <slot />
</div>
