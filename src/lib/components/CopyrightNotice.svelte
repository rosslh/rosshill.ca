<script lang="ts">
  import CanadianHostingBadge from "$lib/components/CanadianHostingBadge.svelte";
</script>

<footer class="transition-colors">
  <p>Copyright &copy; Ross Hill. All Rights Reserved.</p>
  <CanadianHostingBadge />
</footer>

<style lang="scss">
  footer {
    margin: var(--spacing-2xl) auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-m);

    p {
      color: var(--color-subtitle);
      font-size: var(--font-size-2xs);
    }
  }
</style>
