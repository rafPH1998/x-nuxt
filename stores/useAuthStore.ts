import { User } from "~/types/user";

export const useAuthStore = defineStore('auth', () => {

  const token = ref<string|null>(null)
  const user = ref<User|null>(null)
  const isLoggedIn = ref<boolean>(false)

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
    isLoggedIn.value = true;

    await getUser()
    return res
  }

  async function logoutUser(){

    await useApi("/api/logout", { 
        method: "POST", 
        headers: { Authorization: `Bearer ${token.value}` } 
    });

    isLoggedIn.value = false;
    token.value = ""
  }
  

  return { login, getUser, logoutUser, isLoggedIn, user, token}
})