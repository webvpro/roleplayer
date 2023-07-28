<template>
  <VeeForm
    v-slot="{values, handleSubmit, handleReset}"
    :validation-schema="profileScheme"
    :initial-values="initialValues"
    class="bg-neutral text-neutral-content"
    as="div"
  >
    <form @submit.prevent="handleSubmit($event, onSubmit)" class="h-full p-6">
      <input type="submit" class="hidden" />
      <div class="join join-vertical input-bordered my-3 w-full">
        <label for="name" class="input-label">
          <span class="label-text">Name</span>
        </label>
        <VeeField
          type="text"
          name="name"
          placeholder="Type name here"
          class="join-item bg-neutral text-neutral-content"
          validate-on-change="true"
        />

        <ErrorMessage name="name" class="join-item" />
      </div>
      <div class="join join-vertical input-bordered my-3 w-full">
        <label class="input-label">
          <span class="label-text">Image URL</span>
        </label>
        <VeeField
          type="text"
          name="url"
          placeholder="Type name here"
          class="join-item bg-neutral text-neutral-content"
        />

        <ErrorMessage name="url" class="join-item" />
      </div>

      <div class="join input-bordered w-full my-3">
        <label class="input-label w-1/4">
          <span class="label-text">XP</span>
        </label>
        <VeeField
          type="number"
          name="xp"
          min="0"
          max="10"
          size="2"
          class="join-item bg-neutral text-neutral-content w-1/4"
          validate-on-change="true"
        />

        <label class="input-label w-1/4">
          <span class="label-text">Effort</span>
        </label>
        <VeeField
          type="number"
          name="effort"
          min="0"
          max="6"
          size="2"
          class="join-item bg-neutral text-neutral-content w-1/4"
          validate-on-change="true"
        />
      </div>

      <InputPoolStats
        v-for="(pool, index) in sheet.pools"
        :pool="pool"
        @pool-change="changeValue"
      />
      <div class="divider"></div>
      <h1 class="text-xl">Recovery (#d6+#)</h1>
      <div class="join join-horizontal input-bordered my-3 w-full">
        <label class="join-item input-label w-5/12 capitalize"
          ><span class="label-text">(#)d6</span></label
        >
        <input
          type="number"
          name="die"
          min="0"
          max="100"
          size="3"
          class="join-item bg-neutral text-neutral-content"
          v-model="characterRecovery.die"
          @change.prevent="handleRecoveryChange"
        />
        <label class="input-label join-item"
          ><span class="label-text">+(#)</span></label
        >
        <input
          type="number"
          name="mod"
          min="0"
          max="100"
          size="3"
          v-model="characterRecovery.mod"
          class="join-item bg-neutral text-neutral-content"
          @change.prevent="handleRecoveryChange"
        />
      </div>
      <div class="divider"></div>
      <h1 class="text-xl">Sentence</h1>
      <p
        class="w-full border-2 border-neutral-400 p-3 indent-3 border-dashed my-3"
      >
        {{ sentence }}
      </p>
      <div class="m-3">
        <h1 class="text-base">Descriptors</h1>
        <div
          class="w-full border-2 border-neutral-400 p-3 indent-3 border-dashed my-3 text-sm"
        >
          <div v-if="characterDescriptors.length >= 1">
            <div
              v-for="descriptor in characterDescriptors"
              class="btn btn-ghost btn-sm capitalize"
            >
              {{ descriptor.name }}
            </div>
          </div>
          <div v-else class="">None Added</div>
        </div>
        <InputPicker
          :collection="collections?.descriptors"
          label="Descriptor"
          @item-click="onPickerClick"
        />
      </div>
      <div class="m-3">
        <h1 class="text-base">Types</h1>
        <div
          class="w-full border-2 border-neutral-400 p-3 indent-3 border-dashed my-3 text-sm"
        >
          <div v-if="characterTypes.length >= 1">
            <div
              v-for="pcType in characterTypes"
              class="btn btn-ghost btn-sm capitalize"
            >
              {{ pcType.name }}
            </div>
          </div>
          <div v-else class="">None Added</div>
        </div>
        <InputPicker
          :collection="collections?.types"
          label="Type"
          @item-click="onPickerClick"
        />
      </div>
      <div class="m-3">
        <h1 class="text-base">Foci</h1>
        <div
          class="w-full border-2 border-neutral-400 p-3 indent-3 border-dashed my-3 text-sm"
        >
          <div
            v-if="characterFoci.length >= 1"
            class="flex flex-wrap justify-start"
          >
            <div
              v-for="focus in characterFoci"
              class="btn btn-ghost btn-sm capitalize"
            >
              {{ focus.name }}
            </div>
          </div>
          <div v-else class="">None Added</div>
        </div>
        <InputPicker
          :collection="collections?.foci"
          label="Focus"
          @item-click="onPickerClick"
        />
      </div>
      <div class="divider"></div>
      <h1 class="text-xl">Tiers and Advancements</h1>
      <!-- button form controls -->
      <CharacterSheetEditAdvancementTracks
        v-for="(tier, idx) in characterAdvancements"
        :key="idx"
        :advancements="collections.advancements"
        :character-advancements="characterAdvancements"
        :tier="tier.tier"
      />
      <button class="btn btn-primary w-full" @click.prevent="onAddTier">
        Add Tier Track
      </button>
    </form>
  </VeeForm>
</template>

<script setup>
  import {
    useForm,
    useField,
    Field as VeeField,
    Form as VeeForm,
    ErrorMessage,
    configure,
  } from 'vee-validate';
  import * as yup from 'yup';

  const props = defineProps({
    character: {type: Object, default: () => {}},
    compendium: {type: Object, default: () => {}},
    editedBy: {type: String, default: 'owner'},
    sentence: {type: String, default: ''},
  });
  const characterUtils = utilsCharacters();
  const sheet = reactive(props.character.value);
  const characterFoci = computed(() => sheet.foci ?? []);
  const characterTypes = computed(() => sheet.types ?? []);
  const characterDescriptors = computed(() => sheet.descriptors ?? []);
  const characterRecovery = computed(() => sheet.recovery ?? {});
  const characterAdvancements = computed(() => sheet.advancements ?? []);
  const characterPools = computed(() => sheet.pools ?? []);

  const toggle = ref(true);
  function onToggle(e) {
    console.log('toggle:', toggle.value);
  }
  const collections = reactive(props.compendium.collections);

  const initialValues = computed(() => ({
    name: sheet.name,
    url: sheet?.url ?? '',
    xp: sheet?.xp ?? 0,
    effort: sheet?.effort ?? 0,
  }));

  const emit = defineEmits(['update-character', 'close', 'open-modal']);

  function onAddTier() {
    const tierCount = characterAdvancements.value.length ?? 0;
    const currentTiers = characterAdvancements.value ?? [];
    const newTier = {
      tier: currentTiers.length + 1,
      name: 'tier',
      advancements: [],
    };
    currentTiers.push(newTier);
    console.log(tierCount, currentTiers);
    emit('update-character', {advancements: currentTiers});
  }

  function onClose() {
    emit('close');
  }

  const onSubmit = values => {
    //handleSubmit(values => {
    emit('update-character', {...values});
    console.log(values);
  };
  const changeValue = e => {
    const idx = sheet.pools.findIndex(pool => pool.key === e.key);
    sheet.pools[idx] = e;
    //console.log('pool update', sheet.pools);
    emit('update-character', {pools: sheet.pools});
  };
  const profileScheme = yup.object({
    name: yup.string().required().min(1),
    url: yup.string().url().default('').nullable(),
  });

  function handleRecoveryChange(e) {
    const cr = characterRecovery.value;
    cr[e.target.name] = parseInt(e.target.value);
    console.log(`recovery change: ${e.target.name} new value`, cr);
    emit('update-character', {recovery: cr});
  }

  const onItemClick = e => {
    const data = {
      kind: e.kind,
      action: 'edit',
      value: e.value,
    };
    //console.log(e);
    emit('open-modal', data);
  };
</script>

<style lang="postcss">
  .form-control-v {
    @apply join join-vertical input-bordered my-3;
  }
  .pool-input {
    @apply border-none w-auto m-1 bg-secondary text-secondary-content flex-1;
  }
  .input-label {
    @apply label join-item bg-primary text-primary-content;
  }
</style>
