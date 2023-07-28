<template>
  <div
    class="collapse card card-compact collapse-plus bg-base text-base-content shadow-md mb-3"
  >
    <input type="checkbox" v-model="viewContent" />
    <div class="collapse-title card-title" @click.prevent="toggleCollapse">
      <h2 class="text-base">Tier {{ tier }}</h2>
      <ul v-if="!viewContent" class="steps">
        <li
          class="step"
          :class="{'step-primary': hasAdvancement(tier, index)}"
          v-for="index in advancementsPerTier"
          :key="index"
        ></li>
      </ul>
    </div>
    <div class="collapse-content">
      <ul class="steps steps-vertical w-full">
        <li
          class="step"
          v-for="i in advancementsPerTier"
          :class="{'step-primary': hasAdvancement(tier, i)}"
          :key="i"
        >
          <div v-if="hasAdvancement(tier, i)" class="text-left w-full p-3">
            <label class="text-lg capitalize">
              {{
                tierAdvancements[tier - 1].advancements[i].key
                  .toLowerCase()
                  .split('_')
                  .join(' ')
              }}
            </label>
            <p class="text-sm">
              {{ tierAdvancements[tier - 1].advancements[i].description }}
            </p>
          </div>
          <div v-else>
            <select
              class="select select-bordered w-full capitalize"
              @change="onAdvancementSelect($event, tier)"
            >
              <option disabled selected>Add Advancement</option>
              <option
                v-for="(advancement, ai) in advancementOptions"
                :key="advancement.key"
                :value="ai"
              >
                <span class="capitalize">{{
                  advancement.key.toLowerCase().split('_').join(' ')
                }}</span>
              </option>
            </select>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    advancements: {type: Array, default: []},
    characterAdvancements: {type: Array, default: []},
    label: {type: String, default: 'Advancements'},
    tier: {type: String, default: '1'},
  });
  const emit = defineEmits([
    'advancement-update',
    'advancement-delete',
    'advancement-add',
  ]);
  const viewContent = ref(false);
  const advancementsPerTier = ref(4);
  const advancementOptions = computed(() => props.advancements);
  const tierAdvancements = reactive(props.characterAdvancements);
  function hasAdvancement(tier, idx) {
    //console.log('tiers taken:', tierAdvancements[tier - 1].advancements[idx]);
    return tierAdvancements[tier - 1].advancements[idx] ? true : false;
  }

  function onStepClick(tier) {
    return tierAdvancements[tier - 1];
  }

  function onAdvancementSelect(e, tier) {
    const val = e.target.value;
    const currentTiers = tierAdvancements;
    currentTiers[tier - 1].advancements.push({
      ...advancementOptions.value[val],
    });
    console.log(currentTiers);
  }

  function toggleCollapse() {
    viewContent.value = !viewContent.value;
  }
</script>
