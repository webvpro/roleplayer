<script setup>
  const props = defineProps({
    ability: {
      type: Object,
      default: {},
    },
  });

  const {ability} = toRefs(props);
  const toggleAbilityModal = ref(false);
  const emit = defineEmits(['CloseModal']);
  watch(ability, value => {
    if (!value) {
      toggleAbilityModal.value = false;
    } else {
      toggleAbilityModal.value = true;
    }
  });
</script>

<template>
  <div>
    <input
      type="checkbox"
      id="ability-modal"
      class="modal-toggle"
      v-model="toggleAbilityModal"
    />
    <label for="ability-modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box p-0">
        <div v-if="ability" class="mockup-window border bg-base-300 p-6">
          <h3 class="font-bold text-lg">{{ ability.name }}</h3>
          <p class="p-3">{{ ability.description }}</p>
          <div class="modal-action">
            <button
              class="btn m-3"
              @click.prevent="emit('CloseModal', {ability})"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<style scoped></style>
