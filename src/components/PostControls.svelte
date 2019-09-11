<script>
  let items = [
    { value: "new", label: "New" },
    { value: "old", label: "Old" },
    { value: "alpha", label: "Alphabetical" },
    { value: "revAlpha", label: "Reverse alphabetical" },
    { value: "shuffle", label: "Shuffle" }
  ];
  export let sort;
  export let searchString;
</script>

<style>
  div.PostControls {
    background-color: #fcfcfc;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    width: 100%;
    margin-bottom: 1rem;
    box-shadow: 0px 1px 2px 0px rgba(40, 40, 40, 0.1);
  }

  div.PostControls > div.contentWrapper {
    min-height: 3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  div.PostControls > div.contentWrapper > * {
    padding: 0.75rem 2rem 0.5rem;
    border-left: 1px solid #ddd;
    margin: 0;
  }

  div.PostControls > div.contentWrapper > *:not(h2) {
    font-size: 14px;
  }

  div.PostControls > div.contentWrapper > h2 {
    padding-left: 0;
    border-left: 0;
  }

  div.PostControls > div.contentWrapper > .inputSection {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  @media screen and (max-width: 800px) {
    div.PostControls > div.contentWrapper {
      flex-direction: column;
    }
    div.PostControls > div.contentWrapper > * {
      border: none;
      padding: 0.5rem 2rem;
      text-align: center;
    }
  }
</style>

<div class="PostControls">
  <div class="contentWrapper">
    <h2>Projects</h2>
    <label class="inputSection">
      <div>Sort:</div>
      <select bind:value={sort}>
        {#each items as item}
          <option value={item.value}>{item.label}</option>
        {/each}
      </select>
    </label>
    <div class="inputSection">
      <label for="searchString">Search:&nbsp;</label>
      <input id="searchString" bind:value={searchString} type="text" />
    </div>
  </div>
</div>
