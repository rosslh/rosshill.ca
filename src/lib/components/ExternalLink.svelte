<script>
  export let href;
</script>

<!-- href="/redirect/{encodeURIComponent(href)}" -->
<a {href} target="_blank" rel="noopener noreferrer">
  <slot/>
</a>
