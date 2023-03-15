import {useUser, fetchCurrentUser} from '../composables/useAuth.js';
export default defineNuxtPlugin(async () => {
  const user = useUser();
  if (process.server)
  user.value = await fetchCurrentUser();
    // Skip if already initialized on server
    console.log('plug-in auth', user.value)
    if (user.value !== undefined) return
  });