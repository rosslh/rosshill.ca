<script context="module">
  export async function load({ page }) {
    return { status: 301, redirect: page.params.location };

  }
</script>