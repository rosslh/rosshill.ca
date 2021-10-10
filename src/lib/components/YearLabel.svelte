<script>
  export let year;
  export let rightToLeft;
  export let firstLabel;
  export let display;
</script>

{#if display}
  <div class="labelWrapper doTransition">
    <span class="yearLabel doTransition {firstLabel ? 'firstLabel' : 'centeredLabel'}">
      {year}
    </span>
    {#if !firstLabel}
      <div aria-hidden="true" class="line {rightToLeft ? 'rtl' : 'ltr'}">
        <div class="doTransition" />
        <div class="doTransition" />
        <div class="doTransition" />
        <div class="doTransition" />
      </div>
    {/if}
  </div>
{/if}

<style>
  div.labelWrapper {
    position: relative;
    color: var(--foreground);
  }

  @media (max-width: 1200px) {
    div.line,
    span.yearLabel {
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

  span.centeredLabel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  span.yearLabel {
    color: var(--foreground);
    background-color: var(--postBackground);
    height: 2.2rem;
    border-radius: 0.5rem;
    width: 5rem;
    border: 1px solid var(--postBorder);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }

  @media (max-width: 700px) {
    span.yearLabel.firstLabel {
      transform: translate(-10%, 0) !important;
    }
  }

  @media (min-width: 701px) and (max-width: 1200px) {
    span.yearLabel.firstLabel {
      transform: translate(-30%, 0) !important;
    }
  }

  span.yearLabel.firstLabel {
    z-index: 4;
    margin-left: 25%;
    position: absolute;
    transform: translate(-50%, 0);
  }
</style>
