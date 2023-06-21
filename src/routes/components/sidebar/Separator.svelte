<script lang="ts">
  import Code from "~icons/iconoir/code";
</script>

<div class="content-wrapper">
  <div aria-hidden="true" class="separator">
    <div class="line do-transition"></div>
    <div class="symbol do-transition">
      <Code />
    </div>
    <div class="line do-transition"></div>
  </div>
</div>

<style lang="scss">
  div.content-wrapper {
    display: none;

    div.separator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 75%;
      height: 3rem;
      margin: 0 auto;

      .symbol {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--border);
      }

      .line {
        width: calc(50% - 1.5rem);
        height: 1px;
        border-bottom: 3px dotted var(--border);
      }
    }
  }

  @media (max-width: 800px) {
    div.content-wrapper {
      display: block;
    }
  }
</style>
