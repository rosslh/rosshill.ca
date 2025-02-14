<script>
  import MapleLeafIcon from "~icons/fa-brands/canadian-maple-leaf";
</script>

<footer class="transition-colors">
  <p class="subtitle product-of-canada">
    <MapleLeafIcon /> Product of Canada
  </p>
  <p>Copyright &copy; Ross Hill. All Rights Reserved.</p>
</footer>

<style lang="scss">
  footer {
    margin: var(--spacing-2xl) auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      color: var(--color-subtitle);
      font-size: var(--font-size-2xs);

      &.product-of-canada {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }
    }
  }
</style>
