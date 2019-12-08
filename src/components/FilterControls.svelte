<script>
  export let showCategories;
  import FilterButton from "./FilterButton.svelte";

  const toggleCategory = category => {
    if (showCategories.includes(category)) {
      showCategories = showCategories.filter(x => x !== category);
      gtag("event", "hide_category", { event_label: category });
    } else {
      showCategories = [...showCategories, category]; // push doesn't update state
      gtag("event", "show_category", { event_label: category });
    }
  };
  $: jobActive = showCategories.includes("job");
  $: orgActive = showCategories.includes("org");
  $: projectActive = showCategories.includes("project");
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
  <FilterButton
    active={orgActive}
    id="org"
    callback={() => toggleCategory('org')}>
    Organizations
  </FilterButton>
</div>
