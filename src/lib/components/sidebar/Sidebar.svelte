<script lang="ts">
  import { remsToPixels } from "$lib/functions";
  import Separator from "./Separator.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
</script>

<div class="sidebar transition-colors" data-testid="sidebar">
  <div class="sidebar-content">
    <div class="img-wrapper">
      <picture class="fixed-size">
        <source srcset="/headshot.webp" type="image/webp" />
        <source srcset="/headshot.jpg" type="image/png" />
        <img
          alt="Antoine Greuzard"
          data-testid="headshot-img"
          height={remsToPixels(13)}
          loading="eager"
          src="/headshot.jpg"
          width={remsToPixels(13)}
        />
      </picture>
    </div>
    <div class="name-wrapper">Antoine Greuzard</div>
    <p class="subtitle role transition-colors" data-testid="job-title">
      Développeur web
    </p>
    <p class="subtitle email">
      <a data-testid="email-address" href="mailto:antoine@antoinegreuzard">
        antoine@antoinegreuzard.fr
      </a>
    </p>
    <p class="subtitle">
      <a
        data-testid="github-link"
        href="https://github.com/antoinegreuzard"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
      <InlineSeparator />
      <a
        data-testid="linkedin-link"
        href="https://www.linkedin.com/in/antoine-greuzard"
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <InlineSeparator />
      <a
        data-testid="resume-link"
        href="https://join.skype.com/invite/esIrFNeiMirt"
        rel="noopener noreferrer"
        target="_blank"
      >
        Skype
      </a>
    </p>
  </div>
  <Separator />
</div>

<style lang="scss">
  @import "src/lib/styles/media-queries";

  div.sidebar {
    border-right: 1px solid var(--color-border);
    background-color: var(--color-panel-background);
    z-index: 10;
    text-align: center;

    div.sidebar-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      position: sticky;
      top: 0;

      .name-wrapper {
        padding-bottom: 0;
        height: 5.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xl);
        font-weight: 700;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      p.subtitle {
        margin-top: var(--spacing-m);

        &.role {
          margin-top: var(--spacing-s);
          font-size: var(--font-size-m);
          color: var(--color-foreground);
        }
      }

      div.img-wrapper {
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;
        margin-top: calc(-1 * var(--spacing-3xl));
        overflow: hidden;

        picture {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;

          * {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: var(--border-radius-m);
            border: 3px solid var(--color-border);
          }
        }
      }
    }
  }

  @media (max-width: $breakpoint-s-max) {
    div.sidebar {
      border-width: 0;
      padding: var(--spacing-xl) var(--spacing-xl) 0;
      background-color: var(--color-background);

      div.sidebar-content {
        height: unset !important;
        padding: var(--spacing-2xl) 0 var(--spacing-3xl);
        position: initial !important;

        div.img-wrapper {
          margin-top: 0 !important;
        }
      }
    }
  }
</style>
