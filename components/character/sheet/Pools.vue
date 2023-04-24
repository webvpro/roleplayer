<script setup>
  const props = defineProps({
    pools: {type: [], default: []},
    recovery: {type: Object, default: {}},
  });
  const emit = defineEmits([
    'poolSelect',
    'poolAction',
    'restToggle',
    'damageToggle',
  ]);
  const restTracker = ref(props.recovery?.rest);
  const damageTracker = ref(props.recovery?.damage);
</script>

<template>
  <div class="col-span-12 h-full w-full lg:h-fit shadow-xl lg:col-span-6 card">
    <div class="stats" v-if="pools">
      <CharacterStatPool v-for="pool in pools" :pool="pool" />
    </div>
    <div class="bg-neutral text-neutral-content card-body">
      <div
        v-if="recovery"
        class="shadow bg-neutral text-neutral-content stats stats-vertical md:stats-horizontal"
      >
        <div class="recovery-stat">
          <div class="stat-title text-lg md:text">Recovery</div>
          <div class="recovery-stat-val">
            <button
              class="recovery-button text-sm"
              @click.prevent="openRecovery"
            >
              <v-icon name="debilitated" scale="2.33" /><span>{{
                `${recovery.die} d6+ ${recovery.mod}`
              }}</span>
            </button>
          </div>
        </div>

        <div class="recovery-stat">
          <div class="stat-title text-lg md:text">Rest</div>
          <div class="recovery-stat-val">
            <div
              class="grid grid-cols-2 grid-rows-2 gap-4 place-content-center w-fit"
            >
              <div class="form-control" v-for="rest in recovery.rest">
                <label class="text-lg cursor-pointer label">
                  <input
                    v-model="rest.used"
                    name="rest.id"
                    type="checkbox"
                    class="checkbox checkbox-primary"
                  />
                  <span class="ml-1 mr-auto text-lg md:text-sm label-text">{{
                    rest.label
                  }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="recovery-stat">
          <div class="stat-title text-lg md:text">Damage Track</div>
          <div class="recovery-stat-val">
            <ul class="flex flex-col justify-start w-1/2">
              <li class="w-fit form-control" v-for="damage in recovery.damage">
                <label class="text-lg md:text capitalize cursor-pointer label">
                  <input
                    v-model="damage.inflected"
                    type="checkbox"
                    class="checkbox checkbox-primary"
                  />
                  <span class="px-2 text-lg md:text-sm capitalize label-text">{{
                    damage.label
                  }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
  .recovery-stat {
    @apply text-2xl font-bold pb-2 justify-center text-center mb-2 w-full;
  }
  .recovery-button {
    @apply text-2xl btn-lg mx-auto w-10/12 gap-2 btn btn-primary text-primary-content mt-1;
  }
  .recovery-stat-val {
    @apply flex justify-center text-center stat-value text-neutral-content;
  }
  .label-text {
    @apply ml-1 text-sm text-neutral-content;
  }
  .stat-title {
    @apply text-neutral-content;
  }
</style>
