import { User } from "~/types/user";

export const useAuthStore = defineStore('auth', () => {

  const token = ref<string|null>(null)
  const user = ref<User|null>(null)
  const isLoggedIn = computed(() => !user.value)

  async function getUser(){
    const res = await useApi("/api/me", { 
      headers: { Authorization: `Bearer ${token.value}` } 
    });

    user.value = res.data.value as User;

  }

  async function login(form: any){
    await useApi("/sanctum/csrf-cookie");
  
    const res = await useApi("/api/auth", { 
      method: "POST", 
      body: form 
    });

    token.value = res?.data?.value?.token

    await getUser()
    return res
  }

  return { login, getUser, isLoggedIn, user}
})