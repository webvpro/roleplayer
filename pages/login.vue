
<template>
    <div class="flex flex-col content-center w-full min-h-screen">
     <div class="card w-96 bg-secondary shadow-xl m-auto">
         <div class="card-body items-center text-center">
             <h2 class="card-title text-secondary-content" v-if="!isLoggedIn">Login</h2>
             <p></p>
             <div class="card-actions" v-if="!isLoggedIn">
                <button class="btn-info btn-lg" @click="discordLogin">Login with Discord <Icon class="" name="ic:baseline-discord" /></button>   
             </div>
             <div v-else class="card-actions">
                <button class="btn-warning btn-lg" @click="logout">Logout</button>
            </div>
         </div>
     </div>
 </div>
 </template>
 <script setup>
 const { discordLogin, isLoggedIn, user, logout, magicURL  } = useAuth()
const sendMagicURL = async () => {
    await magicURL('mlstanley@gmail.com');
}
 
 
 </script>