<template>
  <div
    class="navbar sticky top-0 z-30 bg-primary text-primary-content max-h-12"
  >
    <div class="navbar-start">
      <details class="dropdown md:hidden">
        <summary class="btn btn-square btn-ghost text-neutral-content text-2xl">
          <Icon name="ic:outline-menu" />
        </summary>
        <ul
          tabindex="0"
          class="p-2 shadow menu dropdown-content z-[5] bg-base-100 rounded-box w-fit"
        >
          <li><NuxtLink to="/compendium">Compendiums</NuxtLink></li>
          <li><NuxtLink to="/characters">Characters</NuxtLink></li>
          <li><NuxtLink to="/play">Play</NuxtLink></li>
        </ul>
      </details>
      <NuxtLink to="/" class="btn btn-ghost normal-case md:text-xl text-sm"
        >PlayCypher.com</NuxtLink
      >
    </div>
    <div class="navbar-center">
      <div class="hidden md:block">
        <ul
          class="menu menu-horizontal bg-base-100 text-base-content rounded-box"
        >
          <li><NuxtLink to="/compendium">Compendiums</NuxtLink></li>
          <li><NuxtLink to="/characters">Characters</NuxtLink></li>
          <li><NuxtLink to="/play">Play</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="navbar-end">
      <ClientOnly>
        <ProfileNav />
      </ClientOnly>
    </div>
  </div>
</template>
