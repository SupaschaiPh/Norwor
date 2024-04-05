<script setup>
const selected = ref([]);
const tab = ref("all");
const search = ref("");
const file = ref(null);
const cover = ref(null);
const coverPreivew = ref("");
const onUpload = ref(false);
const step = ref(0);
const items = ref(
  [
    {
      id: "1",
      title: "🍎 Apple",
      location: "Washington",
      height: "0.1",
      base: "0.07",
      volume: "0.0001",
    },
    {
      id: "2",
      title: "🍌 Banana",
      location: "Ecuador",
      height: "0.2",
      base: "0.05",
      volume: "0.0002",
    },
    {
      id: "3",
      title: "🍇 Grapes",
      location: "Italy",
      height: "0.02",
      base: "0.02",
      volume: "<v-btn></v-btn>",
    },
  ].map((v) => {
    v.action = v.id;
    return v;
  })
);

const previewCoverHandler = function () {
  const reader = new FileReader();
  const cv = cover.value[0];
  reader.onload = (res) => {
    coverPreivew.value = reader.result;
  };
  reader.readAsDataURL(cv);
  //console.log(cv)
};
</script>
<template>
  <div class="flex justify-between items-center p-3">
    <h3 class="text-xl font-bold">Content</h3>
    <div class="flex gap-2">
      <v-btn
        rounded="lg"
        v-bind="activator"
        flat
        prepend-icon="mdi-upload"
        color="primary"
        >Live</v-btn
      >
      <v-dialog max-width="1000">
        <template v-slot:activator="{ props: activator }">
          <v-btn
            rounded="lg"
            v-bind="activator"
            flat
            prepend-icon="mdi-upload"
            color="primary"
            variant="tonal"
            >Upload</v-btn
          >
        </template>

        <template v-slot:default="{ isActive }">
          <v-card
            v-if="file == null"
            rounded="lg"
            title="Upload new video"
            :loading="onUpload"
          >
            <v-card-text>
              <div class="h-64 w-full flex justify-center items-center">
                <NuxtImg src="/upload.jpeg" />
              </div>
              <v-file-input
                v-model="file"
                density="compact"
                accept="video/"
                label="File input"
                variant="solo"
              ></v-file-input>
            </v-card-text>
          </v-card>
          <v-card
            v-if="file != null"
            rounded="lg"
            title="Upload new video"
            :loading="onUpload"
          >
            <v-card-text>
              <div class="flex w-full gap-6">
                <span class="w-4/12 overflow-hidden">
                  <v-card class="aspect-video mb-6">
                    <img class="w-full h-full" :src="coverPreivew" />
                  </v-card>

                  <v-file-input
                    @change="() => previewCoverHandler()"
                    v-model="cover"
                    accept="image"
                    label="File input"
                    density="compact"
                    variant="solo"
                  ></v-file-input>
                </span>
                <span class="w-8/12">
                  <v-text-field
                    label="Title"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                  <v-textarea
                    rows="6"
                    label="Description"
                    variant="outlined"
                    density="compact"
                  ></v-textarea>
                </span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer>
                <v-btn class="w-full">Save</v-btn>
              </v-spacer>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </div>
  <div class="px-3">
    <v-tabs density="compact" v-model="tab">
      <v-tab value="all">All</v-tab>
      <v-tab disabled value="video">Video</v-tab>
      <v-tab disabled value="live">Live</v-tab>
    </v-tabs>
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      single-line
      density="compact"
      rounded="lg"
      class="mt-3 mb-0"
      color="primary"
    ></v-text-field>
    <v-window v-model="tab">
      <v-window-item value="all">
        <v-data-table
          v-model="selected"
          show-select
          :items="items"
          item-value="title"
          :search="search"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              rounded="lg"
              color="primary"
              flat
              variant="tonal"
              :href="'/me/edit/v/' + item.id"
              >Edit</v-btn
            >
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item value="video"> </v-window-item>
      <v-window-item value="live"> </v-window-item>
    </v-window>
  </div>
</template>
