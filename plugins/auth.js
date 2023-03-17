import { useAuth } from '../composables/useAuth.js';
export default defineNuxtPlugin(async () => {
  const { user, refresh } = useAuth()
  await refresh()
  return user
  
  });