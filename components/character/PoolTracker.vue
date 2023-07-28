<script setup>
  const props = defineProps({
    pool: {type: Object, default: {}},
  });

  const emit = defineEmits(['poolSelect', 'poolChange']);
  const poolValues = reactive({
    ...props.pool,
  });
  const current = computed(() => poolValues.current);
  const max = computed(() => poolValues.value);
  const poolKey = computed(() => poolValues.key);

  const icon = ref(props.poolIcon);
  const poolPercent = computed(() => {
    return (current.value / props.pool.value) * 100;
  });
  const poolDial = computed(() => {
    const size = '6rem';
    return `--value: ${poolPercent.value}; --size:${size};`;
  });

  const poolValStyle = computed(() => {
    return `pool-${props.pool.key}`;
  });

  const poolBtnStyle = computed(() => {
    return `pool-btn-${poolKey.value}`;
  });
  function handleCurrentPoolChange(e) {
    poolValues.current = e.target.value;
    emit('poolChange', {pool: poolValues});
  }
  function handleCurrentPoolReset(e) {
    poolValues.current = max.value;
    emit('poolChange', {pool: poolValues});
  }
</script>
<template>
  <div class="flex flex-col justify-center flex-grow w-full text-center stat">
    <button class="capitalize mb-3 btn btn-sm" :class="[poolBtnStyle]">
      {{ pool.key }}
    </button>
    <div class="stat-value">
      <div class="radial-progress" :class="[poolValStyle]" :style="poolDial">
        <input
          class="pool-number z-10 hide-spinners ml-3 text-2xl w-1* bg-transparent hover:show-spinners focus:show-spinners hover:bg-transparent focus:bg-transparent focus:ring-0 ml-3"
          type="number"
          v-model="poolValues.current"
          max="99"
          min="0"
          maxlength="2"
          minlength="1"
          @change="handleCurrentPoolChange"
        />
      </div>
    </div>
    <!-- 
      Pool Total
      -->
    <div
      class="flex flex-row flex-grow min-w-full mb-2 text-xs justify-evenly stat-actions md:text-sm"
    >
      <!-- pool stat -->
      <div class="pool-stat">
        <span class="pb-1">Pool</span>
        <div class="btn-sm btn btn-circle" @click="handleCurrentPoolReset">
          <span>{{ pool.value }}</span>
        </div>
      </div>
      <!-- edge stat -->
      <div class="pool-stat">
        <span class="pb-1">Edge</span>
        <button class="btn-sm btn btn-circle">
          <span class="">{{ pool.edge }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
  .pool-stat {
    @apply flex flex-col justify-center font-semibold text-center;
  }
  .pool-number {
    @apply outline-none border-0 z-20 bg-transparent border-transparent;
  }
  .pool-intellect {
    @apply border-none text-blue-800 bg-blue-100;
  }
  .pool-speed {
    @apply border-none text-green-800 bg-green-100;
  }
  .pool-might {
    @apply border-none text-red-900 bg-red-300;
  }

  .pool-btn-intellect {
    @apply bg-blue-800 text-blue-100;
  }
  .pool-btn-speed {
    @apply bg-green-800 text-green-100;
  }
  .pool-btn-might {
    @apply bg-red-900 text-red-300;
  }
  .hide-spinners {
    -moz-appearance: textfield;
  }
  .show-spinners {
    -moz-appearance: spinbutton;
  }
  /* Chrome, Safari, Edge, Opera */
</style>
