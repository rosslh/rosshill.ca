<script lang="ts">
  import dateformat from "dateformat";
  import type { PostItem } from "$lib/types";

  export let post: PostItem;
</script>

<div class="date-string do-transition">
  {#if post.seasonal}
    Seasonal:
  {/if}
  {post.seasonal ? dateformat(post.date, "yyyy") : dateformat(post.date, "mmm yyyy")}
  {#if post.endDate}
    - {post.seasonal ? dateformat(post.endDate, "yyyy") : dateformat(post.endDate, "mmm yyyy")}
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