<template>
  <div class="h-full mb-3 w-auto overflow-auto">
    <div class="mx-auto snap-start container">
      <div class="hero bg-base-300">
        <div class="hero-content flex-col lg:flex-row w-auto">
          <img
            src="/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png"
            class="max-w-xs mask mask-squircle"
          />
          <div class="text-base-content text-xs md:text-base">
            <h1 class="text-xl md:text-5xl font-bold">
              Cypher System Compendiums
            </h1>
            <p class="py-6">
              Here on PlayCypher.com we use the term Compendium to describe all
              of the things that make up a Cypher System setting. These "things"
              will be referred to as "Collections". Examples of Cypher System
              Collections are Types, Descriptors, Foci, Abilities, Cyphers,
              Artifacts, Creatures and NPCs.
            </p>
            <p class="py-3">
              PlayCypher.com is currently a work in progress, we will try to
              update this page with progress.
            </p>
            <h3>What's up?</h3>
            <ul class="steps steps-vertical text-left mb-2">
              <li class="step step-primary">
                <p class="text-left p-3">
                  Themes are live you can change your theme by clicking on the
                  Avatar/Profile Image in the upper right of the screen/browser
                </p>
              </li>
              <li class="step step-primary">
                <p class="text-left p-3">
                  CSRD in Compendium format, all of the collections having been
                  entered but some UI formatting may still be needed
                </p>
              </li>
              <li class="step">
                <p class="text-left p-3">
                  Login is discord, currently you can use the login and it will
                  automatically make you a member account. If you setup and
                  account, we can grant access to features in development at
                  some point.
                </p>
              </li>
            </ul>
            <NuxtLink to="/compendium" class="btn btn-primary"
              >View CSRD Compendiums</NuxtLink
            >
          </div>
        </div>
      </div>

      <div
        class="grid justify-center gap-10 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 mt-6"
      >
        <div
          v-for="feature in features"
          :key="nameKeyMaker(feature.name)"
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
                {{ feature.description }}
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
</template>
<script setup>
  const features = [
    {
      name: 'CSRD Compendium',
      icon: 'game-icons:bookshelf',
      path: '/compendium',
      description:
        'A browse ready version of the CSRD great for a quick reference, we will be add own own custom compendiums soon.',
    },
    {
      name: 'Characters',
      icon: 'ion:accessibility-sharp',
      path: '/characters',
      description:
        'We are working on this feature now, to create characters using the CSRD collections',
    },
    {
      name: 'Play',
      icon: 'game-icons:winged-sword',
      path: '/play',
      description:
        'Coming Soon create Game Dashboards to track your play sessions',
    },
  ];
</script>
