<script lang="ts">
  import { goto } from "$app/navigation";
  import { addDays, endOfDay, startOfDay } from "date-fns";
  import tippy from "tippy.js";
  import type { Instance, Props } from "tippy.js";
  import type { Action } from "svelte/action";
  import "tippy.js/dist/tippy.css";

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

  type OccasionTooltipOptions = {
    content?: string;
  };

  const getOccasionTooltipPlacement = (): Props["placement"] =>
    window.innerWidth < 1000 ? "bottom" : "top";

  const getOccasionTooltipMaxWidth = (node: HTMLElement): number | string => {
    const sidebarWidth = node
      .closest(".sidebar")
      ?.getBoundingClientRect().width;

    return sidebarWidth
      ? Math.max(sidebarWidth - remsToPixels(1.5), 0)
      : "min(18rem, calc(100vw - var(--spacing-xl)))";
  };

  const createOccasionTooltipProps = (
    node: HTMLElement,
    { content }: OccasionTooltipOptions,
  ): Partial<Props> => {
    const sidebar = node.closest(".sidebar") ?? undefined;

    return {
      content,
      theme: "occasion",
      placement: getOccasionTooltipPlacement(),
      maxWidth: getOccasionTooltipMaxWidth(node),
      arrow: false,
      offset: [0, remsToPixels(0.75)],
      trigger: "mouseenter focus click",
      touch: true,
      onTrigger(instance) {
        instance.setProps({
          placement: getOccasionTooltipPlacement(),
          maxWidth: getOccasionTooltipMaxWidth(node),
        });
      },
      popperOptions: {
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: sidebar,
              padding: remsToPixels(0.75),
            },
          },
          {
            name: "flip",
            options: {
              boundary: sidebar,
              padding: remsToPixels(0.75),
            },
          },
        ],
      },
    };
  };

  const occasionTooltip: Action<HTMLElement, OccasionTooltipOptions> = (
    node,
    options,
  ) => {
    let instance: Instance | undefined;

    const updateTooltip = (nextOptions: OccasionTooltipOptions): void => {
      if (!nextOptions.content) {
        instance?.destroy();
        instance = undefined;
        return;
      }

      const props = createOccasionTooltipProps(node, nextOptions);

      if (instance) {
        instance.setProps(props);
      } else {
        instance = tippy(node, props);
      }
    };

    updateTooltip(options);

    return {
      update: updateTooltip,
      destroy() {
        instance?.destroy();
      },
    };
  };

  const handleImageButtonClick = async (): Promise<void> => {
    if (!currentOccasion?.blurb) {
      await goto("/");
    }
  };
</script>

<div class="sidebar transition-colors" data-testid="sidebar">
  <div class="sidebar-content">
    {#if !currentOccasion || currentOccasion.imageName}
      <button
        class="img-wrapper transition-colors"
        class:rounded={!currentOccasion}
        type="button"
        aria-label={currentOccasion?.blurb
          ? `Learn more about ${currentOccasion.name}`
          : "Home"}
        use:occasionTooltip={{
          content: currentOccasion?.blurb,
        }}
        onclick={handleImageButtonClick}
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
              alt=""
              width={remsToPixels(10)}
              height={remsToPixels(10)}
            />
          </picture>
        {/if}
      </button>
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
    --sidebar-background: var(--color-green-50);
    --sidebar-leaves: var(--color-green-100);
    --sidebar-profile-pic-border: var(--color-green-100);
    --sidebar-heading: var(--color-green-800);
    --sidebar-role: var(--color-green-700);
  }

  @mixin sidebar-dark {
    --sidebar-background: var(--color-green-900);
    --sidebar-leaves: var(--color-green-800);
    --sidebar-profile-pic-border: var(--color-green-800);
    --sidebar-heading: var(--color-green-100);
    --sidebar-role: var(--color-green-200);
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
    border: 0 solid var(--color-border);
    border-right-width: 1px;
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
      transition: background-color 0.3s ease;
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

      button.img-wrapper,
      a.name-wrapper {
        text-decoration: none;

        &:hover {
          opacity: 1;
        }
      }

      button.img-wrapper {
        background: none;
        border: 0;
        padding: 0;
        cursor: pointer;
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

  :global(.tippy-box[data-theme~="occasion"]) {
    color: var(--color-foreground, #181b1f);
    background: var(--color-panel-background, #ffffff);
    border: 1px solid var(--color-border, rgb(0 0 0 / 18%));
    border-radius: var(--border-radius-s, 0.375rem);
    box-shadow: 0 var(--spacing-xs) var(--spacing-xl) rgb(0 0 0 / 12%);
    font-size: var(--font-size-xs);
    line-height: 1.45;
    text-align: center;
  }

  :global(.tippy-box[data-theme~="occasion"] > .tippy-content) {
    padding: var(--spacing-xs, 0.5rem) var(--spacing-s, 0.75rem);
  }

  @media (max-width: breakpoints.$breakpoint-m-max) {
    div.sidebar {
      border-right-width: 0;
      border-bottom-width: 1px;
      padding: var(--spacing-xl) var(--spacing-xl) 0;
      background-attachment: scroll;

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
