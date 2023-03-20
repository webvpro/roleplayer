
export default defineNuxtPlugin(async () => {
  const { user, refresh } = useAuth()
  if(process.client)
  await refresh()
  return user
  
  });