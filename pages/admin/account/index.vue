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
</script>
<template>
  <div class="p-[2rem]">
    <v-card flat title="Manage Admin Account"> </v-card>
    <v-card-text>
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
            color="primary"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                rounded="lg"
                color="error"
                flat
                variant="tonal"
                >Kick</v-btn
              >
            </template>
          </v-data-table>
        </v-window-item>
        <v-window-item value="video"> </v-window-item>
        <v-window-item value="live"> </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
