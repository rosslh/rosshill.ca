<script lang="ts" context="module">
  export function load({ error, status }) {
    return {
      props: {
        error: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script lang="ts">
  export let error: string;
  
  import NotFound from "./404.svelte";

  console.error(error);
</script>

<NotFound />
