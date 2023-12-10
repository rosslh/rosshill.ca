<script lang="ts">
  import { remsToPixels } from "$lib/functions";
  import Separator from "./Separator.svelte";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
  import { addDays, endOfDay, startOfDay } from "date-fns";

  import { occasions } from "$lib/occasions";

  const today = new Date(
    new Date().toLocaleString(undefined, { timeZone: "America/Toronto" }),
  );
  const currentYear = today.getFullYear();
  const currentOccasion = occasions.find(
    ({ startDay, startMonth, durationDays }) => {
      const startDate = startOfDay(
        new Date(currentYear, startMonth - 1, startDay),
      );
      const endDate = endOfDay(addDays(startDate, durationDays - 1));
      return today >= startDate && today <= endDate;
    },
  );
</script>

<div class="sidebar transition-colors" data-testid="sidebar">
  <div class="sidebar-content">
    {#if !currentOccasion || currentOccasion.imageName}
      <div
        class="img-wrapper transition-colors"
        class:rounded={!currentOccasion}
      >
        {#if currentOccasion?.imageName}
          <picture data-testid="occasion-image-{currentOccasion.name}">
            <source
              srcset="/occasions/{currentOccasion.imageName}.webp"
              type="image/webp"
            />
            <source
              srcset="/occasions/{currentOccasion.imageName}.png"
              type="image/png"
            />
            <img
              data-testid="headshot-image"
              src="/occasions/{currentOccasion.imageName}.png"
              alt={currentOccasion.name}
              title={currentOccasion.name}
              width={remsToPixels(10)}
              height={remsToPixels(10)}
            />
          </picture>
        {:else}
          <picture>
            <source srcset="/headshot.webp" type="image/webp" />
            <source srcset="/headshot.jpg" type="image/jpeg" />
            <img
              data-testid="headshot-image"
              src="/headshot.jpg"
              alt="Ross Hill"
              width={remsToPixels(10)}
              height={remsToPixels(10)}
            />
          </picture>
        {/if}
      </div>
    {/if}
    {#if currentOccasion?.blurb}
      <p
        class="occasion-blurb"
        data-testid="occasion-blurb-{currentOccasion.name}"
        style:max-width={currentOccasion.blurbMaxWidth}
      >
        {currentOccasion.blurb}
        {#if currentOccasion.learnMoreUrl}
          <a
            href={currentOccasion.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more.
          </a>
        {/if}
      </p>
    {/if}
    <div class="name-wrapper">
      <h1 class="transition-colors">Ross Hill</h1>
    </div>
    <p class="subtitle role transition-colors" data-testid="job-title">
      Software Engineer
    </p>
    <p class="subtitle email">
      <a href="mailto:ross@rosshill.ca" data-testid="email-address">
        ross@rosshill.ca
      </a>
    </p>
    <p class="subtitle">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/rosslh"
        data-testid="github-link"
      >
        GitHub
      </a>
      <InlineSeparator />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/rosslh"
        data-testid="linkedin-link"
      >
        LinkedIn
      </a>
      <InlineSeparator />
      <a
        href="/Ross%20Hill.pdf"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="resume-link"
      >
        Resume
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
      gap: var(--spacing-xl);

      .occasion-blurb {
        text-align: center;
        margin-top: calc(var(--spacing-s) * -1);
        max-width: 20rem;
        width: 100%;
        color: var(--color-subtitle);
      }

      .name-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        h1 {
          letter-spacing: 0.05rem;
          margin: 0;
          line-height: 1;
        }
      }

      p.subtitle {
        &.role {
          font-size: var(--font-size-m);
          color: var(--color-foreground);
        }
      }

      div.img-wrapper {
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;

        &.rounded {
          overflow: hidden;
          border-radius: 50%;
          border: 3px solid var(--color-border);
        }

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
          }
        }
      }
    }
  }

  @media (max-width: $breakpoint-m-max) {
    div.sidebar {
      border-width: 0;
      padding: var(--spacing-xl) var(--spacing-xl) 0;
      background-color: var(--color-background);

      div.sidebar-content {
        height: unset !important;
        padding: var(--spacing-2xl) 0 var(--spacing-3xl);
        position: initial !important;
      }
    }
  }
</style>
