<style>
  div.sidebar {
    grid-area: sidebar;
    border-right: 1px solid #ccc;
  }

  @media (max-width: 1000px) {
    div.sidebar {
      border-right: none;
      padding: 1.5rem;
    }
    div.sidebarContent {
      height: unset !important;
      padding: 2rem 0;
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
    width: 9rem;
    height: 9rem;
  }

  div.imgWrapper picture,
  div.imgWrapper img,
  div.imgWrapper source {
    max-width: 100%;
    max-height: 100%;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .email {
    margin-bottom: 1rem;
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
    <h1>Ross Hill</h1>
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
</div>
