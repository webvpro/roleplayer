<script setup>
  import advancements from '@/JSON/advancements.json';
  const props = defineProps({
    character: {type: Object, default: () => {}},
  });

  const restTracker = ref([
    {id: 'rest-action', label: 'Action', used: false},
    {id: 'rest-ten-min', label: '1O mins', used: false},
    {id: 'rest-1-hr', label: '1 hour', used: false},
    {id: 'rest-ten-hrs', label: '1O hrs', used: false},
  ]);

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
      ? props.character.descriptors.join(',')
      : '[-descriptors-]',
  );
  const fociTxt = computed(() =>
    props.character.foci.map(focus => foci.name)
      ? props.character.foci.map(focus => focus.name).join(',')
      : '[-foci-]',
  );

  const typeTxt = computed(() =>
    props.character.types.map(type => type.name).join(',')
      ? props.character.types.map(type => type.name).join(',')
      : '[-types-]',
  );

  const sentenceText = computed(() => {
    if (props?.sentence) return props.sentence;

    const descriptorTxt = props.character.descriptors
      .map(descriptor => descriptor.name)
      .join(',')
      ? props.character.descriptors.map(type => type.name).join(',')
      : '[-descriptor-]';
    const fociTxt = props.character.foci.map(focus => focus.name).join(',')
      ? props.character.foci.map(focus => focus.name).join(',')
      : '[-focus-]';

    const typeTxt = props.character.types.map(type => type.name).join(',')
      ? props.character.descriptors.map(type => type.name).join(',')
      : '[-type-]';

    return `is a ${descriptorTxt} ${typeTxt} who ${fociTxt}`;
  });

  console.log(sentenceText);
  const advancementSteps = ref(advancements);
</script>

<template>
  <div
    v-if="character"
    class="col-span-12 lg:row-span-3 shadow-xl lg:col-span-3 card card-compact"
  >
    <figure class="bg-secondary h-auto relative text-secondary-content">
      <!-- name -->
      <div
        class="absolute text-4xl top-1 left-2 bg-accent bg-opacity-60 text-accent-content p-3 z-20"
      >
        {{ character.name }}
      </div>

      <!-- stats -->

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
      <img class="lg:h-56 w-full" :src="characterImg" alt="Shoes" />
    </figure>
    <div class="card-body">
      <p>
        {{ sentenceText }}
      </p>
      <ul class="steps">
        <li data-content="1" class="step step-secondary"></li>
        <li data-content="2" class="step"></li>
        <li data-content="3" class="step"></li>
        <li data-content="4" class="step"></li>
      </ul>
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
