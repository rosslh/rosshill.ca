<script lang="ts">
  import { addDays, endOfDay, startOfDay } from "date-fns";

  import { remsToPixels } from "$lib/functions";
  import InlineSeparator from "$lib/components/InlineSeparator.svelte";
  import { occasions } from "$lib/occasions";

  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Toronto" }),
  );

  const currentYear = today.getFullYear();

  const currentOccasion = occasions
    .filter(({ startDay, startMonth, durationDays }) => {
      const startDate = startOfDay(
        new Date(currentYear, startMonth - 1, startDay),
      );
      const endDate = endOfDay(addDays(startDate, durationDays - 1));
      return today >= startDate && today <= endDate;
    })
    .sort((a, b) => a.durationDays - b.durationDays)[0];
</script>

<div class="sidebar transition-colors" data-testid="sidebar">
  <div class="sidebar-content">
    {#if !currentOccasion || currentOccasion.imageName}
      <a
        class="img-wrapper transition-colors"
        class:rounded={!currentOccasion}
        href="/"
        data-sveltekit-preload-data="hover"
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
      </a>
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
            class="learn-more-link"
          >
            Learn more
          </a>
        {/if}
      </p>
    {/if}
    <a class="name-wrapper" href="/" data-sveltekit-preload-data="hover">
      <h1 class="transition-colors">Ross Hill</h1>
    </a>
    <p class="subtitle role transition-colors" data-testid="job-title">
      Engineering Lead
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
</div>

<style lang="scss">
  @use "src/lib/styles/breakpoints";

  @mixin sidebar-light {
    --sidebar-background: white;
    --sidebar-leaves: var(--color-green-50);
    --sidebar-profile-pic-border: var(--color-green-50);
    --sidebar-heading: var(--color-green-700);
    --sidebar-role: var(--color-green-600);
  }

  @mixin sidebar-dark {
    --sidebar-background: var(--color-green-950);
    --sidebar-leaves: var(--color-green-900);
    --sidebar-profile-pic-border: var(--color-green-900);
    --sidebar-heading: var(--color-neutral-100);
    --sidebar-role: var(--color-neutral-200);
  }

  div.sidebar {
    @include sidebar-light;
  }

  @media (prefers-color-scheme: dark) {
    div.sidebar {
      @include sidebar-dark;
    }
  }

  :global([data-theme="light"]) div.sidebar {
    @include sidebar-light;
  }

  :global([data-theme="dark"]) div.sidebar {
    @include sidebar-dark;
  }

  div.sidebar {
    border-right: 1px solid var(--color-border);
    background-color: var(--sidebar-background);
    position: relative;
    z-index: 10;
    text-align: center;

    &::before {
      content: "";
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: inherit;
      background-color: var(--sidebar-leaves);
      clip-path: inset(0 1px 0 0);
      pointer-events: none;
      mask-image: image-set(
        url("/leaves-mask.webp") type("image/webp"),
        url("/leaves-mask.png") type("image/png")
      );
      mask-repeat: repeat;
      mask-size: 20rem 20rem;
      -webkit-mask-image: image-set(
        url("/leaves-mask.webp") type("image/webp"),
        url("/leaves-mask.png") type("image/png")
      );
      -webkit-mask-repeat: repeat;
      -webkit-mask-size: 20rem 20rem;
      transition: background-color 0.3s ease;
    }

    div.sidebar-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      position: sticky;
      top: 0;
      z-index: 1;
      gap: var(--spacing-xl);

      a.img-wrapper,
      a.name-wrapper {
        text-decoration: none;

        &:hover {
          opacity: 1;
        }
      }

      .occasion-blurb {
        text-align: center;
        margin-top: calc(var(--spacing-s) * -1);
        max-width: 20rem;
        width: 100%;
        color: var(--color-subtitle);
        padding: 0 var(--spacing-s);

        .learn-more-link {
          white-space: nowrap;
        }
      }

      .name-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        h1 {
          letter-spacing: 0.05rem;
          margin: 0;
          line-height: 1;
          color: var(--sidebar-heading);
        }
      }

      p.subtitle {
        &.role {
          font-size: var(--font-size-m);
          color: var(--sidebar-role);
        }
      }

      .img-wrapper {
        width: 10.5rem;
        height: 10.5rem;
        min-width: 10.5rem;
        min-height: 10.5rem;

        &.rounded {
          overflow: hidden;
          border-radius: 50%;
          border: 3px solid var(--sidebar-profile-pic-border);
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

  @media (max-width: breakpoints.$breakpoint-m-max) {
    div.sidebar {
      border-width: 0;
      border-bottom: 1px solid var(--color-border);
      padding: var(--spacing-xl) var(--spacing-xl) 0;
      background-attachment: scroll;
      transition:
        color 0.3s ease,
        background-color 0.3s ease,
        box-shadow 0.3s ease,
        outline-color 0.3s ease;

      &::before {
        position: absolute;
        inset: 0;
        width: auto;
        clip-path: inset(0 0 1px 0);
      }

      div.sidebar-content {
        height: unset !important;
        padding: var(--spacing-2xl) 0 var(--spacing-3xl);
        position: relative !important;
      }
    }
  }
</style>
