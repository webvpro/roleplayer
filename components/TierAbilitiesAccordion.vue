<script setup>
  import {classes} from '@jsonforms/vue-vanilla';

  const props = defineProps({
    tier_abilities: {
      type: Object,
      required: true,
    },
    tier_selection_text: {
      type: Array[Object],
      default: null,
    },
    limits: {
      type: Array[Object],
      default: null,
    },
    tab_index_bump: {
      type: Number,
      default: 10,
    },
  });
  const tierData = props.limits ?? [{key: 'tier', groupsMin: 6}];
  const groupedAbilities = computed(() =>
    groupBy(props.tier_abilities, 'tier', tierData),
  );
  function getGrantedAbilities(abilities) {
    return abilities.filter(ability => ability.preselected);
  }
  function getAbilityOptions(abilities) {
    return abilities.filter(ability => !ability.preselected);
  }
  const tierSelectionText = computed(() => {
    return props.tier_selection_text;
  });

  const tierAccordionName = 'tier-view';
  const emit = defineEmits(['SelectedItem']);
  const tierCollapseModel = reactive({});
  const itemClick = id => {
    emit('SelectedItem', id);
  };
  const tierToggle = key => {
    if (tierCollapseModel[key]) {
      delete tierCollapseModel[key];
    } else {
      tierCollapseModel[key] = !tierCollapseModel[key];
    }
  };
</script>

<template>
  <div
    v-if="groupedAbilities"
    v-for="(tier, idx) in groupedAbilities"
    :key="tier.key"
    :id="`collapse_${tier.key}`"
    @click.prevent="tierToggle(tier.key)"
    class="collapse collapse-arrow m-3 bg-base-200 text-base-content p-0 rounded-md peer-checked:rounded-b-none mx-auto"
    :class="tierCollapseModel[tier.key] ? 'collapse-open' : 'collapse-close'"
  >
    <div
      class="collapse-title text-xl btn-base-200 text-base-content rounded-t-md rounded-b-none text-left capitalize"
    >
      {{ tier.key.split('-').join(': ') }}
    </div>
    <div class="collapse-content">
      <a
        v-for="ability in getGrantedAbilities(tier.items)"
        class="capitalize btn btn-info text-center text-lg m-3"
        :key="ability.key"
        @click.stop="itemClick(ability.key)"
      >
        {{ ability.name }}
      </a>

      <div v-if="getAbilityOptions(tier.items).length > 0">
        <p
          v-if="
            tierSelectionText &&
            Array.isArray(tierSelectionText) &&
            tierSelectionText.length > 0
          "
          class="p-6 rounded-md bg-neutral text-neutral-content border-2 border-base-content m-2"
        >
          {{ tierSelectionText[idx]?.text ?? tierSelectionText[0]?.text ?? '' }}
        </p>
        <a
          v-for="ability in getAbilityOptions(tier.items)"
          class="capitalize btn btn-accent text-accent-content m-3 text-center text-lg"
          :key="ability.key"
          @click.stop="itemClick(ability.key)"
        >
          {{ ability.name }}
        </a>
      </div>
    </div>
  </div>
</template>
