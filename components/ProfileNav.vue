<template>
    <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                  class=""
                  src="https://api.dicebear.com/5.x/adventurer/svg"
                  alt="avatar"
                />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li v-if="isLoggedIn"><a @click="logout">Logout</a></li>
            <li v-else><NuxtLink to="/login">Login</NuxtLink></li>
          </ul>
        </div>
</template>
<script setup>

const { user, isLoggedIn, logout } = useAuth()

</script>