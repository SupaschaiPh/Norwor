<script setup>
import colors from "vuetify/util/colors";
const title = ref("Go Live 1");
const desc = ref("Go Live 1 desu");
const coverFile = ref(null);
const fixedCoverURL = ref("https://cdn.vuetifyjs.com/images/cards/docks.jpg");
const coverURL = ref(fixedCoverURL.value);
const onChangeCoverFile = function (e) {
  if (coverFile.value[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      coverURL.value = reader.result;
    };
    reader.readAsDataURL(coverFile.value[0]);
  } else {
    coverURL.value = fixedCoverURL.value;
  }
};
</script>
<template>
  <section class="p-[2rem]">
    <div class="flex flex-col md:flex-row gap-6">
      <span class="md:w-4/12">
        <v-card flat :color="colors.grey.lighten5" class="h-full" rounded="xl">
          <v-card-text>
            <v-card rounded="xl" class="aspect-video" :image="coverURL">
            </v-card>
            <v-card-title>
              <v-file-input
                v-model="coverFile"
                class="mt-4"
                color="primary"
                show-size
                chips
                density="compact"
                rounded="lg"
                label="Cover"
                variant="outlined"
                @click:clear="onChangeCoverFile"
                @change="onChangeCoverFile"
              ></v-file-input>
            </v-card-title>
          </v-card-text>
        </v-card>
      </span>
      <span class="md:w-8/12">
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
    <div>
      <v-card flat title="Chat setting">
        <template v-slot:append>
          <v-btn color="primary" rounded="lg">Save</v-btn>
        </template>
      </v-card>
      <v-card-text>
        <div class="flex gap-6">
          <v-text-field
            class="w-10/12"
            color="primary"
            density="compact"
            label="Host"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            color="primary"
            density="compact"
            label="Port"
            type="number"
            variant="outlined"
          ></v-text-field>
        </div>
        <div class="flex gap-6">
          <v-text-field
            class="w-10/12"
            color="primary"
            density="compact"
            label="Topic"
            variant="outlined"
          ></v-text-field>
          <v-select
            label="Select"
            color="primary"
            density="compact"
            :items="[0, 1, 2]"
            variant="outlined"
          ></v-select>
        </div>
      </v-card-text>
    </div>
  </section>
</template>
