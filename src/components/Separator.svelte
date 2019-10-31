<script>
  export let intro;
</script>

<style>
  div.separator {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.separator .symbol {
    font-family: "Heebo", sans-serif;
    font-weight: normal;
    font-size: 0.9rem;
    color: #ccc;
  }

  div.separator .line {
    height: 1px;
    width: calc(50% - 2rem);
    border-bottom: 2px dotted #ccc;
  }
  @media (min-width: 1000px) {
    div.separator.intro {
      display: none;
    }
  }
</style>

<div aria-hidden="true" class="separator {intro ? 'intro' : ''}">
  <div class="line" />
  <div class="symbol">§</div>
  <div class="line" />
</div>
