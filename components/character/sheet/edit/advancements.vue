<template>
  <div
    class="collapse card card-compact collapse-plus bg-neutral-300 text-neutral-content-600 shadow-md mb-3"
  >
    <input type="checkbox" v-model="viewContent" />
    <div class="collapse-title card-title" @click="toggleCollapse">
      <span class="text-sm capitalize">{{ `Tier: ${tier}` }}</span>
      {{ advancements }}
      <ul v-if="!viewContent" class="steps">
        <li class="step step-primary"></li>
        <li class="step step-primary"></li>
        <li class="step"></li>
        <li class="step"></li>
      </ul>
    </div>
    <div class="collapse-content">
      <ul class="steps steps-vertical">
        <li class="step step-primary">Register</li>
        <li class="step step-primary">Choose plan</li>
        <li class="step">Purchase</li>
        <li class="step">Receive Product</li>
      </ul>
      <div class="join mx-auto">
        <button class="btn join-item">Button</button>
        <button class="btn join-item">Button</button>
        <button class="btn join-item">Button</button>
        <button class="btn join-item">Button</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {number} from 'yup';

  const props = defineProps({
    advancements: {type: Array, default: []},
    characterAdvancements: {type: Array, default: []},
    label: {type: String, default: 'Advancements'},
    tier: {type: Number, default: 1},
  });
  const viewContent = ref(false);
  const advancementsPerTier = ref(4);
  function toggleCollapse() {
    viewContent.value = !viewContent.value;
  }
</script>
