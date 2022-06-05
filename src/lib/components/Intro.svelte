<div class="content-wrapper intro">
  <h2 data-testid="main-heading">
    Hey, I<span class="apostrophe">&rsquo;</span>m Ross
  </h2>
  <p>
    I am a software developer based in Toronto. I specialize in web development
    and I'm always on the lookout for cool new technologies. I'm helping Doctalk
    make the lives of doctors and medical professionals easier.
  </p>
</div>

<style lang="scss">
  div.intro {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 3rem;

    h2 {
      margin-top: 0;

      span.apostrophe {
        font-size: 0.85em;
        position: relative;
        top: -0.1em;
      }
    }

    p {
      margin: 1rem auto !important;
    }
  }

  @media (max-width: 1000px) {
    div.intro {
      padding-top: 0;
    }
  }
</style>
