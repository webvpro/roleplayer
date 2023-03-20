<script setup>
const props = defineProps({
  itemData: { default: () => {} },
  itemType: { default: () => '' }
});
const { itemData, itemType } =props
const item = reactive(itemData)
item['type'] = itemType
const emit = defineEmits([
  "ViewItem",
  "SelectedItem",
]);
</script>

<template>
  <div>
    <div class="text-center">
        <label for="item-details" class="drawer-button card-title ">
            {{ item.name }}
        </label>
    </div>    
    <div class="card-body">
      <p class="text-base overflow-ellipsis overflow-hidden w-80 p-4 h-16">
        {{ item.description }}
      </p>
      <div class="justify-center card-actions">
        <button class="btn btn-secondary" @click="emit('ViewItem', {item})">View Details</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
