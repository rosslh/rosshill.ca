<!--
MIT License

Copyright (c) 2020-present Eric Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 -->
<script lang="ts">
  export let element: HTMLElement | null | undefined = null;
  export let root: Element | Document | null | undefined = null;
  export let rootMargin = "0px";
  export let threshold = 0;
  export let intersecting = false;
  export let complete = false;

  import { afterUpdate, onDestroy, tick } from "svelte";
  import { browser } from "$app/environment";

  let prevElement: Element | null = null;
  let observer: IntersectionObserver;

  afterUpdate(async () => {
    if (complete) {
      if (observer) {
        observer.disconnect();
      }
      return;
    }

    await tick();
    if (observer && element != null && element !== prevElement) {
      observer.observe(element);
      if (prevElement != null) {
        observer.unobserve(prevElement);
      }
      prevElement = element;
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    intersecting = Boolean(entries[0]?.isIntersecting);
  };

  $: {
    if (!observer && !complete && browser) {
      observer = new IntersectionObserver(handleIntersection, {
        root,
        rootMargin,
        threshold,
      });
    }
  }
</script>

<slot {intersecting}/>
