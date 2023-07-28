<script setup>
  const props = defineProps({
    collection: {type: Object, default: {}},
    pickedItems: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits(['item-click']);
  const viewContent = ref(false);
  const items = reactive(props.collection.items);
  function toggleCollapse() {
    console.log(viewContent.value);
    viewContent.value = !viewContent.value;
  }

  function itemClick(key) {
    const data = {
      kind: props.collection.name.toLowerCase(),
      value: key.toLowerCase().split(' ').join('_'),
    };
    //console.log(data);
    emit('item-click', data);
  }
</script>
<template>
  <div
    class="collapse card card-compact collapse-plus bg-primary text-primary-content shadow-md mb-3"
  >
    <input type="checkbox" v-model="viewContent" />
    <div class="collapse-title card-title" @click="toggleCollapse">
      <span class="text-sm capitalize">Add {{ label }}</span>
    </div>
    <div class="collapse-content">
      <p class="w-full border-2 p-3 indent-3 border-dashed">
        {{ collection.description }}
      </p>
      <div class="flex flex-wrap justify-start">
        <a
          v-for="item in items"
          :key="item.name.toLowerCase().split(' ').join('_')"
          class="capitalize btn text-xs w-fit m-3"
          @click="itemClick(item.name)"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </div>
</template>
