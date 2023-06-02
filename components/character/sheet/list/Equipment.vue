<script setup>
  const props = defineProps({
    tabData: {type: Object, default: () => {}},
    selected: {type: String, default: 'skills'},
  });

  const active = ref(props.selected);
  const list = ref(props.tabData[active.value]);
  const selectTab = key => {
    active.value = key;
  };
</script>

<template>
  <div
    class="col-span-12 row-span-3 h-full shadow-xl md:col-span-6 card bg-base-100"
  >
    <div class="card-title tabs">
      <a
        class="tab tab-lifted"
        :class="[active === 'ASSETS' ? 'tab-active' : '']"
        @click.prevent="selectTab('ASSETS')"
        >Assets</a
      >
      <a
        class="tab tab-lifted"
        :class="[active === 'CYPHERS' ? 'tab-active' : '']"
        @click.prevent="selectTab('CYPHERS')"
        >Cyphers</a
      >
      <a
        class="tab tab-lifted"
        :class="[active === 'ARTIFACTS' ? 'tab-active' : '']"
        @click.prevent="selectTab('ARTIFACTS')"
        >Artifacts</a
      >
    </div>
    <div class="card-body">
      <CharacterSheetList :key="active" :item-data="list" :item-type="active" />
    </div>
  </div>
</template>
