<script>
  import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
  import Sidebar from "../components/Sidebar.svelte";
</script>

<style>

</style>

<ThemeSwitcher />
<div class="twoColumn">
  <Sidebar />
  <slot />
</div>
