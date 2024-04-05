<script setup>
import colors from "vuetify/util/colors";
const title = ref("Go Live 1");
const desc = ref("Go Live 1 desu");
const coverURL = ref("https://cdn.vuetifyjs.com/images/cards/docks.jpg")

</script>
<template>
  <div class="p-[2rem] flex gap-6">
    <span class="w-4/12">
      <v-card flat :color="colors.grey.lighten5"  class="h-full" rounded="xl">
        <v-card-text>
          <v-card rounded="xl" class="aspect-video" :image="coverURL"> </v-card>
          <v-card-title>
          <v-file-input
          class="mt-4"
            color="primary"
            show-size
            chips
            density="compact"
            rounded="lg"
            label="Cover"
            variant="outlined"
          ></v-file-input>
        </v-card-title>
        </v-card-text>
      </v-card>
    </span>
    <span class="w-8/12">
      <div>
        <v-card flat title="Steamimg setting">
          <template v-slot:append>
            <v-btn color="primary" rounded="lg">Save</v-btn>
          </template>
        </v-card>
      </div>
      <v-card-text>
        <v-text-field
          color="primary"
          rounded="lg"
          label="Title"
          variant="outlined"
          v-model="title"
        ></v-text-field>
        <v-textarea
          rounded="lg"
          color="primary"
          label="Description"
          variant="outlined"
          rows="15"
          v-model="desc"

        ></v-textarea>
      </v-card-text>
    </span>
  </div>
</template>
