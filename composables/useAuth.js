

export const useUser = () => {
  return useState("user", () => undefined);
};

export const useAuth = () => {
  const { account, ID } = useAppwrite();
  const { router } = useRouter();
  const user = useUser();
  const isLoggedIn = computed(() => !!user.value);
  const config = useRuntimeConfig()
  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  async function discordLogin() {
    if (isLoggedIn.value) return;
    account.createOAuth2Session('discord', config.DISCORD_LOGIN_REDIRECT)
    //console.log(config.DISCORD_LOGIN_REDIRECT)
    await refresh();
  }

 async function magicURL(to) {
    try {
      await account.createMagicURLSession(ID.unique(), to , config.VERIFY_EMAIL)
      console.log('Magic URL sent')
    } catch (error) {
      console.log('Magic URL',error)
    }
  }

  async function magicURLVerify(loc) {
    const urlParams = new urlParams(loc)
    const router = useRouter();
    try {
      await account.updateMagicURLSession(urlParams.get('userId'), urlParams.get('secret'))
      alert("Magic URL verified")
      router.push('/csrdbrowse')
    } catch (error) {
      console.log('Magic URL',error)
    }
  }



  async function logout() {
    if (!isLoggedIn.value) return;
    await account.deleteSession('current')
    user.value = null;
    await refresh()//
  }
  
  return {
    user,
    isLoggedIn,
    discordLogin,
    logout,
    refresh,
    magicURL,
    magicURLVerify
  };
}

export const fetchCurrentUser = async () => {
  const { account } = useAppwrite();
  let resp = null
  try {
    resp = await account.get()
    return 
    
  } catch (error) {
    console.log('fetchUser ERROR')
    return null;
  }
}

