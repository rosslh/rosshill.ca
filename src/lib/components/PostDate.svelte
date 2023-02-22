<script lang="ts">
  import {
    format,
    formatDuration,
    intervalToDuration,
    parse,
    startOfMonth,
    endOfMonth,
  } from "date-fns";
  import type { PostDate } from "$lib/types";

  export let date: PostDate;

  const getDateFromString = (d: string): Date => parse(d.slice(0, 10), "yyyy-MM-dd", new Date());

  const startDate = startOfMonth(getDateFromString(date.start));
  const endDate = date.end && endOfMonth(getDateFromString(date.end));
  
  const currentDate = new Date();
  const isStartInFuture = startDate > currentDate;

  function getDuration(): string | null {
    if (isStartInFuture) {
      return null;
    }

    if (!(endDate || date.isOngoing)) {
      return null;
    }
    
    if (date.isSeasonal) {
      return null;
    }

    const interval = intervalToDuration({ start: startDate, end: endDate || currentDate });

    if (interval.days && interval.days >= 15) {
      interval.months = interval.months ? interval.months + 1 : 1;

      if (interval.months === 12) {
        interval.years = interval.years ? interval.years + 1 : 1;
        interval.months -= 12;
      }
    }

    if (!(interval.years || interval.months)) {
      interval.months = 1;
    }

    return formatDuration(interval, { format: ["years", "months"] });
  }

  const duration = getDuration();
</script>

<div class="date-string do-transition">
  {#if date.isSeasonal}
    Seasonal:
  {/if}
  {#if isStartInFuture}
    Starting:
  {/if}
  {date.isSeasonal ? format(startDate, "y") : format(startDate, "MMM y")}
  {#if !isStartInFuture}
    {#if endDate}
      &ndash; {date.isSeasonal ? format(endDate, "y") : format(endDate, "MMM y")}
    {:else if date.isOngoing}
      &ndash; Present
    {/if}
    {#if duration}
      ({duration})
    {/if}
  {/if}
</div>

<style>
  div.date-string {
    color: var(--subtitle);
    display: inline-block;
  }
</style>