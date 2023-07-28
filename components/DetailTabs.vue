<template>
  <div>
    <p class="p-6 rounded-md border-dashed border-2 border-base-content m-2">
      {{ selectedItem.description }}
    </p>
    <div class="tabs w-full pl-2">
      <a
        class="tab tab-bordered text-xl"
        :class="isActiveTab('characteristics')"
        @click="setActiveTab('characteristics')"
        >Characteristics</a
      >
      <a
        class="tab tab-bordered text-xl"
        :class="isActiveTab('links')"
        @click="setActiveTab('links')"
        >Starter Links</a
      >
    </div>
    <div v-if="selectedTab === 'characteristics'" class="p-3">
      <div
        v-for="characteristic in selectedItem.characteristics"
        class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
      >
        <label class="text-lg mb-1 font-semibold capitalize">{{
          characteristic.name
        }}</label>

        <p class="">
          {{ characteristic.description }}
        </p>
      </div>
    </div>
    <div v-if="selectedTab === 'links'" class="p-3">
      <div
        v-for="link in selectedItem.links"
        class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
      >
        <p>{{ link }}</p>
      </div>
    </div>
  </div>
</template>
