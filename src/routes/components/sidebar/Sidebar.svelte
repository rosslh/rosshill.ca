<script lang="ts">
  import { onMount } from "svelte";
  import { remsToPixels } from "$lib/functions";
  import Separator from "./Separator.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";

  let imgLoaded = false;
  onMount(() => {
    const imgElement = document.querySelector("img[data-testid='headshot-img']");
    imgElement.addEventListener("load", () => {
      imgLoaded = true;
    });
  });
</script>

<div class="sidebar do-transition" data-testid="sidebar">
  <div class="sidebar-content">
    <div class="img-wrapper">
      <picture class="fixed-size">
        <source srcset="/headshot.webp" type="image/webp"/>
        <source srcset="/headshot.jpg" type="image/png"/>
        <img
          alt="Antoine Greuzard"
          data-testid="headshot-img"
          height={remsToPixels(13)}
          src="/headshot.jpg"
          width={remsToPixels(13)}
        />
      </picture>
    </div>
    <h1>
      Antoine Greuzard
    </h1>
    <p class="subtitle role do-transition" data-testid="job-title">Développeur web</p>
    <p class="subtitle email">
      <a data-testid="email-address" href="mailto:antoine@antoinegreuzard">antoine@antoinegreuzard.fr</a>
    </p>
    <p class="subtitle">
      <a data-testid="github-link" href="https://github.com/antoinegreuzard" rel="noopener noreferrer"
         target="_blank">
        GitHub
      </a>
      <InlineSeparator />
      <a data-testid="linkedin-link" href="https://www.linkedin.com/in/antoine-greuzard" rel="noopener noreferrer"
         target="_blank">
        LinkedIn
      </a>
      <InlineSeparator />
      <a data-testid="resume-link" href="https://join.skype.com/invite/esIrFNeiMirt" rel="noopener noreferrer"
         target="_blank">
        Skype
      </a>
    </p>
  </div>
  <Separator />
</div>

<style lang="scss">
  div.sidebar {
    z-index: 10;
    border-right: 1px solid var(--border);
    background-color: var(--panel-background);

    div.sidebar-content {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100vh;

      h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        height: 5.5rem;
        margin-top: 0.8rem;
        margin-bottom: -1rem;
        padding-bottom: 0;
        text-align: center;
      }

      p.subtitle {
        margin-top: 1rem;

        &.role {
          font-size: 1.3rem;
          color: var(--heading);
        }
      }

      div.img-wrapper {
        overflow: hidden;
        width: 10.5rem;
        min-width: 10.5rem;
        height: 10.5rem;
        min-height: 10.5rem;
        margin-top: -4.5rem;
        border-radius: 50%;

        * {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  @media (max-width: 800px) {
    div.sidebar {
      padding: 1.5rem 1.5rem 0;
      border-width: 0;
      background-color: var(--background);

      div.sidebar-content {
        position: initial !important;
        height: unset !important;
        padding: 2rem 0 3.5rem;

        div.img-wrapper {
          margin-top: 0 !important;
        }
      }
    }
  }
</style>
