<script>
  export let tagId;
  import { tagLabels } from "$lib/constants.js";
  import { remsToPixels } from "$lib/functions.js";

  $: tagString = tagLabels[tagId] || tagId;
</script>

<span class="tag doTransition">
  <span class="logoWrapper">
    <picture class="fixedSize">
      <source srcset="/tags/{tagId}.webp" type="image/webp" />
      <source srcset="/tags/{tagId}.png" type="image/png" />
      <img
        src="/tags/{tagId}.png"
        alt=""
        loading="lazy"
        width={remsToPixels(0.85)}
        height={remsToPixels(0.85)}
      />
    </picture>
  </span>
  <span class={tagString === tagId ? "capitalize" : ""}>{tagString}</span>
</span>

<style>
  .tag {
    color: var(--subtitle);
    margin: 0.2rem 0.1rem 0.2rem 0;
    display: flex;
    align-items: center;
    height: 1.2rem;
    padding: 0 0.3rem;
    font-size: 0.8rem;
  }

  .logoWrapper {
    border-radius: 50%;
    overflow: hidden;
    height: 0.85rem;
    width: 0.85rem;
    margin-right: 0.25rem;
  }

  .logoWrapper * {
    height: 100%;
    width: 100%;
    display: block;
  }

  .capitalize {
    text-transform: capitalize;
  }
</style>
