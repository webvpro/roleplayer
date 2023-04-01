<script setup>
  const props = defineProps({
    tier_abilities: {
      type: Map,
      required: true,
    },
    collection: {
      type: String,
      default: 'i',
    },
    tab_index_bump: {
      type: Number,
      default: 10,
    },
  });
  const collectionTierAbilityText = tier => {
    const tierNum = parseInt(tier.key.split('_').slice(-1));
    if (props.collection === 'i') {
      return `Choose one of the abilities listed`;
    } else if (props.collection === 'types') {
      return tierNum == 1
        ? `Choose four of the abilities listed below. You can't choose the same ability more than once unless its description says otherwise. The full description for each listed ability can be found in Abilities, which also has descriptions for flavor and us abilities in a single vast catalog.`
        : `Choose ${tier.limit} of the abilities listed below (or from a lower tier) to add to your repertoire. In addition, you can replace one of your lower-tier abilities with a different one`;
    }
    return null;
  };
  const emit = defineEmits(['SelectedItem']);
  const itemClick = id => {
    console.log(id);
    emit('SelectedItem', id);
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
        limit: 1,
      };

      console.log(abilities);
      if (props.collection == 'types') {
        tierAbilitiesObj.key = tierKey;
        tierAbilitiesObj.granted = [];
        tierAbilitiesObj.select = abilities;
        tierAbilities.limit = limit.name;
      } else {
        tierAbilitiesObj.key = tierKey;
        tierAbilitiesObj.granted = abilities.granted;
        tierAbilitiesObj.select = abilities.select;
      }
      returnAry.push(tierAbilitiesObj);
    });
    return returnAry;
  });
</script>

<template>
  <div
    v-for="(tier, idx) in tierAbilities"
    :key="tier.key"
    :tabindex="idx + tab_index_bump"
    class="collapse bg-primary text-primary-content rounded-md m-3"
  >
    <input type="checkbox" />
    <div class="collapse-title text-xl">
      <button class="btn text-left text-lg text-neutral-content capitalize">
        {{ tier.key.split('_').join(': ') }}
      </button>
    </div>
    <div class="collapse-content rounded-md m-3">
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
          v-if="!!collectionTierAbilityText(tier)"
          class="p-6 rounded-md bg-primary text-primary-content border-2 border-base-content m-2"
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
