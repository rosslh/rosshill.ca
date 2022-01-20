<script lang="ts">
  import Code from "~icons/iconoir/code";
</script>

<div class="content-wrapper">
  <div aria-hidden="true" class="separator">
    <div class="line do-transition" />
    <div class="symbol do-transition">
      <Code />
    </div>
    <div class="line do-transition" />
  </div>
</div>

<style lang="scss">
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
        font-size: 1.2rem;
        display: inline-flex;
        align-items: center;
        color: var(--border);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .line {
        height: 1px;
        width: calc(50% - 1.5rem);
        border-bottom: 3px dotted var(--border);
      }
    }
  }

  @media (max-width: 1000px) {
    div.content-wrapper {
      display: block;
    }
  }
</style>
