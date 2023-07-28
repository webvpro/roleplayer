<template>
  <div class="w-full min-h-full h-fit">
    <div class="navbar">
      <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-3xl">{{ type.name }}</a>
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end">
        <button class="btn btn-ghost" @click="closeDrawer">
          <Icon class="text-3xl" name="radix-icons:cross-2" />
        </button>
      </div>
    </div>
    <div class="divider"></div>
    <div class="m-3">
      <div
        class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
      >
        {{ type.description }}
      </div>

      <div class="tabs w-full pl-2">
        <a
          class="tab tab-bordered text-xl"
          :class="isActiveTab('features')"
          @click="setActiveTab('features')"
          >Features</a
        >
        <a
          class="tab tab-bordered text-xl"
          :class="isActiveTab('intrusions')"
          @click="setActiveTab('intrusions')"
          >Intrusions</a
        >
        <a
          class="tab tab-bordered text-xl"
          :class="isActiveTab('backgrounds')"
          @click="setActiveTab('backgrounds')"
          >Backgrounds</a
        >
      </div>
      <div v-if="selectedTab === 'features'" class="p-3">
        <div
          class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
        >
          <label class="text-lg p-1 font-semibold w-full block">Pools</label>
          <div
            v-for="(poolKey, apIdx) in Object.keys(type.starting_pools)"
            class="badge badge-accent p-2 text-accent-content m-1 text-start md:text-lg"
            :key="apIdx"
          >
            {{ poolKey }}: {{ type.starting_pools[poolKey] }}
          </div>
        </div>
        <div
          v-for="feature in type.starting_features"
          class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
        >
          <p>{{ feature.description }}</p>
        </div>
      </div>
      <div v-if="selectedTab === 'intrusions'" class="p-3">
        <div
          v-for="intrusion in type.intrusions"
          class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
        >
          <label class="text-lg mb-1 font-semibold">{{ intrusion.name }}</label>
          <p>{{ intrusion.description }}</p>
        </div>
      </div>
      <div v-if="selectedTab === 'backgrounds'">
        <div
          v-for="background in type.backgrounds"
          class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
        >
          {{ background }}
        </div>
      </div>
      <div class="divider"></div>
      <TierAbilitiesAccordion
        :tier_abilities="type.tier_abilities"
        collection="types"
      />
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    item: {type: Object, default: () => {}},
    kind: {type: String, default: ''},
  });
  const selectedTab = ref('features');
  const type = computed(() => props.item);
  const isActiveTab = tab => {
    return tab === selectedTab.value ? 'tab-active text-neutral-600' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
</script>
