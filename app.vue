<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/images/CSOL Logo-Cypher System Compatible-Color with White-Small.png',
      },
    ],
    bodyAttrs: {
      class: 'h-full overflow-hidden',
    },
    htmlAttrs: {
      class: 'h-full',
    },
  });
</script>
