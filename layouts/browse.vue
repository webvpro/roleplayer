<template>
  <div>
    <div class="navbar bg-primary text-primary-content">
      <div class="navbar-start">
        <a href="/" class="btn btn-ghost normal-case text-xl">PlayCypher.com</a>
      </div>
      <div class="navbar-center">
        <ul
          class="menu menu-horizontal bg-base-100 text-base-content rounded-box"
        >
          <li><a href="csrdbrowse">Browse</a></li>
          <li><a>Create</a></li>
          <li><a>Play</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <select
          class="select w-auto max-w-xs capitalize text-base-content mr-1"
          v-model="colorMode.preference"
        >
          <option disabled selected>Theme</option>
          <option v-for="theme of themes" :key="theme">
            {{ theme }}
          </option>
        </select>
        <ProfileNav />
      </div>
    </div>
    <div class="">
      <div class="drawer drawer-mobile">
        <input
          id="csrd-search-drawer-1"
          type="checkbox"
          class="drawer-toggle"
        />
        <div
          class="drawer-content flex flex-col content-center bg-neutral text-neutral-content w-full h-full"
        >
          <slot />
        </div>
        <div class="drawer-side">
          <label for="csrd-search-drawer-1" class="drawer-overlay"></label>
          <div
            class="w-80 flex flex-col items-start bg-base-100 text-base-content"
          >
            <div class="navbar h-auto w-full">
              <label
                for="csrd-search-drawer-1"
                class="btn btn-ghost normal-case text-xl drawer-button"
                >Browse CSRD <Icon class="pl-1" name="circum:circle-chev-left"
              /></label>
            </div>
            <ul class="menu p-4 h-full">
              <!-- Sidebar content here -->
              <li class="" v-for="(collection, key) in collections">
                <a class="capitalize" :href="`/${key}`">{{
                  collection.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const colorMode = useColorMode();
</script>
