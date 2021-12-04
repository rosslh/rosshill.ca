<script lang="ts">
  export let year: number;
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

<style>
  div.label-wrapper {
    position: relative;
    color: var(--heading);
  }

  @media (max-width: 1200px) {
    div.line,
    span.year-label {
      margin: 0 !important;
    }
  }

  div.line {
    display: flex;
    flex-wrap: wrap;
    margin: 0 25%;
  }
  div.line > div {
    width: 50%;
    height: 80px;
    border-color: var(--timeline);
  }
  div.line.ltr > div:first-child {
    border-left: 3px solid var(--timeline);
    border-bottom: 3px solid var(--timeline);
    border-bottom-left-radius: 100%;
  }

  div.line.ltr > div:last-child {
    border-right: 3px solid var(--timeline);
    border-top: 3px solid var(--timeline);
    border-top-right-radius: 100%;
  }

  div.line.rtl > div:nth-child(2) {
    border-right: 3px solid var(--timeline);
    border-bottom: 3px solid var(--timeline);
    border-bottom-right-radius: 100%;
  }

  div.line.rtl > div:nth-child(3) {
    border-left: 3px solid var(--timeline);
    border-top: 3px solid var(--timeline);
    border-top-left-radius: 100%;
  }

  span.centered-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  span.year-label {
    color: var(--heading);
    background-color: var(--panel-background);
    height: 2.2rem;
    border-radius: 0.5rem;
    width: 4.5rem;
    border: 1px solid var(--border);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
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

  span.year-label.first-label {
    z-index: 4;
    margin-left: 25%;
    position: absolute;
    transform: translate(-50%, 0);
  }
</style>
