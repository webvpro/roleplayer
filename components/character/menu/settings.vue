<template>
  <ul class="menu bg-base-200 w-56 rounded-box">
    <li>
      <button @click="onClickHandler('profile')">
        <Icon name="game-icons:character" />
        Profile
      </button>
    </li>
    <li>
      <button @click="onClickHandler('abilities')">
        <Icon name="game-icons:strong" />
        Abilities
      </button>
    </li>
    <li>
      <button @click="onClickHandler('skills')">
        <Icon name="game-icons:skills" />
        Skills
      </button>
    </li>
    <li>
      <button @click="onClickHandler('equipment')">
        <Icon name="game-icons:backpack" />
        Equipment
      </button>
    </li>
  </ul>
</template>
<script setup>
  const props = defineProps({
    mode: String,
  });
  const emit = defineEmits(['editMode']);
  function onClickHandler(editMode) {
    emit('editMode', {mode: editMode});
  }
</script>
