<script>
  import DiCode from "~icons/iconoir/code";
  export let intro;
</script>

<div class="contentWrapper {intro ? 'intro' : ''}">
  <div aria-hidden="true" class="separator">
    <div class="line doTransition" />
    <div class="symbol doTransition">
      <DiCode />
    </div>
    <div class="line doTransition" />
  </div>
</div>

<style>
  div.separator {
    width: 75%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
  }

  div.separator .symbol {
    font-size: 1.2rem;
    display: inline-flex;
    align-items: center;
    color: var(--postBorder);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.separator .line {
    height: 1px;
    width: calc(50% - 1.5rem);
    border-bottom: 3px dotted var(--postBorder);
  }
  @media (min-width: 1000px) {
    div.contentWrapper.intro {
      display: none;
    }
  }
</style>
