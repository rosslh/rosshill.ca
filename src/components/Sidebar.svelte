<script>
  import Separator from "./Separator.svelte";
  import AnimatedName from "./AnimatedName.svelte";
</script>

<style>
  div.sidebar {
    grid-area: sidebar;
    border-right: 1px solid var(--sidebarBorder);
    background-color: var(--sidebarBackground);
  }

  @media (max-width: 1000px) {
    div.sidebar {
      border-right: none;
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
    width: 12rem;
    height: 12rem;
  }

  div.imgWrapper picture,
  div.imgWrapper img,
  div.imgWrapper source {
    max-width: 100%;
    max-height: 100%;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: -1rem;
    padding-bottom: 0;
    height: 6rem;
    max-width: 100%;
  }

  h1 > span {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  p.subtitle {
    margin-top: 1rem;
  }

  p.subtitle.role {
    font-size: 1.3rem;
  }
</style>

<div class="sidebar">
  <div class="sidebarContent">
    <div class="imgWrapper">
      <picture>
        <source srcset="headshot.webp" type="image/webp" />
        <source srcset="headshot.jpg" type="image/jpg" />
        <img src="headshot.jpg" alt="Ross Hill" />
      </picture>
    </div>
    <h1>
      <span>Ross Hill</span>
      <AnimatedName />
    </h1>
    <p class="subtitle role">Software Developer</p>
    <p class="subtitle email">ross@rosshill.ca</p>
    <p class="subtitle">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/rosslh">
        GitHub
      </a>
      /
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/rosslh">
        LinkedIn
      </a>
      /
      <a href="/resume.pdf">Resume</a>
    </p>
  </div>
  <Separator intro />
</div>
