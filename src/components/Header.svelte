<style>
  div.intro {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  div.intro > div.left p.subtitle {
    font-size: 14px;
    width: 90%;
    max-width: 25rem;
    margin: 0.75rem auto;
  }
  div.intro > div.left p.subtitle > a {
    color: white;
    text-decoration: none;
  }
  div.intro > div.left p.subtitle > a:hover {
    text-decoration: underline;
  }
  div.intro > div.left {
    grid-column: span 3;
    text-align: center;
    padding: 0 2rem;
    background-color: #1d3557;
    background-image: url(/background.png);
    padding: 2rem 0 3rem;
    color: white;
  }

  div.intro > div.left > h1 {
    margin-top: 1rem;
  }

  div.intro > div.left > div.imgWrapper {
    border: 5px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    overflow: hidden;
    height: 12rem;
    width: 12rem;
    margin: 0 auto;
  }

  div.intro > div.left > div.imgWrapper img {
    background-color: #eee;
    height: 100%;
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    div.intro > div.right,
    div.intro > div.left {
      grid-column: span 12 !important;
    }
  }
  div.intro > div.right {
    grid-column: span 9;
    line-height: 1.8rem;
    padding: 2rem 3rem;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

<div class="intro">
  <div class="left">
    <div class="imgWrapper">
      <picture>
        <source srcset="headshot.webp" type="image/webp" />
        <source srcset="headshot.jpg" type="image/jpg" />
        <img src="headshot.jpg" alt="Ross Hill" />
      </picture>
    </div>
    <h1>Ross Hill</h1>
    <p class="subtitle">ross@rosshill.ca</p>
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
  <div class="right">
    <p>
      I'm a web developer specializing in React.js who is always on the lookout
      for cool new technologies.
    </p>
    <p>
      In 2018 I worked on the QHack's technology team, building internal tools
      and improving our online presence. QHacks is a hackathon hosted at Queen’s
      University where software developers come together to collaborate on
      projects and win prizes. I helped to create a landing page for the event
      and the application system for QHacks participants.
    </p>
  </div>
</div>
