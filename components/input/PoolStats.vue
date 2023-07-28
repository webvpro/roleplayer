<script setup>
  import {Field as VeeField, Form as VeeForm} from 'vee-validate';
  const props = defineProps({
    pool: {
      type: Object,
      default: {},
    },
  });

  const poolData = reactive(props.pool);
  const label = computed(() => poolData.key.toLowerCase());
  const emit = defineEmits(['pool-change']);
  const onChange = () => {
    emit('pool-change', poolData);
  };
</script>
<template>
  <div class="join join-horizontal input-bordered my-3 w-full">
    <label class="join-item input-label w-5/12 capitalize"
      ><span class="label-text">{{ label }} Pool</span></label
    >
    <input
      type="number"
      name="pool"
      min="0"
      max="99"
      size="2"
      class="join-item bg-neutral text-neutral-content w-2/12"
      v-model="poolData.value"
      @change="onChange"
    />
    <label class="input-label join-item w-3/12"
      ><span class="label-text">Edge</span></label
    >
    <input
      type="number"
      name="edge"
      min="0"
      max="10"
      size="2"
      class="join-item bg-neutral text-neutral-content w-2/12"
      v-model="poolData.edge"
      @change="onChange"
    />
  </div>
</template>

<style lang="postcss">
  .pool-input {
    @apply bg-neutral text-neutral-content;
  }
</style>
