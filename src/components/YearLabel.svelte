<script>
  export let year;
  export let direction;
  export let firstLabel;
  export let display;
</script>

<style>
  div.labelWrapper {
    position: relative;
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
    margin: 0 30%;
  }
  div.line > div {
    width: 50%;
    height: 80px;
  }
  div.line.right > div:first-child {
    border-left: 3px solid #444;
    border-bottom: 3px solid #444;
    border-bottom-left-radius: 100% 80px;
  }

  div.line.right > div:last-child {
    border-right: 3px solid #444;
    border-top: 3px solid #444;
    border-top-right-radius: 100% 80px;
  }

  div.line.left > div:nth-child(2) {
    border-right: 3px solid #444;
    border-bottom: 3px solid #444;
    border-bottom-right-radius: 100% 80px;
  }

  div.line.left > div:nth-child(3) {
    border-left: 3px solid #444;
    border-top: 3px solid #444;
    border-top-left-radius: 100% 80px;
  }

  span.centeredLabel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  span.yearLabel {
    background-color: white;
    padding: 0.2rem 0.75rem;
    border-radius: 3px;
    width: 5rem;
    text-align: center;
    border: 1px solid #444;
  }

  span.yearLabel.firstLabel {
    z-index: 4;
    margin-left: 30%;
    position: absolute;
    transform: translate(-50%, 0);
  }
</style>

{#if display && !firstLabel}
  <div class="labelWrapper" key={`label-${year}`}>
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
