<div class="content-wrapper intro">
  <h2>
    <span class="hello-text">Hey, I’m Ross</span>
    <span class="wave-emoji">👋</span>
  </h2>
  <p>
    I am a software developer based in Toronto. I specialize in web development
    and I'm always on the lookout for cool new technologies. I'm helping Doctalk
    build a collaboration tool for doctors and medical organizations.
  </p>
</div>

<style lang="scss">
  @keyframes wave {
    0%,
    100% {
      transform: translateX(0%);
      transform-origin: 50% 50%;
    }
    15% {
      transform: translateX(-6px) rotate(-12deg);
    }
    30% {
      transform: translateX(5px) rotate(12deg);
    }
    45% {
      transform: translateX(-4px) rotate(-7.2deg);
    }
    60% {
      transform: translateX(3px) rotate(4.8deg);
    }
    75% {
      transform: translateX(-2px) rotate(-2.4deg);
    }
  }

  div.intro {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 3rem;

    h2 {
      margin-top: 0;

      .hello-text {
        margin-right: 0.5rem;
      }

      .wave-emoji {
        display: inline-block;
        margin: 0;
        padding: 0;
        animation: wave 0.9s linear 3.5s both;
        font-weight: 400 !important;
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
