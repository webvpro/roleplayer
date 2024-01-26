export default defineNuxtRouteMiddleware((to, from) => {
  const {user, isLoggedIn} = useAuth();
  if (process.client) return isLoggedIn.value ? '' : navigateTo('/login');
});
