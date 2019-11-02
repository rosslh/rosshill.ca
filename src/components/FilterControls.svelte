<script>
  export let showCategories;
  import FilterButton from "./FilterButton.svelte";

  const toggleCategory = category => {
    if (showCategories.includes(category)) {
      showCategories = showCategories.filter(x => x !== category);
    } else {
      showCategories = [...showCategories, category]; // push doesn't update state
    }
  };
  $: jobActive = showCategories.includes("job");
  $: ecActive = showCategories.includes("ec");
  $: projectActive = showCategories.includes("project");
  $: otherActive = showCategories.includes("other");
</script>

<style>

</style>

<div class="filterControls">
  <FilterButton
    active={jobActive}
    id="job"
    callback={() => toggleCategory('job')}>
    Work experience
  </FilterButton>
  <FilterButton
    active={projectActive}
    id="project"
    callback={() => toggleCategory('project')}>
    Projects
  </FilterButton>
  <FilterButton active={ecActive} id="ec" callback={() => toggleCategory('ec')}>
    Extracurriculars
  </FilterButton>
</div>
