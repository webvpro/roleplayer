<template>
  <div class="w-full h-min-full h-fit bg-neutral">
    <div class="sticky navbar bg-neutral-300">
      <div class="navbar-start">
        <a class="btn btn-ghost normal-case text-3xl"
          ><span class="capitalize">{{ descriptor.name }}</span></a
        >
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end">
        <button class="btn btn-ghost">
          <Icon class="text-3xl" name="radix-icons:cross-2" />
        </button>
      </div>
    </div>
    <p class="p-6 rounded-md border-dashed border-2 border-base-content m-2">
      {{ descriptor.description }}
    </p>
    <div class="tabs w-full pl-2">
      <a
        class="tab tab-bordered text-xl"
        :class="isActiveTab('characteristics')"
        @click="setActiveTab('characteristics')"
        >Characteristics</a
      >
      <a
        class="tab tab-bordered text-xl"
        :class="isActiveTab('links')"
        @click="setActiveTab('links')"
        >Starter Links</a
      >
    </div>
    <div v-if="selectedTab === 'characteristics'" class="p-3">
      <div
        v-for="characteristic in descriptor.characteristics"
        class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
      >
        <label class="text-lg mb-1 font-semibold capitalize">{{
          characteristic.name
        }}</label>

        <p class="">
          {{ characteristic.description }}
        </p>
      </div>
    </div>
    <div v-if="selectedTab === 'links'" class="p-3">
      <div
        v-for="link in descriptor.links"
        class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
      >
        <p>{{ link }}</p>
      </div>
    </div>

    <div class="divider"></div>
  </div>
</template>
<script setup>
  const props = defineProps({
    item: {type: Object, default: () => {}},
    kind: {type: String, default: ''},
  });
  const selectedTab = ref('characteristics');
  const emit = defineEmits(['selected-descriptor']);
  const descriptor = computed(() => props.item);

  const isActiveTab = tab => {
    return tab === selectedTab.value ? 'tab-active text-neutral-600' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
</script>
