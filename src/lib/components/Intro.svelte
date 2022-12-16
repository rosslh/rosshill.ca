<script lang="ts">
  export let openToWork: boolean;
</script>

<div class="content-wrapper intro">
  <h2 data-testid="main-heading">
    Welcome to my corner of the web!
  </h2>
  <p>
    I am a software developer and I'm always on the lookout for cool new technologies.
    I like to spend my time reading, working on side projects, and exploring the great city of Toronto.
  </p>
  {#if openToWork}
    <p>
      I am currently looking for a full-time software engineering position.
      If you think we could be a good match,
      <span class="wrap-together">please <a href="mailto:ross@rosshill.ca">reach out</a>!</span>
    </p>
  {/if}
</div>

<style lang="scss">
  div.intro {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 3rem;

    h2 {
      margin-top: 0;
    }

    p {
      margin: 1rem auto !important;

      span.wrap-together {
        white-space: nowrap;
      }
    }
  }

  @media (max-width: 800px) {
    div.intro {
      padding-top: 0;
    }
  }
</style>
