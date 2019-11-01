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
    animation: wave 0.9s 1.2s both;
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

<div class="contentWrapper intro">
  <h2>
    <span class="helloText">Hey, I'm Ross</span>
    <span class="waveEmoji">👋</span>
  </h2>
  <p>
    I am a software developer and computer science student at Queen's
    university. I specialize in web development, and I'm always on the lookout
    for cool new technologies.
  </p>
  <p>
    This year I am involved with QTMA, working on a web application called
    Studii which helps students collaborate on course notes. I am also working
    on my capstone project, which is a digital box office and analytics system
    for foldA at the Isabel Bader Centre.
  </p>
</div>
