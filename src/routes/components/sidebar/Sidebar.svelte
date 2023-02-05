<script lang="ts">
  import { remsToPixels } from "$lib/functions";
  import Separator from "./Separator.svelte";
  import AnimatedName from "./AnimatedName.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
</script>

<div class="sidebar do-transition" data-testid="sidebar">
  <div class="sidebar-content">
    <div class="img-wrapper">
      <picture class="fixed-size">
        <source srcset="/headshot.webp" type="image/webp" />
        <source srcset="/headshot.png" type="image/png" />
        <img
          data-testid="headshot-img"
          src="/headshot.png"
          alt="Ross Hill"
          width={remsToPixels(10)}
          height={remsToPixels(10)} />
      </picture>
    </div>
    <h1>
      <AnimatedName />
    </h1>
    <p class="subtitle role do-transition" data-testid="job-title">Software Developer</p>
    <p class="subtitle email">
      <a href="mailto:ross@rosshill.ca" data-testid="email-address">ross@rosshill.ca</a>
    </p>
    <p class="subtitle">
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/rosslh" data-testid="github-link">
        GitHub
      </a>
      <InlineSeparator />
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/rosslh" data-testid="linkedin-link">
        LinkedIn
      </a>
      <InlineSeparator />
      <a href="/Ross%20Hill.pdf" target="_blank" rel="noopener noreferrer" data-testid="resume-link">
        Resume
      </a>
    </p>
  </div>
  <Separator />
</div>

<style lang="scss">
  div.sidebar {
    border-right: 1px solid var(--border);
    background-color: var(--panel-background);
    z-index: 10;

    div.sidebar-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      position: sticky;
      top: 0;

      h1 {
        margin-top: 0.8rem;
        margin-bottom: -1rem;
        padding-bottom: 0;
        height: 5.5rem;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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
        border-radius: 50%;
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;
        margin-top: -4.5rem;

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
      border-width: 0;
      padding: 1.5rem 1.5rem 0;
      background-color: var(--background);

      div.sidebar-content {
        height: unset !important;
        padding: 2rem 0 3.5rem;
        position: initial !important;

        div.img-wrapper {
          margin-top: 0 !important;
        }
      }
    }
  }
</style>
