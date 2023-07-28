<template>
  <div class="w-full min-h-full h-fit card">
    <div class="navbar card-title bg-primary">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl capitalize">{{ focus.name }}</a>
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end">
        <button class="btn btn-ghost" @click="closeDrawer">
          <Icon class="text-lg" name="radix-icons:cross-2" />
        </button>
      </div>
    </div>
    <div class="card-body m-3">
      <p class="rounded-md border-dashed border-2 border-base-content p-3">
        {{ focus.description }}
      </p>

      <TierAbilitiesAccordion :tier_abilities="focus.tier_abilities" />
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    item: {type: Object, default: () => {}},
    kind: {type: String, default: ''},
  });

  const emit = defineEmits(['selected-focus']);
  const focus = computed(() => props.item);
</script>
