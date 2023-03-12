

export const useUser = () => {
  return useState("user", () => undefined);
};

export const useAuth = () => {
  const { account } = useAppwrite();
  const { router } = useRouter();
  const user = useUser();
  const isLoggedIn = computed(() => !!user.value);
  
  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  async function discordLogin() {
    if (isLoggedIn.value) return;
    const config = useRuntimeConfig()
    account.createOAuth2Session('discord', config.DISCORD_LOGIN_REDIRECT)
    //console.log(config.DISCORD_LOGIN_REDIRECT)
    await refresh();
  }

  async function logout() {
    if (!isLoggedIn.value) return;
    await account.deleteSession('current')
    user.value = null;
    await router.push("/login");
  }
  
  return {
    user,
    isLoggedIn,
    discordLogin,
    logout,
    refresh,
  };
}

export const fetchCurrentUser = async () => {
  const { account } = useAppwrite();
  try {
    return await account.get()
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

