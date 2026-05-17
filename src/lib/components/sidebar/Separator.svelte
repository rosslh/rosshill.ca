<script lang="ts">
  import Code from "~icons/ci/code";
</script>

<div class="content-wrapper">
  <div aria-hidden="true" class="separator">
    <div class="line transition-colors"></div>
    <div class="symbol transition-colors">
      <Code />
    </div>
    <div class="line transition-colors"></div>
  </div>
</div>

<style lang="scss">
  @use "src/lib/styles/breakpoints";

  div.content-wrapper {
    display: none;

    div.separator {
      width: 75%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: var(--spacing-3xl);

      .symbol {
        font-size: var(--font-size-m);
        align-items: center;
        color: var(--color-border);
        display: flex;
        justify-content: center;
      }

      .line {
        height: 1px;
        width: calc(50% - var(--spacing-l));
        border-bottom: 3px dotted var(--color-border);
      }
    }
  }

  @media (max-width: breakpoints.$breakpoint-m-max) {
    div.content-wrapper {
      display: block;
    }
  }
</style>
