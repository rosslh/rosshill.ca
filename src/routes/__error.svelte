<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        error: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script>
  import NotFound from "./404.svelte";
  export let error;
  console.log(error);
</script>

<NotFound />
