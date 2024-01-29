<script setup>
  const props = defineProps({
    tier_abilities: {
      type: Map,
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
  const collectionTierAbilityText = tier => {
    const tierNum = parseInt(tier.key.split('_').slice(-1));
    if (!props.limits) {
      return `Choose one of the abilities listed`;
    } else {
      //console.log(tier);
      return tierNum == 1
        ? `Choose four of the abilities listed below. You can't choose the same ability more than once unless its description says otherwise. The full description for each listed ability can be found in Abilities, which also has descriptions for flavor and focus abilities in a single vast catalog.`
        : `Choose ${
            tier.limit ?? 1
          } of the abilities listed below (or from a lower tier) to add to your repertoire. In addition, you can replace one of your lower-tier abilities with a different one`;
    }
    return '';
  };
  const tierAccordionName = 'tier-view';
  const emit = defineEmits(['SelectedItem']);
  const tierCollapseModel = reactive({});
  const itemClick = id => {
    emit('SelectedItem', id);
  };
  const tierToggle = key => {
    tierCollapseModel[key] = !tierCollapseModel[key];
  };
</script>

<template>
  <div v-if="groupedAbilities">
    <div
      v-for="(tier, idx) in groupedAbilities"
      :key="tier.key"
      :id="`collapse_${tier.key}`"
      :tabindex="idx + tab_index_bump"
      @click.prevent="tierToggle(tier.key)"
      class="collapse collapse-arrow m-3 bg-primary p-0 rounded-md peer-checked:rounded-b-none"
    >
      <input type="radio" :name="tierAccordionName" />
      <div
        class="collapse-title text-xl btn-primary rounded-t-md rounded-b-none text-left text-primary-content capitalize"
        id="tier.key"
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
            class="p-6 rounded-md bg-secondary text-secondary-content border-2 border-base-content m-2"
          >
            {{
              tierSelectionText[idx]?.text ?? tierSelectionText[0]?.text ?? ''
            }}
          </p>
          <a
            v-for="ability in getAbilityOptions(tier.items)"
            class="capitalize btn btn-base-100 m-3 text-center text-lg"
            :key="ability.key"
            @click.stop="itemClick(ability.key)"
          >
            {{ ability.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
