<script>
  export let tagId;
  import { tagLabels } from "$lib/constants.js";

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
        width="0.85rem"
        height="0.85rem"
      />
    </picture>
  </div>
  <div class="tagLabel">{tagString}</div>
</div>

<style>
  div.tag {
    /* border: 1px solid var(--postBorder); */
    /* border-radius: 1.2rem; */
    color: var(--subtitle);
    margin: 0.2rem 0;
    margin-right: 0.4rem;
    display: flex;
    align-items: center;
    height: 1.2rem;
    padding: 0 0.3rem;
    font-size: 0.75rem;
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

  div.tagLabel {
    text-transform: capitalize;
  }
</style>
