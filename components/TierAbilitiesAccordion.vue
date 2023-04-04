<script setup>
  const props = defineProps({
    tier_abilities: {
      type: Map,
      required: true,
    },
    collection: {
      type: String,
      default: 'foci',
    },
    tab_index_bump: {
      type: Number,
      default: 10,
    },
  });
  const collectionTierAbilityText = tier => {
    const tierNum = parseInt(tier.key.split('_').slice(-1));
    if (props.collection === 'foci') {
      return `Choose one of the abilities listed`;
    } else if (props.collection === 'types') {
      console.log(tier);
      return tierNum == 1
        ? `Choose four of the abilities listed below. You can't choose the same ability more than once unless its description says otherwise. The full description for each listed ability can be found in Abilities, which also has descriptions for flavor and focus abilities in a single vast catalog.`
        : `Choose ${tier.limitTxt} of the abilities listed below (or from a lower tier) to add to your repertoire. In addition, you can replace one of your lower-tier abilities with a different one`;
    }
    return '';
  };
  const emit = defineEmits(['SelectedItem']);
  const tierCollapseModel = reactive({});
  const itemClick = id => {
    //console.log(id);
    emit('SelectedItem', id);
  };
  const tierToggle = key => {
    // toggle tiers not working
    console.log(key, tierCollapseModel[key], !tierCollapseModel[key]);
    tierCollapseModel[key] = !tierCollapseModel[key];
  };
  const tierAbilities = computed(() => {
    const tiers = Object.keys(props.tier_abilities);
    const returnAry = [];
    tiers.forEach(tierKey => {
      const {abilities, limit} = props.tier_abilities[tierKey];
      const tierAbilitiesObj = {
        key: '',
        granted: [],
        select: [],
        limitTxt: '',
      };

      if (props.collection === 'types') {
        console.log(limit);
        tierAbilitiesObj.key = tierKey;
        tierAbilitiesObj.granted = [];
        tierAbilitiesObj.select = abilities;
        tierAbilitiesObj.limitTxt = limit.name;
      } else {
        tierAbilitiesObj.key = tierKey;
        tierAbilitiesObj.granted = abilities.granted;
        tierAbilitiesObj.select = abilities.select;
      }
      returnAry.push(tierAbilitiesObj);
    });
    return returnAry;
  });
  onMounted(() => {
    //auto open 1st tier not working
    Object.keys(props.tier_abilities).forEach(key => {
      tierCollapseModel[key] = key == 'tier_1' ? true : false;
    });
  });
</script>

<template>
  <div
    v-for="(tier, idx) in tierAbilities"
    :key="tier.key"
    :id="`collapse_${tier.key}`"
    :tabindex="idx + tab_index_bump"
    @click.prevent="tierToggle(tier.key)"
    class="collapse collapse-arrow text-primary-content m-3 p-0 rounded-md peer-checked:rounded-b-none"
  >
    <input
      :id="`input_${tier.key}`"
      :v-model="tierAbilities[tier.key]"
      type="checkbox"
      class="peer"
    />
    <div
      class="collapse-title text-xl btn rounded-t-md rounded-b-none text-left text-lg text-neutral-content capitalize"
      id="tier.key"
    >
      {{ tier.key.split('_').join(': ') }}
    </div>
    <div :id="`list_${tier.key}`" class="collapse-content bg-primary">
      <div v-if="tier.granted.length" class="">
        <a
          v-for="ability in tier.granted"
          class="capitalize btn btn-ghost text-center text-lg m-3"
          :key="ability"
          @click.stop="itemClick(ability)"
        >
          {{ ability.split('_').join(' ') }}
        </a>
      </div>
      <div v-if="tier.granted.length && tier.select.length" class="divider">
        And
      </div>
      <div v-if="tier.select.length">
        <p
          v-if="collection !== 'flavors'"
          class="p-6 rounded-md bg-secondary text-secondary-content border-2 border-base-content m-2"
        >
          {{ collectionTierAbilityText(tier) }}
        </p>
        <a
          v-for="(ability, sIdx) in tier.select"
          class="capitalize btn btn-ghost m-3 text-center text-lg"
          :key="ability"
          @click.stop="itemClick(ability)"
        >
          {{ ability.split('_').join(' ') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
