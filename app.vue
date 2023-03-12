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
      rel: "icon",
      type: "image/png",
      href: "/images/CSOL Logo-Cypher System Compatible-Color with White-Small.png",
    },
  ],
});

const user = useUser();

console.log(user.value)


onMounted(async () => {
  user.value = await fetchCurrentUser()
})
</script>