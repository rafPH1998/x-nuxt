
<script setup lang="ts">

const rail = ref<boolean>(true)
const drawer = ref<boolean>(true)

const authStore = useAuthStore()

const logout = async () => {
  try {
    await authStore.logoutUser()
    navigateTo('/login')
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <v-app theme="dark">
    <v-layout class="rounded rounded-md">
      <v-app-bar title="Application bar"></v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-twitter" title="Tweets" value="tweets" to="/" color="info"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users" to="users" color="info"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click.prevent="logout()" block item prepend-icon="mdi-logout" color="info"  variant="outlined">
              Sair
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main class="container " style="min-height: 300px;">
        <slot/>
      </v-main>
    </v-layout>
  </v-app>
</template>
