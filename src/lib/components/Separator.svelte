<script lang="ts">
  import Code from "~icons/iconoir/code";
</script>

<div class="contentWrapper">
  <div aria-hidden="true" class="separator">
    <div class="line doTransition" />
    <div class="symbol doTransition">
      <Code />
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
    div.contentWrapper {
      display: none;
    }
  }
</style>
