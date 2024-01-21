export default defineNuxtRouteMiddleware((to, from) => {
  const {user, isLoggedIn} = useAuth();
  //await fetchUser();
  console.log('route user', isLoggedIn.value, 'route to', to);
  /*if (!isLoggedIn.value) {
    console.log('somethings up', to);
    return; //navigateTo('/login');
  }*/
  if (process.client) return isLoggedIn.value ? '' : navigateTo('/login');
});
