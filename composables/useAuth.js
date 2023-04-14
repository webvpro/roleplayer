export const useUser = () => {
  return useState('user', () => undefined);
};

export const useAuth = () => {
  const {account, ID} = useAppwrite();
  const {router} = useRouter();
  const user = useUser();
  const isLoggedIn = computed(() => !!user.value);
  const config = useRuntimeConfig();

  async function fetchUser() {
    try {
      user.value = await account.get();
    } catch {
      user.value = null;
    }
  }
  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  function discordLogin() {
    if (isLoggedIn.value) return;
    account.createOAuth2Session('discord', config.DISCORD_LOGIN_REDIRECT);
  }

  async function magicURL(to) {
    try {
      await account.createMagicURLSession(ID.unique(), to, config.VERIFY_EMAIL);
    } catch (error) {
      console.log('Magic URL', error);
    }
  }

  async function magicURLVerify(loc) {
    const urlParams = new urlParams(loc);
    const router = useRouter();
    try {
      await account.updateMagicURLSession(
        urlParams.get('userId'),
        urlParams.get('secret'),
      );
      alert('Magic URL verified');
      router.push('/browse');
    } catch (error) {
      console.log('Magic URL', error);
    }
  }

  async function logout() {
    if (!user.value) return;
    await account.deleteSession('current');
    user.value = null;
    window.location.reload(true);
  }

  return {
    user,
    isLoggedIn,
    discordLogin,
    logout,
    refresh,
    magicURL,
    magicURLVerify,
    fetchUser,
  };
};

export const fetchCurrentUser = async () => {
  const {account} = useAppwrite();

  try {
    const resp = await account.get();
    return resp;
  } catch (error) {
    console.log('fetchUser ERROR', error);
    return null;
  }
};
