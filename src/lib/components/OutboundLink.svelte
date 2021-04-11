<script>
  export let href;
  export let target;
  export let rel;
</script>
<a href="/redirect/{encodeURIComponent(href)}" {target} {rel}>
  <slot/>
</a>