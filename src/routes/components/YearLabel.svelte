<script lang="ts">
  export let year: string;
  export let isRightToLeft: boolean;
  export let isFirstLabel: boolean;

</script>

<div class="label-wrapper do-transition">
  <span class="year-label do-transition {isFirstLabel ? 'first-label' : 'centered-label'}">
    {year}
  </span>
  {#if !isFirstLabel}
    <div aria-hidden="true" class="line {isRightToLeft ? 'rtl' : 'ltr'}">
      <div class="do-transition" />
      <div class="do-transition" />
      <div class="do-transition" />
      <div class="do-transition" />
    </div>
  {/if}
</div>

<style lang="scss">
  div.label-wrapper {
    position: relative;
    color: var(--heading);

    div.line {
      display: flex;
      flex-wrap: wrap;
      margin: 0 25%;

      > div {
        width: 50%;
        height: 80px;
        border-color: var(--timeline);
      }

      &.ltr {
        > div:first-child {
          border-bottom: 3px solid var(--timeline);
          border-left: 3px solid var(--timeline);
          border-bottom-left-radius: 100%;
        }

        > div:last-child {
          border-top: 3px solid var(--timeline);
          border-right: 3px solid var(--timeline);
          border-top-right-radius: 100%;
        }
      }

      &.rtl {
        > div:nth-child(2) {
          border-right: 3px solid var(--timeline);
          border-bottom: 3px solid var(--timeline);
          border-bottom-right-radius: 100%;
        }

        > div:nth-child(3) {
          border-top: 3px solid var(--timeline);
          border-left: 3px solid var(--timeline);
          border-top-left-radius: 100%;
        }
      }
    }

    span.year-label {
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.5rem;
      height: 2.2rem;
      color: var(--heading);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      background-color: var(--panel-background);

      &.centered-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &.first-label {
        position: absolute;
        z-index: 4;
        margin-left: 25%;
        transform: translate(-50%, 0);
      }
    }
  }

  @media (max-width: 1200px) {
    div.line,
    span.year-label {
      margin: 0 !important;
    }
  }

  @media (max-width: 699px) {
    span.year-label.first-label {
      transform: translate(-10%, 0) !important;
    }
  }

  @media (min-width: 700px) and (max-width: 1200px) {
    span.year-label.first-label {
      transform: translate(-30%, 0) !important;
    }
  }
</style>
