<script>
	export let status;
	export let error;
</script>
<style>
  h1,
  p {
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  p {
    margin: 1rem auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4rem;
    }
  }
</style>
<h1>{status}</h1>
<p>{error.message}</p>