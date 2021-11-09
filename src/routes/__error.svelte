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
  import NotFound from "./404.svelte";
  export let error: string;
  console.error(error);
</script>

<NotFound />
