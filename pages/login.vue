<script setup lang="ts">

definePageMeta({
  layout: 'guest'
})

const form = ref({
  email: "test@example.com",
  password: "password",
  device_name: "rafael"
})

const loading =  ref<boolean>(false)

const authStore = useAuthStore()

const auth = async () => {
  loading.value = true
  try {
    await authStore.login(form.value)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

</script>


<template>
  <div class="authentication">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center mt-12">
          <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4 mb-8">
                <v-icon size="48px" color="primary">mdi-twitter</v-icon>
              </div>
              <v-row class="d-flex mb-3">
                <v-col cols="12">
                  <v-text-field variant="outlined" v-model="form.email" color="primary" label="E-mail"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field variant="outlined" v-model="form.password" type="password" color="primary"
                    label="Senha"></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn
                    :disabled="loading"
                    :loading="loading"
                    class="text-none mb-4"
                    color="primary"
                    size="x-large"
                    variant="flat"
                    block
                    @click.prevent="auth()"
                  >
                    Entrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<style>
.authentication{
  position: absolute;
  height: 100%;
  width: 100%;
  background: radial-gradient(rgb(210, 241, 223), rgb(211, 215, 250), rgb(186, 216, 244)) 0% 0% / 400% 400%;
}
</style>