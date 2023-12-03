<script lang="ts">
  import Code from "~icons/iconoir/code";
</script>

<div class="content-wrapper">
  <div aria-hidden="true" class="separator">
    <div class="line transition-colors" />
    <div class="symbol transition-colors">
      <Code />
    </div>
    <div class="line transition-colors" />
  </div>
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.content-wrapper {
    display: none;

    div.separator {
      width: 75%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;

      .symbol {
        font-size: var(--font-size-m);
        align-items: center;
        color: var(--color-border);
        display: flex;
        justify-content: center;
      }

      .line {
        height: 1px;
        width: calc(50% - 1.5rem);
        border-bottom: 3px dotted var(--color-border);
      }
    }
  }

  @media (max-width: $breakpoint-m-max) {
    div.content-wrapper {
      display: block;
    }
  }
</style>
