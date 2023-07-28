<script setup>
  const props = defineProps({
    tabData: {type: Object, default: () => {}},
    selected: {type: String, default: ''},
  });

  const active = ref(props.selected);
  const list = ref(props.tabData[active.value]);
  const selectTab = key => {
    active.value = key;
  };
</script>

<template>
  <div class="col-span-12 h-full shadow-xl lg:col-span-3 card bg-base-100">
    <div class="card-title tabs">
      <a
        class="tab tab-lifted"
        :class="[active === 'SKILLS' ? 'tab-active' : '']"
        @click.prevent="selectTab('SKILLS')"
        >Skills</a
      >
      <a
        class="tab tab-lifted"
        :class="[active === 'ABILITIES' ? 'tab-active' : '']"
        @click.prevent="selectTab('ABILITIES')"
        >Abilities</a
      >
      <a
        class="tab tab-lifted"
        :class="[active === 'POWERSHIFTS' ? 'tab-active' : '']"
        @click.prevent="selectTab('POWERSHIFTS')"
        >Power Shifts</a
      >
    </div>
    <div class="card-body">
      <CharacterSheetList :key="active" :item-data="list" :item-type="active" />
    </div>
  </div>
</template>
