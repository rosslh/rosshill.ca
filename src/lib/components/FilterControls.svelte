<script>
  export let showCategories;
  import FilterButton from "./FilterButton.svelte";

  const toggleCategory = (category) => {
    if (showCategories.includes(category)) {
      showCategories = showCategories.filter((x) => x !== category);
    } else {
      showCategories = [...showCategories, category];
    }
  };
  $: jobActive = showCategories.includes("job");
  $: orgActive = showCategories.includes("org");
  $: projectActive = showCategories.includes("project");
</script>

<div class="filterControls">
  <FilterButton
    active={jobActive}
    callback={() => toggleCategory("job")}
    id="job">
    Work Experience
  </FilterButton>
  <FilterButton
    active={projectActive}
    callback={() => toggleCategory("project")}
    id="project">
    Projects
  </FilterButton>
  <FilterButton
    active={orgActive}
    callback={() => toggleCategory("org")}
    id="org">
    Organizations
  </FilterButton>
</div>

<style>
</style>
