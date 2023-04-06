<template>
  <div class="drawer drawer-end h-full mb-3 w-auto">
    <input
      id="item-details"
      type="checkbox"
      class="drawer-toggle"
      v-model="toggleDetailDrawer"
    />
    <div class="drawer-content">
      <BrowseToolBar />
      <div class="mx-auto snap-start container">
        <div
          class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="creatureKey in Object.keys(creatures)"
            class="shadow-xl p-3 card card-compact w-full bg-base-100 h-96 min-w-98 sm:mb-2"
            :key="artifactKey"
          >
            <h2 class="card-title capitalize">
              {{ creatures[creatureKey].name }}
            </h2>
            <div class="card-body">
              <div class="mx-auto snap-start container h-14">
                <div
                  v-if="creatures[creatureKey].level"
                  class="badge badge-accent m-1"
                >
                  {{ `Level: ${creatures[creatureKey].level}` }}
                </div>
                <div
                  v-if="creatures[creatureKey].kind"
                  class="badge badge-accent m-1 capitalize"
                >
                  {{ creatures[creatureKey].kind }}
                </div>
                <div
                  v-if="creatures[creatureKey].health"
                  class="badge badge-success m-1"
                >
                  {{ `Health:${creatures[creatureKey].health}` }}
                </div>
                <div
                  v-if="creatures[creatureKey].damage"
                  class="badge badge-error m-1"
                >
                  {{ `Damage:${creatures[creatureKey].damage}` }}
                </div>
              </div>
              <div
                v-if="creatures[creatureKey].description"
                class="line-clamp-5 w-64 p-2 mb-1 h-36"
              >
                <p
                  class="indent-3 line-clamp-5 my-2"
                  v-for="pTxt in getParagraphAry(
                    creatures[creatureKey].description,
                  )"
                >
                  {{ pTxt }}
                </p>
              </div>
              <div class="card-actions justify-end mt-2">
                <button
                  class="btn btn-primary"
                  @click="getSelectedItem(creatureKey)"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="item-details" class="drawer-overlay"></label>
      <div
        v-if="selectedItem"
        class="w-96 md:w-2/3 bg-secondary text-secondary-content"
      >
        <div class="navbar h-16">
          <div class="navbar-start">
            <a class="btn btn-ghost text-xl capitalize">{{
              selectedItem.name
            }}</a>
          </div>
          <div class="navbar-end">
            <button class="btn btn-ghost" @click="closeDrawer">
              <Icon class="text-lg" name="radix-icons:cross-2" />
            </button>
          </div>
        </div>
        <div v-if="selectedItem" class="m-3">
          <div class="mx-auto snap-start container h-14 text-lg">
            <div
              v-if="selectedItem.level"
              class="badge badge-neutral text-neutral-content m-1"
            >
              {{ `Level: ${selectedItem.level}` }}
            </div>
            <div
              v-if="selectedItem.kind"
              class="badge badge-neutral text-neutral-content m-1 capitalize"
            >
              {{ selectedItem.kind }}
            </div>
            <div v-if="selectedItem.health" class="badge badge-success m-1">
              {{ `Health:${selectedItem.health}` }}
            </div>
            <div v-if="selectedItem.damage" class="badge badge-error m-1">
              {{ `Damage:${selectedItem.damage}` }}
            </div>
          </div>
          <div
            v-if="selectedItem.description"
            class="bg-neutral text-neutral-content border-accent border-solid border-2 p-2"
          >
            <p
              class="indent-2 mb-3"
              v-for="pTxt in getParagraphAry(selectedItem.description)"
            >
              {{ pTxt }}
            </p>
          </div>

          <div class="tabs w-full pl-2 mt-3">
            <a
              class="tab tab-bordered text-xl"
              :class="isActiveTab('details')"
              @click="setActiveTab('details')"
              >Details</a
            >
            <a
              v-if="selectedItem.combat || selectedItem.modifications"
              class="tab tab-bordered text-xl"
              :class="isActiveTab('actions')"
              @click="setActiveTab('actions')"
              >Actions</a
            >

            <a
              v-if="selectedItem.intrusions"
              class="tab tab-bordered text-xl"
              :class="isActiveTab('intrusions')"
              @click="setActiveTab('intrusions')"
              >Intrusions</a
            >
          </div>
          <div v-if="selectedTab === 'details'" class="p-3 pt-0">
            <div
              v-if="selectedItem.motive"
              class="p-6 border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
            >
              <label class="text-2xl p-1 font-semibold w-full block"
                >Motive</label
              >
              <p class="indent-3">{{ selectedItem.motive }}</p>
            </div>
            <div
              class="p-6 border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
            >
              <label class="text-2xl p-1 font-semibold w-full block"
                >Stats</label
              >
              <div
                class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-lg"
              >
                Health:
                {{ selectedItem.health > 0 ? selectedItem.health : ` GM Set` }}
              </div>
              <div
                class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-xl"
              >
                Damage:
                {{
                  parseInt(selectedItem.damage) > 0
                    ? selectedItem.damage
                    : ` GM Set `
                }}
              </div>
              <div
                class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-lg"
              >
                Armor: {{ selectedItem.armor ?? 0 }}
              </div>
              <div
                class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-lg"
              >
                Movement: {{ selectedItem.movement ?? ` GM Set ` }}
              </div>
            </div>
          </div>
          <div v-if="selectedTab === 'actions'" class="p-3 pt-0">
            <h3 v-if="selectedItem.combat" class="my-2 font-bold">Combat:</h3>
            <p
              v-if="selectedItem.combat"
              v-for="combat in selectedItem.combat"
              class="p-2 rounded-md border-dashed border-2 border-base-content m-2"
            >
              {{ combat }}
            </p>
            <h3 v-if="selectedItem.modifications" class="my-2 font-bold">
              Modifications:
            </h3>
            <p
              v-for="mod in selectedItem.modifications"
              class="p-2 rounded-md border-dashed border-2 border-base-content m-2"
            >
              {{ mod }}
            </p>
          </div>
          <div v-if="selectedTab === 'intrusions'" class="p-3 pt-0">
            <p
              v-if="selectedItem.intrusions"
              v-for="intrusion in selectedItem.intrusions"
              class="p-3 rounded-md border-dashed border-2 border-base-content m-3"
            >
              {{ intrusion }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const {compendium} = useCompendium('csrd');
  const toggleDetailDrawer = ref(false);
  const selectedTab = ref('details');
  //const drawerTabs = reactive(initTabs);
  const creatures = computed(
    () => compendium.value.collections.creatures.items,
  );

  const selectedItem = ref(null);

  watch(selectedItem, value => {
    if (!value) {
      toggleDetailDrawer.value = false;
    } else {
      toggleDetailDrawer.value = true;
    }
    setActiveTab('details');
  });
  const getSelectedItem = id => {
    selectedItem.value = compendium.value.collections.creatures.items[id];
  };
  const closeDrawer = () => {
    selectedItem.value = null;
  };
  const getParagraphAry = pStr => {
    return pStr.split('\n') ?? [];
  };
  const isActiveTab = tab => {
    return tab === selectedTab.value ? 'tab-active text-neutral-600' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
</script>
