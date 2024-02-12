<template>
  <div class="h-full mb-3 w-auto overflow-auto">
    <div class="mx-auto snap-start container">
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png"
            class="max-w-sm rounded-lg shadow-2xl bg-base-300"
          />
          <div>
            <h1 class="text-5xl font-bold">Play Coming Soon!</h1>
            <p class="py-6">
              Play your characters with others in realtime. Until then checkout
              the CSRD Compendium
            </p>
            <a href="../compendium/csrd" class="btn btn-primary"
              >CSRD Compendium</a
            >
          </div>
        </div>
      </div>

      <!--
      <div class="hero mx-auto bg-base-300">
        <div class="hero min-h-screen bg-base-300">
          <div class="hero-content flex-col lg:flex-row">
            <img
              src="/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png"
              class="max-w-sm mask mask-squircle"
            />
            <div class="text-base-content">
              <h1 class="text-5xl font-bold">Cypher System Compendiums</h1>
              <p class="py-6">
                Here on PlayCypher.com we use the term Compendium to describe
                all of the things that make up a Cypher System setting. These
                things will be referred to as Collections. These are Cypher
                System related collections such as Types, Descriptors, Foci,
                Abilities, Cyphers, Artifacts, Creatures and NPCs.
              </p>
              <p class="py-3">
                Currently the only Compendium available to view is based off of
                the CSRD (Cypher System Resource Document), In future releases
                we will be granting the ability to create and curate custom
                Compendiums and Collections.
              </p>
              <NuxtLink to="/compendium/csrd" class="btn btn-primary"
                >CSRD Compendium</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="grid justify-center gap-10 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3"
      >
        <div
          v-for="feature in features"
          :key="key"
          class="shadow-xl p-6 card card-compact w-auto bg-base-100 h-full sm:mb-2"
        >
          <div>
            <div class="text-center">
              <span class="inline-flex items-center justify-center p-3">
                <Icon
                  :name="`${feature.icon}`"
                  class="btn btn-square btn-primary text-sm p-1"
                />
              </span>
              <label for="item-details" class="card-title">
                {{ feature.name }}
              </label>
            </div>
            <div class="card-body">
              <p class="overflow-ellipsis overflow-hidden w-80 p-2 h-48">
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
      </div> -->
    </div>
  </div>
</template>
<script setup>
  const features = [
    {name: 'Browse', icon: 'game-icons:winged-sword', path: '/compendium'},
    {name: 'Create', icon: 'ion:accessibility-sharp', path: '/create'},
    {name: 'Play', icon: 'game-icons:bookshelf', path: '/sessions'},
  ];
</script>
