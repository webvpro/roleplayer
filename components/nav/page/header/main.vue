<template>
  <div
    class="navbar sticky top-0 z-30 bg-primary text-primary-content max-h-12"
  >
    <div class="navbar-start">
      <div class="dropdown md:hidden">
        <button class="btn btn-square btn-ghost text-neutral-content text-2xl">
          <Icon name="ic:outline-menu" />
        </button>
        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 z-50 text-base-content w-56"
        >
          <li><NuxtLink to="/compendium">Compendiums</NuxtLink></li>
          <li><NuxtLink to="/characters">Characters</NuxtLink></li>
          <li><NuxtLink to="/play">Play</NuxtLink></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case md:text-xl text-sm"
        >PlayCypher.com</a
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
