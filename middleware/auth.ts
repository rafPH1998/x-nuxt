export default defineNuxtRouteMiddleware(() => {

  const auth = useAuthStore()

  console.log(auth)

  if (!auth.isLoggedIn) {
    return navigateTo('/login', {replace: true})
  }
})