export default defineNuxtPlugin( async (nuxtApp) => {

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    try {
      await auth.getUser()
    } catch (e) {
      navigateTo('/login')
    }
  } 
})
