<template>
    <div class="ml-2 dropdown dropdown-end">
          <label v-show="online" tabindex="0" class="btn btn-ghost btn-circle bg-primary-content avatar online">
            <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                  class=""
                  :src="`https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${user?.name}`"
                  alt="avatar"
                />
            </div>
          </label>
          <label v-show="offline" tabindex="0" class="btn btn-ghost btn-circle bg-slate-300 avatar offline">
            <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                  class=""
                  src="https://api.dicebear.com/5.x/bottts-neutral/svg?seed=Unknown"
                  alt="avatar"
                />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact text-base-content dropdown-content bg-base-100 rounded-box w-52">
            <span v-if="user" class="font-bold text-lg">{{ user.name }}</span>
            <li v-if="isLoggedIn">
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li v-if="isLoggedIn"><a>Settings</a></li>
            <li v-if="isLoggedIn"><a @click="logout">Logout</a></li>
            <li v-else><NuxtLink to="/login">Login</NuxtLink></li>
          </ul>
        </div>
</template>
<script setup>


const { user, isLoggedIn, logout } = useAuth()
const { getAvatar } = useDiceBear()
const online = isLoggedIn.value
const offline = !isLoggedIn.value


    

</script>