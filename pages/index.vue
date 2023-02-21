<template>
  <div class="md:container md:mx-auto p-4">
    <div class="hero min-h-screen bg-base-300">
      <div class="hero-content flex-col lg:flex-row">
        <img
          src="/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png"
          class="max-w-sm mask mask-squircle"
        />
        <div class="text-base-content">
          <h1 class="text-5xl font-bold">Play Cypher System!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi. Provident cupiditate voluptatem et in. Quaerat fugiat ut
            assumenda excepturi exercitationem quasi. In deleniti eaque aut
            repudiandae et a id nisi. Provident cupiditate voluptatem et in.
            Quaerat fugiat ut assumenda excepturi exercitationem quasi. In
            deleniti eaque aut repudiandae et a id nisi. Provident cupiditate
            voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id
            nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
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
      >
        <div v-for="feature in features" :key="feature.name" class="pt-6">
          <div class="shadow-xl card card-compact w-96 bg-base-100">
            <div class="">
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
                <p class="mt-5 text-base text-left">
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
      </div>
    </div>
  </div>
</template>
<script setup>
const features = [
  { name: "Browse CSRD", icon: "game-icons:winged-sword", path: "/csrdbrowse" },
  { name: "Characters", icon: "ion:accessibility-sharp", path: "/sheet" },
  { name: "NPCS", icon: "game-icons:bookshelf", path: "/sources" },
];
</script>