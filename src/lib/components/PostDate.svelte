<script lang="ts">
  import { format, intervalToDuration, formatDuration } from "date-fns";
  import type { PostDate } from "$lib/types";

  export let date: PostDate;

  const getDateFromString = (d: string): Date => {
    const parts = d.slice(0, 10).split("-").map((part) => Number(part)) as [number, number, number];
    parts[1] -= 1; // month is 0-indexed
    return new Date(...parts);
  };

  const startDate = getDateFromString(date.start);
  const endDate = date.end && getDateFromString(date.end);
  
  let duration: string;

  const currentDate = new Date();
  const isStartInFuture = startDate > currentDate;
  const isDateRangeShown = endDate || (date.isOngoing && !isStartInFuture);
  if (isDateRangeShown && !date.isSeasonal) {
    const interval = intervalToDuration({ start: startDate, end: endDate ?? currentDate });

    if (interval.days >= 15) {
      interval.months += 1;
    }

    duration = formatDuration(interval, { format: ["years", "months"] });
  }
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