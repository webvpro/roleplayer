<script setup>
  const route = useRoute();
  const {myCharacters, character} = useMyCharacter({
    loadCharacterId: route.params.id,
  });
  const characterUtils = utilsCharacters();
  const toggleDetailDrawer = ref(false);
  const skillCardData = computed(() => {
    return {
      skills: character?.value.skills,
      powerShifts: character?.value.powerShifts,
      attacks: character?.value.attacks,
    };
  });
  const pools = reactive(character.pools);
  const recovery = reactive(character.recovery);

  definePageMeta({
    layout: false,
  });
</script>
<template>
  <div>
    <NuxtLayout name="sheet" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto snap-start container">
          <div
            class="drawer-content grid grid-cols-12 gap-2 mx-auto grid-flow-row-dense h-min-full h-fit"
          >
            <LazyCharacterSheetProfile :character="character" />
            {{ character.pools }}
          </div>
        </div>
      </template>
      <template #drawer-side>
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
          <!-- Sidebar content here -->
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </template>

      <button class="btn btn-info btn-circle btn-sm static bottom-6 right-6">
        <Icon name="material-symbols:settings" />
      </button>
    </NuxtLayout>
  </div>
</template>
