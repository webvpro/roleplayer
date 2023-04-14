export default defineNuxtRouteMiddleware((to, from) => {
  const {user} = useAuth();
  //console.log(user.value)
  if (user.value) {
    return;
  } else {
    return navigateTo('/login');
  }
});
