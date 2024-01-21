export default defineNuxtRouteMiddleware(async (to, from) => {
  const {fetchUser, isLoggedIn} = useAuth();
  await fetchUser();
  console.log('route mid is logged in', isLoggedIn.value);
});
