<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script async setup>
  const {user} = useAuth();

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
  onMounted(() => {
    console.log(user.value);
  });
</script>
