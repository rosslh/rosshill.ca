<script>
  import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import CopyrightNotice from "$lib/components/CopyrightNotice.svelte";

  import "../global.scss";
  import "../normalize.min.css";

  const title = "Ross Hill – Website and Portfolio";
  const description = "I am a software developer based in Toronto. I specialize in web development and I'm always on the lookout for cool new technologies.";
  const siteImage = "https://rosshill.ca/siteImage.png";
</script>

<ThemeSwitcher />
<div class="twoColumn">
  <Sidebar />
  <div>
    <slot />
    <CopyrightNotice />
  </div>
</div>

<svelte:head>
  <meta charset="utf-8" />

  <meta name="viewport" content="width=device-width,minimum-scale=1" />
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
