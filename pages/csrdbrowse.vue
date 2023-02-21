
<template>
  <div class="p-4 w-full h-full justify-center">
    <div class="hero rounded-xl h-4/6 w-10/12 mx-auto bg-base-300">
      <div class="hero-content flex-col lg:flex-row">
        <img
          src="/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png"
          class="max-w-sm mask mask-squircle"
        />
        <div class="text-base-content">
          <h1 class="text-3xl lg:text-5xl font-bold">Browse Cypher System.</h1>

          <p class="py-6">
            Browse our currated collections from the Cypher System Reference
            Document (CSRD), these collections are shared under
            <a
              class="text-accent hover:text-accent-focus"
              target="_blank"
              href="https://csol.montecookgames.com/"
              >The Cypher System Open License (CSOL)</a
            >
            provided by
            <a
              class="text-accent hover:text-accent-focus"
              target="_blank"
              href="https://www.montecookgames.com/"
              >Monte Cook Games, LLC (“MCG”)</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <div
        class="
          grid grid-cols-1
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          place-items-center
        "
      ></div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "browse",
});
</script>
