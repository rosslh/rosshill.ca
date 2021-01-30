<div class="contentWrapper intro">
  <h2>
    <span class="helloText">Hey, I’m Ross</span>
    <span class="waveEmoji">👋</span>
  </h2>
  <p>
    I am a software developer based in Toronto. I specialize in web development,
    and I'm always on the lookout for cool new technologies. I'm helping Doctalk
    build a collaboration tool for doctors and medical organizations.
  </p>
</div>

<style>
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

  div.intro .waveEmoji {
    display: inline-block;
    margin: 0;
    padding: 0;
    animation: wave 0.9s linear 2.5s both;
    font-weight: normal !important;
  }

  div.intro .helloText {
    margin-right: 0.5rem;
  }

  div.intro {
    margin-top: 3.5rem;
    margin-bottom: 3.5rem;
  }

  @media (min-width: 1000px) {
    div.intro {
      padding-top: 3rem;
    }
  }
</style>
