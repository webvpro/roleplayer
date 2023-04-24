<template>
  <div class="h-full mb-3 w-auto overflow-auto">
    <div class="mx-auto snap-start container">
      <div class="hero mx-auto bg-base-300">
        <div class="hero min-h-96 bg-base-300">
          <div class="hero-content flex-col lg:flex-row">
            <img
              src="/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png"
              class="max-w-sm mask mask-squircle"
            />
            <div class="text-base-content">
              <h1 class="text-5xl font-bold">
                Create Cypher System Compendiums, Characters and More
              </h1>
              <p class="py-6">
                Create and Curate, your own customized Characters, Compendiums
                and Game Dashboards.
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
        class="grid justify-center gap-10 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 mt-6"
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
      name: 'Characters',
      icon: 'icon-park-twotone:avatar',
      path: '/create/character',
      description:
        'Make a character, using the CSRD collections. Coming soon create characters using your own setting Compendiums',
    },
    {
      name: 'Compendiums',
      icon: 'ph:books-fill',
      path: 'compendium',
      description:
        'Coming soon! Create and Curate your own setting compendiums which includes custom collection items, such as Types, Foci, Descriptors, Abilities and more',
    },
    {
      name: 'Game Dashboards',
      icon: 'charm:layout-dashboard',
      path: 'dashboard',
      description:
        'Coming soon!, Create Game Dashboards, to track your sessions and campaigns',
    },
  ];
</script>
