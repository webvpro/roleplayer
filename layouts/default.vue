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
          class="select w-auto max-w-xs capitalize text-base-content"
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
      <slot />
    </div>
  </div>
</template>
<script setup>
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

const avatar = createAvatar(adventurer, {
  // ... options
});

const avatarSVG = avatar.toString();
const colorMode = useColorMode();

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
</script>