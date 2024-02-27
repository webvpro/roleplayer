<template>
  <div>
    <NuxtLayout name="create" :open-drawer="toggleCreateDrawer">
      <template #main-content>
        <button
          v-if="!toggleCreateDrawer"
          tabindex="0"
          class="fixed bottom-0 right-6 z-10 my-6 ml-auto btn btn-circle btn-primary text-lg"
          @click.prevent="onCreateClick"
        >
          <Icon name="streamline:add-1-solid" />
        </button>

        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            {{ myCompendiums }}
          </div>
        </div>
      </template>
      <template #drawer-side>
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div
          v-if="newCompendium"
          name="create_compendium"
          class="w-10/12 md:3/4 lg:w-1/2 xxl:1/4 bg-neutral text-neutral-content border-neutral-content min-h-full"
          @submit.prevent="onSubmit"
        >
          <div class="sticky z-50 navbar h-16">
            <div class="navbar-start">
              <label class="btn btn-ghost text-xl capitalize">
                Create a Compendium
              </label>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost mr-3" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>

          <ClientOnly>
            <FormNewCompendium @onSubmit="onSubmit" />
          </ClientOnly>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const route = useRoute();

  const toggleCreateDrawer = ref(false);
  const {compendiums} = useMyCompendium();
  const myCompendiums = ref(compendiums.value);
  const newCompendium = reactive({
    name: '',
    description: '',
  });
  const newCompendiumErrors = ref([]);

  const formScheme = utilsCompendiumScheme().scheme;
  const formUiScheme = utilsCompendiumScheme().uiScheme;

  const onCreateClick = () => {
    toggleCreateDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleCreateDrawer.value = false;
  };

  const onSubmit = event => {
    console.log('form submit', event);
  };
  const onChange = JsonFormsChangeEvent => {
    console.log(JsonFormsChangeEvent);
    newCompendium.value = JsonFormsChangeEvent.data;
    newCompendiumErrors.value = JsonFormsChangeEvent.errors;
  };
  useHead({
    title: `PlayCypher.com - Your Compendiums`,
    meta: [],
  });
  definePageMeta({
    layout: false,
    middleware: ['auth'],
  });
</script>
