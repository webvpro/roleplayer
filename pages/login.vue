
<template>
    <div class="flex flex-1 h-full justify-center justify-items-center align-middle">
     <div class="card w-96 bg-secondary shadow-xl m-auto">
         <div class="card-body items-center text-center">
             <h2 class="card-title text-secondary-content">Login</h2>
             <p><Icon class="text-4xl w-full h-28" name="logos:discord" /></p>
             <div class="card-actions">
                 <button class="btn-secondary btn-lg" @click="discordLogin">Login</button>
             </div>
         </div>
     </div>
 </div>
 </template>
 <script setup>
 const { discordLogin } = useAuth()
 
 
 
 
 </script>