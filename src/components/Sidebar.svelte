<script>
  import Separator from "./Separator.svelte";
  import AnimatedName from "./AnimatedName.svelte";
</script>

<div class="sidebar doTransition">
  <div class="sidebarContent">
    <div class="imgWrapper">
      <picture class="fixedSize">
        <source srcset="headshot.webp" type="image/webp" />
        <source srcset="headshot.png" type="image/png" />
        <img src="headshot.png" alt="Ross Hill" width="10rem" height="10rem" />
      </picture>
    </div>
    <h1>
      <AnimatedName />
    </h1>
    <p class="subtitle role doTransition">Software Developer</p>
    <p class="subtitle email">
      <a href="mailto:ross@rosshill.ca">ross@rosshill.ca</a>
    </p>
    <p class="subtitle">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/rosslh"
        on:click={() => gtag("event", "outbound", { event_label: "Github" })}
      >
        GitHub
      </a>
      <span class="smallSlash">/</span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/rosslh"
        on:click={() => gtag("event", "outbound", { event_label: "LinkedIn" })}
      >
        LinkedIn
      </a>
      <span class="smallSlash">/</span>
      <a
        href="/resume.pdf"
        on:click={() => gtag("event", "outbound", { event_label: "Resume" })}
      >
        Resume
      </a>
    </p>
  </div>
  <Separator intro />
</div>

<style>
  div.sidebar {
    grid-area: sidebar;
    border-right: 1px solid var(--sidebarBorder);
    background-color: var(--sidebarBackground);
    z-index: 10;
  }

  @media (max-width: 1000px) {
    div.sidebar {
      border-width: 0;
      padding: 1.5rem 1.5rem 0;
      background-color: var(--background);
    }
    div.sidebarContent {
      height: unset !important;
      padding: 2rem 0 3.5rem;
      position: initial !important;
    }
  }

  div.sidebarContent {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  div.imgWrapper {
    overflow: hidden;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
  }

  div.imgWrapper * {
    display: block;
    width: 100%;
    height: 100%;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: -1rem;
    padding-bottom: 0;
    height: 6rem;
    max-width: 100%;
  }

  p.subtitle {
    margin-top: 1rem;
    color: var(--subtitle);
  }

  p.subtitle.role {
    font-size: 1.3rem;
    color: var(--heading);
  }
</style>
