<template>
  <div class="flex flex-col h-screen">
    <NavPageHeaderMain />
    <main id="main-body" class="relative flex flex-col flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>
