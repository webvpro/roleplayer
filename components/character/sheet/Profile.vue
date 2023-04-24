<script setup>
  import advancements from '@/JSON/advancements.json';
  const props = defineProps({
    character: {type: Object, default: () => {}},
  });

  const tierNum = computed(() => props.character.tier.length);

  const advancementSteps = ref(advancements);
</script>

<template>
  <div
    v-if="character"
    class="col-span-12 shadow-xl h-full md:h-fit lg:col-span-6 card md:card-side bg-base-100"
  >
    <figure
      class="flex-col items-center w-full h-full bg-neutral text-neutral-content"
    >
      <Icon
        v-if="!character.url"
        class="object-fill w-full h-full p-12"
        name="gala:portrait2"
      />

      <img
        v-if="character.url"
        class="object-fill h-full width-full"
        :src="character.url"
      />
    </figure>
    <div class="container mx-auto card-body">
      <h2 class="w-full text-xl text-center text-ellipsis card-title">
        {{ character.name }}
      </h2>
      <p class="">
        <span>Is a, </span
        ><span class="descriptor">{{ character.descriptor ?? '' }}</span
        ><span class="sub-descriptor">{{ '' }}</span
        ><span class="type-alias">{{ character.type ?? '' }}</span
        >who<span class="focus"> Makes Magical Objects</span>
      </p>
      <div class="justify-around flex">
        <div class="flex flex-col items-center justify-center">
          <span class="pb-1 text-base font-semibold">Tier</span>
          <div class="w-12 h-12 text-xl btn-sm md:btn-xl btn btn-circle">
            <span class="">{{ tierNum }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="pb-1 text-base font-semibold">Effort</span>
          <div class="w-12 h-12 text-xl btn-sm md:btn-xl btn btn-circle">
            <span class="">{{ character.effort ?? '' }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="pb-1 text-base font-semibold">XP</span>
          <div class="w-12 h-12 text-xl btn-sm md:btn-xl btn btn-circle">
            <span class="">{{ character.xp ?? '' }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center my-3 justify-center">
        <label class="text-base font-semibold m-1">Advancements</label>
        <ul class="steps w-full">
          <li data-content="" class="step step-neutral"></li>
          <li data-content="" class="step step-neutral"></li>
          <li data-content="" class="step step-neutral"></li>
          <li data-content="" class="step step-neutral"></li>
        </ul>
      </div>
      <div class="card-actions w-full flex flex-col items-end">
        <button class="btn btn-info btn-sm text">
          <Icon name="material-symbols:settings" />
        </button>
      </div>
    </div>
  </div>
</template>
