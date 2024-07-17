<script setup lang="ts">

/* definePageMeta({
  middleware: ['auth']
}) */
const commentPost = ref<boolean>(false)

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
                    <v-text-field label="No que vc está pensando... ?" variant="outlined" class="rounded-circle"></v-text-field>
                </v-sheet>
            </v-col>
        </v-row>
    </v-card>
    <v-divider></v-divider>
    <v-card class="ma-10 pa-6 mt-6" max-width="800">
       <div class="d-flex align-center ga-2">
            <v-avatar color="secondary"></v-avatar>
            <div class="d-flex flex-column">
                <small>Rafael Belchior</small>
                <small style="color: #455A64;">5 h</small>
            </div>
       </div>

        <v-card-text>
            Whitsunday Island, Whitsunday Islands
        </v-card-text>

        <v-img
            class="align-end text-white"
            height="300"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
        >
        </v-img>
        
        <v-card-actions>
            <v-btn
                color="blue-lighten-2"
                icon="mdi-thumb-up"
                variant="text"
            ></v-btn>
            
            <small style="color: #455A64;">(12)</small>

            <!-- start modal comentario do post -->
            <v-dialog v-model="commentPost" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                        color="blue-lighten-2"
                        icon="mdi mdi-comment"
                        variant="text"
                        v-bind="activatorProps"
                    ></v-btn>
                </template>

                <v-card rounded="lg">
                    <v-card-text>
                        <small class="mb-2">Escreva um comentário para esse post (optional)</small>
                        <v-textarea
                            :counter="300"
                            class="mb-2"
                            rows="2"
                            variant="outlined"
                            persistent-counter
                        ></v-textarea>
                    </v-card-text>

                    <v-divider class="mt-2"></v-divider>

                    <v-card-actions class="my-2 d-flex justify-end">
                        <v-btn
                            class="text-none"
                            rounded="xl"
                            text="Cancelar"
                            @click="commentPost = false"
                        ></v-btn>

                        <v-btn
                            color="info"
                            rounded="xl"
                            text="Comentar"
                            variant="outlined"
                            @click="commentPost = false"
                        ></v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- final modal comentario do post -->
            <small style="color: #455A64;">(12)</small>
        </v-card-actions>
    </v-card>
  </v-container>
</template>
