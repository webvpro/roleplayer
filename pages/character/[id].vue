<template>
  <div>
    <NuxtLayout name="sheet" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="fixed bottom-0 right-6 z-30">
          <div class="dropdown dropdown-top dropdown-end">
            <label
              tabindex="0"
              class="my-6 ml-auto btn btn-circle btn-primary text-lg"
            >
              <Icon name="mdi:account-cog" />
            </label>
            <div tabindex="0" class="dropdown-content shadow w-56 rounded-box">
              <CharacterMenuSettings @editMode="onEditMode" />
            </div>
          </div>
        </div>
        <div class="m-auto snap-start container">
          <div
            class="drawer-content my-6 pb-3 grid grid-cols-12 gap-2 mx-auto grid-flow-row-dense h-min-full h-fit"
          >
            <LazyCharacterSheetAvatar
              :character="sheet"
              @edit-mode="onEditMode"
            />
            <LazyCharacterSheetPools
              :pools="character?.pools"
              :recovery="character?.recovery"
              @update-pools="handlePoolChange"
            />
            <CharacterSheetListSkills
              selected="skills"
              :tab-data="skillCardData"
            />
          </div>
        </div>
      </template>
      <template #drawer-side>
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div class="w-1/3 bg-secondary text-secondary-content min-h-full h-fit">
          <div class="navbar h-auto">
            <div class="navbar-start">
              <a class="btn btn-ghost normal-case text-xl">{{
                editDrawerContent?.label
              }}</a>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div class="m-3">
            <component
              :is="editDrawerContent.component"
              :character="sheet"
              :compendium="compendium"
              @open-modal="openSheetModal"
              @update-character="onCharacterUpdate"
            />
          </div>
          <div
            class="sticky justify-items-center w-full bottom-0 right-0 p-3 bg-secondary text-secondary-content z-30"
          >
            <button class="btn" @click="onClose">Close</button>
            <button name="submit" type="Submit" class="btn btn-active">
              Save
            </button>
          </div>
        </div>
      </template>
      <template #sheet-modal>
        <component
          :is="modalContent.component"
          :kind="modalContent.kind"
          :item="modalContent.item"
          :action="modalContent.action"
          @selected-item="onModalSelect"
        />
        <div
          class="sticky modal-action bottom-0 right-0 p-3 bg-neutral-300 bg-opacity-50 justify-center w-full z-30"
        >
          <button
            class="btn btn-success capitalize"
            @click="onModalAddItemClick"
          >
            Add {{ modalContent.label }}
          </button>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  //test
  const route = useRoute();
  definePageMeta({
    layout: false,
  });
  const {myCharacters, character} = useMyCharacter({
    loadCharacterId: route.params.id,
  });
  const characterUtils = utilsCharacters();

  const initModalContent = {
    component: null,
    kind: 'default',
    item: {},
  };
  function onModalSelect(e) {
    console.log('modal click');
  }

  const drawerContent = {
    PROFILE: {
      label: 'Profile',
      component: resolveComponent('CharacterSheetEditProfile'),
    },
    ABILITIES: {
      label: 'Abilities',
      component: resolveComponent('CharacterSheetEditAbilities'),
    },
    SKILLS: {
      label: 'Skills',
      component: resolveComponent('CharacterSheetEditSkills'),
    },
    EQUIPMENT: {
      label: 'Equipment',
      component: resolveComponent('CharacterSheetEditEquipment'),
    },
  };

  const modalContent = reactive(initModalContent);
  const {compendium, fetchCompendium} = useCompendium();
  await fetchCompendium();
  const sheet = reactive(characterUtils.initCharacter());
  provide('characterData', {sheet});
  const collections = reactive(compendium.value.collections);
  provide('collectionsData', {collections});

  const toggleDetailDrawer = ref(false);

  const editDrawerContent = reactive({});

  const skillCardData = computed(() => ({
    skills: sheet?.skills ?? [],
    powerShifts: sheet?.powerShifts ?? [],
    attacks: sheet?.attacks ?? [],
  }));

  const characterSentence = computed(() => {
    return `Is a ${characterUtils.getSelectedItemsListText(
      sheet.value.descriptors,
      '[-descriptors-]',
    )} ${characterUtils.getSelectedItemsListText(
      sheet.value.types,
      '[-types-]',
    )} who ${characterUtils.getSelectedItemsListText(
      sheet.value.foci,
      '[-foci-]',
    )} ${
      sheet.value.flavors
        ? 'flavored with,' +
          characterUtils.getSelectedItemsListText(sheet.value.flavors, '')
        : ''
    }`;
  });

  function onEditMode(data) {
    const modeData = drawerContent[data.mode.toUpperCase()];
    console.log(modeData);
    editDrawerContent.label = modeData.label;
    editDrawerContent.component = modeData.component;
    toggleDetailDrawer.value = true;
  }
  function openProfile() {
    toggleDetailDrawer.value = true;
  }

  function onCharacterUpdate(updateData) {
    console.log('onCharacterUpdate', updateData);
    character.value = {...character.value, ...updateData};
  }

  function openAbilities() {
    editDrawerContent.component = resolveComponent(
      'CharacterSheetEditAbilities',
    );
    editDrawerContent.label = 'Abilities';
    toggleDetailDrawer.value = true;
  }

  function closeDrawer() {
    toggleDetailDrawer.value = false;
    editDrawerContent.value = {};
  }
  const characterUpdate = (scope, updateData) => {
    if (!scope || !updateData) return;
  };

  function saveCharacterItem(saveData) {
    const updateCharacter = character.value;
    character.value = {...character.value, ...saveData.values};
  }

  function onModalAddItemClick(e) {
    console.log(e);
    const updateCharacter = character.value;
    updateCharacter[modalContent.kind].push(modalContent.item);

    character.value = updateCharacter;
    console.log('updated save', character.value);
  }

  function onModalRemoveItemClick(e) {
    console.log(e);
    const updateCharacter = character.value;
    updateCharacter[modalContent.kind].push(modalContent.item);

    character.value = updateCharacter;
    console.log('updated save', character.value);
  }

  function handlePoolChange(e) {
    const updateIdx = character.value.pools.findIndex(
      pool => pool.key === e.key,
    );
    //character.value.pools = character.value.pools[updateIdx] = e.pool;
    const test = character.value.pools;
    test[updateIdx] = e;
    console.log('update sheet pool:', e, test);
    //const updatePools =  character.value.pools= character.value.pools[character.value.pools]
  }

  function openSheetModal(e) {
    console.log('modal:', e);
    modalContent.kind = e.kind;
    modalContent.item = collections[e.kind].items[e.value];
    modalContent.action = e.action;
    if (e.kind === 'types' && e.action === 'select') {
      modalContent.component = resolveComponent(
        'CharacterSheetModalPreviewType',
      );
      modalContent.label = 'type';
    }
    if (e.kind === 'descriptors' && e.action === 'select') {
      modalContent.component = resolveComponent(
        'CharacterSheetModalPreviewDescriptor',
      );
      modalContent.label = 'descriptor';
    }
    if (e.kind === 'foci' && e.action === 'select') {
      modalContent.component = resolveComponent(
        'CharacterSheetModalPreviewFocus',
      );
      modalContent.label = 'focus';
    }
    if (e.kind === 'types' && e.action === 'edit') {
      modalContent.component = resolveComponent('CharacterSheetModalEditType');
      modalContent.label = 'type';
    }
    if (e.kind === 'descriptors' && e.action === 'edit') {
      modalContent.component = resolveComponent(
        'CharacterSheetModalEditDescriptor',
      );
      modalContent.label = 'descriptor';
    }
    if (e.kind === 'foci' && e.action === 'edit') {
      modalContent.component = resolveComponent('CharacterSheetModalEditFocus');
      modalContent.label = 'focus';
    }
    //console.log(modalContent);
    window.sheet_modal.showModal();
  }
  watch(
    character,
    (cv, ov) => {
      console.log('change watch');
      if (cv) sheet.value = cv;
    },
    {deep: true},
  );
</script>
