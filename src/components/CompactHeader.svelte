<div class="intro">
  <div class="left">
    <h1>Ross Hill</h1>
  </div>
  <div class="right">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/rosslh"
      >GitHub</a
    >
    <span>/</span>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.linkedin.com/in/rosslh"
      >LinkedIn</a
    >
    <span>/</span>
    <a href="/resume.pdf">Resume</a>
  </div>
</div>

<style>
  div.intro {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eee;
    min-height: 4rem;
    box-shadow: 0px 2px 4px 0px rgba(34, 34, 34, 0.15);
  }

  div.intro > div.right > a {
    text-decoration: none;
  }

  div.intro > div.right > a:hover {
    text-decoration: underline;
  }

  div.intro > div.left {
    text-align: center;
    background-color: #1d3557;
    background-image: url(/background.png);
    color: white;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    padding: 0 2rem;
  }

  div.intro > div.right {
    flex-grow: 1;
    background-color: #fafafa;
    height: 4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @media screen and (max-width: 700px) {
    div.intro > div.right > * {
      padding: 0 0.3rem !important;
    }
    div.intro > div.left {
      padding: 0 1rem;
    }
  }

  div.intro > div.right > * {
    padding: 0 1rem;
  }
</style>
