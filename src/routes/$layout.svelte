<script>
  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<style>

</style>

<ThemeSwitcher />
<div class="twoColumn">
  <Sidebar />
  <slot />
</div>
