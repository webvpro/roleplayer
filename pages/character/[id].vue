<script setup>
  const route = useRoute();
  const {myCharacters, character} = useMyCharacter({
    loadCharacterId: route.params.id,
  });
  const characterUtils = utilsCharacters();
  const skillCardData = computed(() => {
    return {
      skills: character?.value.skills,
      powerShifts: character?.value.powerShifts,
      attacks: character?.value.attacks,
    };
  });
</script>
<template>
  <div v-if="character" class="h-full drawer drawer-end">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div
      class="drawer-content w-full grid grid-cols-12 gap-2 mx-auto grid-flow-row-dense"
    >
      <LazyCharacterSheetProfile :character="character" />

      <LazyCharacterSheetPools
        :pools="character.pools"
        :recovery="character.recovery"
      />
      <CharacterSheetListSkills :tab-data="skillCardData" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</template>
