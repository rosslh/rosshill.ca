<script lang="ts">
  export let post: PostItem;

  import { format } from "date-fns";
  
  import type { PostItem } from "$lib/types";

  const date = new Date(post.date);
  const endDate = new Date(post.endDate);
</script>

<div class="date-string do-transition">
  {#if post.seasonal}
    Seasonal:
  {/if}
  {post.seasonal ? format(date, "y") : format(date, "MMM y")}
  {#if post.endDate}
    - {post.seasonal ? format(endDate, "y") : format(endDate, "MMM y")}
  {:else if post.ongoing}
    - Present
  {/if}
</div>

<style>
  div.date-string {
    color: var(--subtitle);
    display: inline-block;
  }
</style>