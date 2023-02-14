<template>
  <div class="hero bg-base-200 py-10">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Want to play a game?</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  <div class="mt-12 snap-start">
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="feature in features" :key="feature.name" class="pt-6">
        <div class="shadow-xl card card-compact w-96 bg-base-100">
          <div class="">
            <div>
              <span class="inline-flex items-center justify-center p-3">
                <Icon
                  :name="`${feature.icon}`"
                  class="btn btn-square btn-primary"
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
              <div class="justify-end card-actions">
                <router-link :to="`${feature.path}/`" class="btn btn-primary"
                  >More {{ feature.name }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const features = [
  { name: "Games", icon: "game-icons:winged-sword", path: "/games" },
  { name: "Characters", icon: "ion:accessibility-sharp", path: "/sheet" },
  { name: "Sources", icon: "game-icons:bookshelf", path: "/sources" },
  { name: "Shopping", icon: "game-icons:shop", path: "/games" },
  { name: "News", icon: "game-icons:newspaper", path: "/games" },
  { name: "Streams", icon: "fa6-brands:youtube", path: "/games" },
];
export default {
  setup() {
    return {
      features,
    };
  },
};
</script>