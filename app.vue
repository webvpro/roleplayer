<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <pre>
        {{ JSON.stringify(user, null, 2) }}
      </pre>
  </div>
</template>
<script setup>

const { user } = useAuth();

useHead({
  
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/images/CSOL Logo-Cypher System Compatible-Color with White-Small.png",
    },
  ],
});
</script>