<script lang="ts">
  export let post: PostItem;

  import dateformat from "dateformat";
  
  import type { PostItem } from "$lib/types";
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