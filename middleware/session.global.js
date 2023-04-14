export default defineNuxtRouteMiddleware(async (to, from) => {
  const {fetchUser} = useAuth();
  await fetchUser();
});
