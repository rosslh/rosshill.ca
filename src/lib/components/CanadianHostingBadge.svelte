<script lang="ts">
  // The site runs on this MapleDeploy server; the id ties badge clicks to it.
  const serverId = "f1b4d852";
  const badgeUrl = "https://mapledeploy.ca/api/badge";
  const themes = ["light", "dark"] as const;
</script>

<div class="canadian-hosting-badge" data-testid="canadian-hosting-badge">
  {#each themes as theme (theme)}
    <a
      class={theme}
      href="https://mapledeploy.ca/?utm_source=badge&utm_medium=referral&utm_campaign=server-{serverId}&utm_content=html-{theme}-small"
      target="_blank"
      rel="noopener"
    >
      <img
        src="{badgeUrl}?theme={theme}&size=small"
        srcset="{badgeUrl}?theme={theme}&size=small&scale=2 2x"
        alt="Hosted in Canada with MapleDeploy"
        width="130"
        height="28"
        loading="lazy"
      />
    </a>
  {/each}
</div>

<style lang="scss">
  // Show the badge that matches the site's theme. The hidden one is lazy,
  // so browsers skip fetching it.
  .canadian-hosting-badge {
    display: flex;
    justify-content: center;

    a {
      display: block;
      line-height: 0;
    }

    img {
      display: block;
    }

    a.dark {
      display: none;
    }
  }

  @mixin show-dark-badge {
    .canadian-hosting-badge {
      a.light {
        display: none;
      }

      a.dark {
        display: block;
      }
    }
  }

  @mixin show-light-badge {
    .canadian-hosting-badge {
      a.light {
        display: block;
      }

      a.dark {
        display: none;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    @include show-dark-badge;
  }

  :global([data-theme="light"]) {
    @include show-light-badge;
  }

  :global([data-theme="dark"]) {
    @include show-dark-badge;
  }
</style>
