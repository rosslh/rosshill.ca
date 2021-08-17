<script>
  export let tagId;
  import { tagLabels } from "$lib/constants.js";
  import { remsToPixels } from "$lib/functions.js";

  $: tagString = tagLabels[tagId] || tagId;
</script>

<div class="tag doTransition">
  <div class="logoWrapper">
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
  </div>
  <div class={tagString === tagId ? "capitalize" : ""}>{tagString}</div>
</div>

<style>
  div.tag {
    color: var(--subtitle);
    margin: 0.2rem 0.1rem 0.2rem 0;
    display: flex;
    align-items: center;
    height: 1.2rem;
    padding: 0 0.3rem;
    font-size: 0.8rem;
  }

  div.logoWrapper {
    border-radius: 50%;
    overflow: hidden;
    height: 0.85rem;
    width: 0.85rem;
    margin-right: 0.2rem;
  }

  div.logoWrapper * {
    height: 100%;
    width: 100%;
    display: block;
  }

  div.capitalize {
    text-transform: capitalize;
  }
</style>
