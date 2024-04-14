<script setup>
definePageMeta({
    middleware: ['admin-route'],
    meta: { permitted: ['admin'] },
})
const isRail = useIsRail();
isRail.value = false;

const acc = useAcc();

const selected = ref([]);
const tab = ref("all");
const search = ref("");
const items = ref([]);
const isLoading = ref(false);

const onKickSomeone = function (id) {
  isLoading.value = true;
  if (acc?.value?.id == id) {
    console.info("wtf what are you doing?");
  }
  $fetch("/api/account", {
    method: "delete",
    body: {
      id,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        setTimeout(() => {
        items.value = items.value.filter((v) => v.id != id);
      }, 1500);
      }
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });
};
const fetchData = function () {
  $fetch("/api/account").then((res) => {
    items.value = res.body.map((v) => {
      v.action = v.id;
      return v;
    });
  });
};

fetchData();
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
        class="mb-0"
        color="primary"
      ></v-text-field>
      <v-window v-model="tab">
        <v-window-item value="all">
          <v-data-table
            v-model="selected"
            :items="items"
            item-value="title"
            :search="search"
            color="primary"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                rounded="lg"
                @click="() => onKickSomeone(item?.id)"
                color="error"
                flat
                variant="tonal"
                :disabled="isLoading"
                :loading="isLoading"
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
