
<template>
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold text-left">
          Want to play a game with Cypher System?
        </h1>
        <p class="py-6 text-left">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <router-link to="/setup" class="btn btn-primary"
          >Get Started</router-link
        >
      </div>
    </div>
  </div>
  <div class="mt-3 mx-auto p-3 snap-start container">
    <div class="grid content-around grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
      <div v-for="feature in features" :key="feature.name" class="shadow-xl card card-compact w-96 bg-base-100">
        <div class="text-center">
              <span class="inline-flex items-center justify-center p-3">
                <Icon
                  :name="`${feature.icon}`"
                  class="btn btn-square btn-primary text-sm p-1"
                />
              </span>
            </div>
            <div class="card-body">
              <h2 class="card-title">
                {{ feature.name }}
              </h2>
              <p class="mt-5 text-base">
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                Et magna sit morbi lobortis.
              </p>
              <div class="justify-center card-actions">
                <router-link :to="`${feature.path}/`" class="btn btn-primary"
                  >More {{ feature.name }}</router-link
                >
              </div>
            </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { crsd } = useCompendium();

const features = [
  { name: "Types", icon: "game-icons:winged-sword", path: "/types" },
  { name: "Foci", icon: "ion:accessibility-sharp", path: "/foci" },
  { name: "Descriptors", icon: "game-icons:bookshelf", path: "/descriptors" },
  { name: "Flavors", icon: "game-icons:bookshelf", path: "/flavors" },
  { name: "Creatures", icon: "game-icons:bookshelf", path: "/creatures" },
  { name: "NPCs", icon: "game-icons:bookshelf", path: "/npcs" },
  { name: "Ablilities", icon: "game-icons:bookshelf", path: "/" },
];
definePageMeta({
  middleware: ['auth'],
})
</script>