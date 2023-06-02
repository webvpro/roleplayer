<script setup>
  const props = defineProps({
    pool: {type: Object, default: {}},
  });

  const emit = defineEmits(['poolSelect', 'poolAction']);

  const totalPool = ref(props.pool.value);
  const currentPool = ref(props.pool.current ?? 0);
  const icon = ref(props.poolIcon);
  const poolPercent = ref(
    computed(() =>
      currentPool.value !== totalPool.value
        ? (currentPool.value / totalPool.value) * 100
        : 0,
    ),
  );
  const poolDial = computed(() => {
    const size = '6rem';
    const percentFull = totalPool.value
      ? (currentPool.value / totalPool.value) * 100
      : 100;
    return `--value: ${percentFull}; --size:${size};`;
  });

  const poolValStyle = computed(() => {
    return `pool-${props.pool.key.toLowerCase()}`;
  });

  const poolBtnStyle = computed(() => {
    return `pool-btn-${props.pool.key.toLowerCase()}`;
  });
</script>
<template>
  <div class="flex flex-col justify-center flex-grow w-full text-center stat">
    <button class="capitalize mb-3 btn btn-sm" :class="[poolBtnStyle]">
      {{ pool.key.toLowerCase() }}x
    </button>
    <div class="stat-value">
      <div class="radial-progress" :class="[poolValStyle]" :style="poolDial">
        <input
          class="pool-number z-10 hide-spinners ml-3 text-2xl w-14 bg-transparent hover:show-spinners focus:show-spinners hover:bg-transparent focus:bg-transparent focus:ring-0 ml-3"
          type="number"
          v-model="currentPool"
          max="99"
          min="0"
          maxlength="2"
          minlength="1"
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
        <div
          class="btn-sm btn btn-circle"
          @click="emit('poolSelect', poolLabel.toLowerCase())"
        >
          <span>{{ pool.value }}</span>
        </div>
      </div>
      <!-- edge stat -->
      <div class="pool-stat">
        <span class="pb-1">Edge</span>
        <div class="btn-sm btn btn-circle">
          <span class="">{{ pool.edge }}</span>
        </div>
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
