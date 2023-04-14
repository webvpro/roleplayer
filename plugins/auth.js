export default defineNuxtPlugin(async () => {
  const {user} = useAuth();
  return user;
});
