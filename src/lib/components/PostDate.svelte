<script lang="ts">
  import {
    endOfMonth,
    format,
    formatDuration,
    intervalToDuration,
    parse,
    startOfMonth,
  } from "date-fns";
  import { fr } from "date-fns/locale";
  import type { PostDate } from "$lib/types";

  export let date: PostDate = {
    start: "",
    end: "",
    isOngoing: false,
    isSeasonal: false,
  };
  const getDateFromString = (d: string): Date =>
    parse(d.slice(0, 10), "yyyy-MM-dd", new Date());
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
    const interval = intervalToDuration({
      start: startDate,
      end: endDate || currentDate,
    });
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
    return formatDuration(interval, {
      format: ["années  ", "mois"],
    });
  }

  const duration = getDuration();
</script>

<div class="date-string transition-colors">
  {#if date.isSeasonal}
    Saison:
  {/if}
  {#if isStartInFuture}
    Début:
  {/if}
  {date.isSeasonal
    ? format(startDate, "y", { locale: fr })
    : format(startDate, "MMM y", { locale: fr })}
  {#if !isStartInFuture}
    {#if endDate}
      &ndash; {date.isSeasonal
        ? format(endDate, "y", { locale: fr })
        : format(endDate, "MMM y", { locale: fr })}
    {:else if date.isOngoing}
      &ndash; Aujourd'hui
    {/if}
    {#if duration}
      ({duration})
    {/if}
  {/if}
</div>

<style>
  div.date-string {
    display: inline-block;
    color: var(--color-subtitle);
  }
</style>
