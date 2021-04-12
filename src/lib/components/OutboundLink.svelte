<script>
  export let href;
</script>

<a href="/redirect/{encodeURIComponent(href)}" target="_blank" rel="noopener noreferrer">
  <slot/>
</a>