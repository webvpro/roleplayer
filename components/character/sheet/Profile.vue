<script setup>
  import advancements from '@/JSON/advancements.json';
  const props = defineProps({
    character: {type: Object, default: () => {}},
  });

  const tierNum = computed(() =>
    props.character.tier ? props.character.tier.length : 0,
  );

  const characterImg = computed(() =>
    props.character.url
      ? props.character.url
      : '/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png',
  );

  const descriptorsTxt = computed(() =>
    props.character.descriptors
      ? props.character.descriptors
      : '[-descriptors-]',
  );
  const fociTxt = computed(() =>
    props.character.foci ? props.character.foci.join(',') : '[-foci-]',
  );

  const advancementSteps = ref(advancements);
</script>

<template>
  <div
    v-if="character"
    class="col-span-12 row-span-3 shadow-xl lg:col-span-6 card lg:card-side bg-base-100 p-0 z-10"
  >
    <figure class="lg:w-1/2 h-full relative">
      <div
        class="absolute text-4xl top-1 left-2 bg-base text-base-content z-20"
      >
        {{ character.name }}
      </div>
      <div class="absolute bottom-1 justify-around flex w-full z-20">
        <div class="flex flex-col items-center justify-center">
          <span class="pb-1 text-sm font-semibold">Tier</span>
          <div class="w-12 h-12 text-xl btn-lg md:btn-sm btn btn-circle">
            <span class="">{{ tierNum }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="pb-1 text-sm font-semibold">Effort</span>
          <div class="w-12 h-12 text-xl btn-lg md:btn-sm btn btn-circle">
            <span class="">{{ character.effort ?? '' }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="pb-1 text-sm font-semibold">XP</span>
          <div class="w-12 h-12 text-xl btn-lg md:btn-sm btn btn-circle">
            <span class="">{{ character.xp ?? '' }}</span>
          </div>
        </div>
      </div>
    </figure>

    <div class="card-body col-span-6">
      <p class="text-sm">Sentence here</p>

      <div class="card-actions w-full flex flex-col items-end"></div>
    </div>
    <!-- </div> -->
  </div>
</template>
<style lang="postcss">
  .stat-label {
    @apply pb-1 text-sm font-semibold;
  }
  .input-stat {
    @apply w-12 h-12 text-sm btn btn-circle bg-base-300 text-base-content;
  }
  .btn-stat {
    @apply w-12 h-12 text-sm btn btn-circle bg-base-300 text-base-content;
  }
</style>
