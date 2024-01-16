<script setup>
  const props = defineProps({
    character: {type: Object, default: () => {}},
  });
  const emit = defineEmits(['editMode']);
  const characterUtils = utilsCharacters();
  const sheetData = inject('characterData');
  const {collections} = inject('collectionsData');
  const sheet = computed(() => sheetData.value);

  const tierNum = computed(() => (sheetData.tier ? sheetData.tier.length : 0));

  const sentenceText = computed(() => {
    console.log('js lists', [sheetData.value.descriptors]);
    return `Is a ${characterUtils.getSelectedItemsListText(
      sheetData.value.descriptors,
      '[-descriptors-]',
    )} ${characterUtils.getSelectedItemsListText(
      sheetData.value.types,
      '[-types-]',
    )} who ${characterUtils.getSelectedItemsListText(
      sheetData.value.foci,
      '[-foci-]',
    )} ${
      sheetData.value.flavors
        ? 'flavored with,' +
          characterUtils.getSelectedItemsListText(sheetData.value.flavors, '')
        : ''
    }`;
  });

  const lastTier = computed(
    () =>
      sheetData.value.advancements[sheetData.value.advancements.length - 1] ??
      null,
  );
  const tierButtonText = computed(() => {
    return lastTier.value
      ? `${lastTier.value.name}: ${lastTier.value.tier}`
      : 'Add Tier';
  });
  function handleTierClick(e) {
    console.log(e);
    return emit('editMode', {mode: 'profile'});
  }
  const sheetPortrait = computed(() => {
    return sheetData.value.url
      ? sheetData.value.url
      : '/images/CSOLLogo-CypherSystemCompatible-ColorWhite-Large.png';
  });
</script>

<template>
  <div
    v-if="sheetData"
    class="col-span-12 lg:row-span-4 shadow-xl lg:col-span-3 card card-compact"
  >
    <figure class="relative text-secondary-content my-3">
      <!-- name -->
      <div
        class="absolute text-2xl top-0 left-2 bg-accent bg-opacity-60 text-accent-content p-1 z-20"
      >
        {{ sheetData.name }}
      </div>

      <!-- stats -->

      <img
        class="h-auto w-full bg-accent"
        :src="sheetPortrait"
        alt="character portrait"
      />
    </figure>
    <div class="card-body">
      <div class="card-title">
        <div
          class="justify-around flex w-full bg-accent bg-opacity-40 text-accent-content p-3 z-20"
        >
          <div class="flex flex-col items-center justify-center">
            <span class="pb-1 text-sm font-semibold">Effort</span>
            <div class="w-12 h-12 text-xl btn-lg md:btn-sm btn btn-circle">
              <span class="">{{ sheetData.effort }}</span>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <span class="pb-1 text-sm font-semibold">XP</span>
            <div class="w-12 h-12 text-xl btn-lg md:btn-sm btn btn-circle">
              <span class="">{{ sheetData.xp }}</span>
            </div>
          </div>
        </div>
      </div>
      <p>{{ sentenceText }}</p>
      <div class="flex flex-col justify-center items-center my-3">
        <button
          class="btn btn-primary capitalize text-xs w-full whitespace-nowrap"
          @click="handleTierClick"
        >
          {{ tierButtonText }}
        </button>
        <ul v-if="lastTier" class="steps mt-3">
          <li
            class="step"
            :class="{'step-primary': lastTier?.advancements[index - 1]}"
            v-for="index in 4"
            :key="index"
          ></li>
        </ul>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>
<style lang="postcss">
  .stat-label {
    @apply pb-1 text-sm font-semibold text-secondary-content;
  }
  .input-stat {
    @apply w-12 h-12 text-sm btn btn-circle bg-base-300 text-base-content;
  }
  .btn-stat {
    @apply w-12 h-12 text-sm btn btn-circle bg-base-300 text-base-content;
  }
</style>
