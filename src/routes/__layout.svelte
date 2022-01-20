<script lang="ts">
  import { cheekyMessagePrinted } from "$lib/stores";

  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";

  import "../assets/styles/global.scss";
  import "../assets/styles/normalize.min.css";

  const getCssVariable = (variableName: string) => {
    const style = getComputedStyle(document.querySelector("body"));
    return style.getPropertyValue(`--${variableName}`);
  };

  const printGithubLink = () => {
      // eslint-disable-next-line no-console
      console.log(
        "%cLike the site? Check out the source code here: https://github.com/rosslh/rosshill.ca",
        `background-color: ${getCssVariable("panel-background")}; border-radius: 0.5rem; border: 1px solid ${getCssVariable("border")}; color: ${getCssVariable("foreground")}; display: inline-block; font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important; font-weight: 700; padding: 0.75rem;`,
      );
  };

  $: {
    if (typeof window !== "undefined" && !$cheekyMessagePrinted) {
      $cheekyMessagePrinted = true;
      printGithubLink();
    }
  }

  const title = "Ross Hill – Website and Portfolio";
  const description = "I am a software developer based in Toronto. I specialize in web development and I'm always on the lookout for cool new technologies.";
  const siteImage = "https://rosshill.ca/siteImage.png";
</script>

<ThemeSwitcher />
<div class="two-column">
  <Sidebar />
  <div>
    <slot />
    <CopyrightNotice />
  </div>
</div>

<svelte:head>
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0" />
  <meta name="theme-color" content="#212732" />
  <!-- HTML Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta itemprop="image" content={siteImage} />
  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://rosshill.ca" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={siteImage} />
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={siteImage} />

  <link rel="manifest" href="/manifest.json" />
  <link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<style>
  div.two-column {
    display: grid;
    grid-template-columns: 3fr 8fr;
  }

  @media (max-width: 1000px) {
    div.two-column {
      grid-template-columns: 1fr;
    }
  }
</style>