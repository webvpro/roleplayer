export default defineNuxtRouteMiddleware(async (to, from) => {
  const {fetchUser, isLoggedIn} = useAuth();
  await fetchUser();
  console.log('logged in', isLoggedIn.value);
});
