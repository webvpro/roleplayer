import { account } from './useAW.js'

const state = reactive({
  user: null,
  error: false,
  loading: true
})

export const loginWithDisord = async () => {
  try {
    await account.createOAuth2Session('discord', process.env.AW_ENDPOINT)
  } catch (error) {
    console.log(error)
    state.error = error
  }
  state.loading = false
}

export const getUserSession = async () => {
  try {
    state.user = await account.get()
  } catch (error) {
    console.log(error)
    state.error = error
  }
  return { ...toRefs(state) }
}
