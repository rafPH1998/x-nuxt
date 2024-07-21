<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

const commentPost = ref<boolean>(false)
const loadingPosts = ref<boolean>(false)
const posts = ref<any[]>([])

const message = ref('Hey!')
const iconIndex = ref(0)
const icons = [
  'mdi-emoticon',
  'mdi-emoticon-cool',
  'mdi-emoticon-dead',
  'mdi-emoticon-excited',
  'mdi-emoticon-happy',
  'mdi-emoticon-neutral',
  'mdi-emoticon-sad',
  'mdi-emoticon-tongue',
]

onMounted(async () => {
  const authStore = useAuthStore()
  try {
    loadingPosts.value = true

    const req = await useApi("/api/posts", {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })

    posts.value = req?.data?.value
  } catch (error) {
    console.log(error)
  } finally {
    loadingPosts.value = false
  }
});

const icon = computed(() => icons[iconIndex.value])

function sendMessage() {
  resetIcon()
  clearMessage()
}

function clearMessage() {
  message.value = ''
}

function resetIcon() {
  iconIndex.value = 0
}

function changeIcon() {
  iconIndex.value === icons.length - 1
    ? iconIndex.value = 0
    : iconIndex.value++
}
</script>


<template>
  <v-container>
    <v-card class="pa-4 ma-10 rounded shadow d-flex items-center ga-4">
      <v-row>
        <v-col>
          <v-sheet class="pa-4 ma-10 rounded shadow d-flex items-center ga-4">
            <v-avatar color="info" size="x-large">
              64
            </v-avatar>
            <v-text-field v-model="message" :append-icon="'mdi-send'" :prepend-icon="icon" clear-icon="mdi-close-circle"
              label="No que vc está pensando... ?" type="text" variant="outlined" clearable @click:append="sendMessage"
              @click:clear="clearMessage" @click:prepend="changeIcon"></v-text-field>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
    <v-divider></v-divider>
    <div v-if="loadingPosts" class="d-flex justify-center mt-2">
      <v-progress-circular indeterminate :size="50"></v-progress-circular>
    </div>
    <div v-else>
      <v-card v-for="post in posts" :key="post.id" class="ma-10 pa-6 mt-6" max-width="800">
        <div class="d-flex align-center ga-2">
          <v-avatar color="secondary"></v-avatar>
          <div class="d-flex flex-column">
            <small>{{ post?.user?.name }}</small>
            <small style="color: #455A64;">criado em {{ post?.created_at }}</small>
          </div>
        </div>

        <v-card-text>
          {{ post?.description }}
        </v-card-text>

        <v-img class="align-end text-white" height="300" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
        </v-img>

        <v-card-actions>
          <v-btn color="gray" icon="mdi-thumb-up" variant="text"></v-btn>

          <small style="color: #455A64;">({{ post?.likes_count }})</small>

          <!-- start modal comentario do post -->
          <v-dialog v-model="commentPost" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn color="gray" icon="mdi mdi-comment" variant="text" v-bind="activatorProps"></v-btn>
            </template>

            <v-card rounded="lg">
              <v-card-text>
                <small class="mb-2">Escreva um comentário para esse post (optional)</small>
                <v-textarea :counter="300" class="mb-2" rows="2" variant="outlined" persistent-counter></v-textarea>
              </v-card-text>

              <v-divider class="mt-2"></v-divider>

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn class="text-none" rounded="xl" text="Cancelar" @click="commentPost = false"></v-btn>

                <v-btn color="info" rounded="xl" text="Comentar" variant="outlined" @click="commentPost = false"></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- final modal comentario do post -->
          <small style="color: #455A64;">({{ post?.comments_count }})</small>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
