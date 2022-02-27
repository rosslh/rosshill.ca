<script lang="ts">
  import { format } from "date-fns";
  import type { PostDate } from "$lib/types";

  export let date: PostDate;

  const startDate = new Date(date.start);
  const endDate = date.end && new Date(date.end);
</script>

<div class="date-string do-transition">
  {#if date.isSeasonal}
    Seasonal:
  {/if}
  {date.isSeasonal ? format(startDate, "y") : format(startDate, "MMM y")}
  {#if endDate}
    - {date.isSeasonal ? format(endDate, "y") : format(endDate, "MMM y")}
  {:else if date.isOngoing}
    - Present
  {/if}
</div>

<style>
  div.date-string {
    color: var(--subtitle);
    display: inline-block;
  }
</style>