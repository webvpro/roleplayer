<script setup>
  const {collections} = useCompendium();
  const router = useRouter();
  const route = useRoute();
  const selectedCompendium = ref('csrd');
  const selectedCollection = ref(
    route.name.split('-').slice(-1).join('').trim(),
  );
  const changeCollection = () => {
    //console.log(selectedCollection.value);
    router.push(selectedCollection.value);
  };
  const menuLocation = computed(() =>
    selectedCollection.value
      ? selectedCollection.value.toLowerCase()
      : selectedCompendium.value,
  );
</script>

<template>
  <div class="navbar sticky top-0 z-20 bg-neutral max-h-12">
    <div class="navbar-start">
      <div class="hidden md:block">
        <select
          class="select select-bordered w-auto max-w-xs text-lg"
          v-model="selectedCompendium"
        >
          <option disabled selected>Select Compendium</option>
          <option value="csrd">CSRD Compendium</option>
          <option value="eberron">Eberron Compendium</option>
          <option value="space_jazz">Space Jazz Compendium</option>
        </select>
        <select
          class="select select-bordered w-auto max-w-xs text-lg"
          v-model="selectedCollection"
          @change="changeCollection"
        >
          <option disabled selected>Select Collection</option>
          <option
            v-for="(key, idx) in Object.keys(collections)"
            :value="key"
            :key="idx"
          >
            {{ collections[key].name }}
          </option>
        </select>
      </div>
      <div class="dropdown md:hidden">
        <label
          tabindex="3"
          class="btn btn-sm btn-secondary bordered m-1 capitalize text-secondary-content"
          >{{ menuLocation }}
          <Icon class="text-xl" name="ic:baseline-keyboard-double-arrow-down"
        /></label>
        <ul
          tabindex="3"
          class="dropdown-content menu w-fit p-2 shadow bg-base-100 rounded-box"
        >
          <li>
            <select class="select w-full" v-model="selectedCompendium">
              <option disabled selected>Select Compendium</option>
              <option value="csrd">CSRD Compendium</option>
              <option value="eberron">Eberron Compendium</option>
              <option value="space_jazz">Space Jazz Compendium</option>
            </select>
          </li>
          <li>
            <select
              class="select w-fit"
              v-model="selectedCollection"
              @change="changeCollection"
            >
              <option disabled selected>Select Collection</option>
              <option
                v-for="(key, idx) in Object.keys(collections)"
                :value="key"
                :key="idx"
              >
                {{ collections[key].name }}
              </option>
            </select>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center"><slot /></div>
    <div class="navbar-end"></div>
  </div>
</template>

<style scoped></style>
