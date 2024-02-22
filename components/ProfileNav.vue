<template>
  <div class="ml-2 dropdown dropdown-end">
    <label
      v-show="online"
      tabindex="0"
      class="btn btn-ghost btn-circle bg-primary-content avatar online"
    >
      <div
        class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      >
        <img class="" :src="getSvgUrl" alt="avatar" />
      </div>
    </label>
    <label
      v-show="offline"
      tabindex="0"
      class="btn btn-ghost btn-circle bg-slate-300 avatar offline"
    >
      <div
        class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      >
        <img
          class=""
          src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Unknown"
          alt="avatar"
        />
      </div>
    </label>
    <ul
      tabindex="0"
      class="mt-3 p-2 shadow menu menu-compact text-base-content dropdown-content bg-base-100 rounded-box w-52"
    >
      <span v-if="user" class="font-bold text-lg">{{ user.name }}</span>
      <li class="py-2">
        <select
          class="select select-bordered select-sm w-full max-w-xs p-0 pl-3 capitalize text-base-content pb-1"
          v-model="colorMode.preference"
        >
          <option disabled selected>Theme</option>
          <option v-for="theme of themes" :key="theme">
            {{ theme }}
          </option>
        </select>
      </li>
      <li v-if="user">
        <NuxtLink to="/profile" class="justify-between">
          Profile
          <span class="badge">New</span>
        </NuxtLink>
      </li>
      <li v-if="user"><a>Settings</a></li>
      <li v-if="user"><a @click="logout">Logout</a></li>
      <li v-else><NuxtLink to="/login">Login</NuxtLink></li>
    </ul>
  </div>
</template>
<script setup>
  const colorMode = useColorMode();
  const {user, logout} = useAuth();

  const userNM = user.value ? user.value.name : 'NobodyWeKnow';
  const getSvgUrl = computed(
    () => `https://api.dicebear.com/5.x/bottts/svg?seed="${userNM}"`,
  );

  const online = user.value;
  const offline = !user.value;
  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ];
</script>
