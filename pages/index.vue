<script setup>
const router = useRouter();
</script>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="n in 20" :key="n" cols="12" xs="12" sm="4" md="3" >
        <v-sheet class="ma-2 pa-2 mb-4">
          <a @click="() => router.push('/video/' + n)" class="transition-all hover:opacity-70">
            <v-card link color="grey-lighten-3" flat class="aspect-video"></v-card>
            <div class="flex items-center gap-2 mt-2">
              <v-avatar size="28" color="primary" v-text="n"></v-avatar>
              <div>
              <p class="font-bold" v-text="'videosdfasdf' + n"></p>
              <p class="text-sm" v-text="'video' + n"></p>
            </div>
            </div>
          </a>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
