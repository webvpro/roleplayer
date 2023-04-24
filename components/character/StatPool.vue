<script setup>
  const props = defineProps({
    pool: {type: Object, default: {}},
  });

  const emit = defineEmits(['poolSelect', 'poolAction']);

  const totalPool = ref(props.pool.value);
  const currentPool = ref(props.pool.current);
  const icon = ref(props.poolIcon);
  const poolPercent = ref(
    computed(() =>
      currentPool.value !== totalPool.value
        ? (currentPool.value / totalPool.value) * 100
        : 100,
    ),
  );
</script>
<template>
  <div class="flex flex-col justify-center flex-grow w-full text-center stat">
    <div class="stat-value">
      <!-- Pool Status Radial
      class="text-xs text-blue-700 radial-progress md:text-lg"
      :class="[
          'text-lg',
          'text-red-700',
          'radial-progress',
          'md:text-xl',
          'bg-white',
          'min-w-fit',
        ]"
       -->
      <div
        class="text-2xl text-primary-content radial-progress bg-primary"
        :style="`--value: ${poolPercent}`"
      >
        {{ currentPool }}
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
          class="pool-number"
          @click="emit('poolSelect', poolLabel.toLowerCase())"
        >
          <span>{{ pool.value }}</span>
        </div>
      </div>
      <!-- edge stat -->
      <div :class="['pool-stat']">
        <span class="pb-1">Edge</span>
        <div class="pool-number md:text">
          <span class="">{{ pool.edge }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-around mb-2 text-xs stat-actions md:text-sm">
      <!-- 
      pool action btn
    -->
      <button
        :class="[
          'gap-2',
          'w-11/12',
          'min-h-fit',
          'btn',
          'btn-xl',
          'btn-primary',
          'text-primary-content',
          'hover:text-focus-content',
          'text-xl',
          'md:text',
          'font-semibold',
        ]"
        @click.prevent="emit('poolAction', pool.key.toLowerCase())"
      >
        {{ pool.key.toLowerCase() }}
      </button>
    </div>
  </div>
</template>
<style lang="postcss">
  .pool-stat {
    @apply flex flex-col justify-center font-semibold text-center;
  }
  .pool-number {
    @apply w-10 h-10 text-xl btn-sm md:btn-xl btn btn-circle;
  }
</style>
