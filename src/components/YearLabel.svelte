<script>
  export let year;
  export let direction;
  export let firstLabel;
  export let display;
</script>

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
  }
  div.line.right > div:first-child {
    border-left: 3px solid var(--timeline);
    border-bottom: 3px solid var(--timeline);
    border-bottom-left-radius: 100% 80px;
  }

  div.line.right > div:last-child {
    border-right: 3px solid var(--timeline);
    border-top: 3px solid var(--timeline);
    border-top-right-radius: 100% 80px;
  }

  div.line.left > div:nth-child(2) {
    border-right: 3px solid var(--timeline);
    border-bottom: 3px solid var(--timeline);
    border-bottom-right-radius: 100% 80px;
  }

  div.line.left > div:nth-child(3) {
    border-left: 3px solid var(--timeline);
    border-top: 3px solid var(--timeline);
    border-top-left-radius: 100% 80px;
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
    border: 1px solid var(--timeline);
    display: flex;
    justify-content: center;
    align-items: center;
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

{#if display && !firstLabel}
  <div class="labelWrapper">
    <span class="yearLabel centeredLabel">{year}</span>
    <div aria-hidden="true" class={`line ${direction ? 'left' : 'right'}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
{:else if display && firstLabel}
  <div class="labelWrapper">
    <span class="yearLabel firstLabel">{year}</span>
  </div>
{/if}
