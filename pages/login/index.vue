<script setup>
const step = ref(0);
const email = ref("");
const password = ref("");
const gotoPasswordStep = () => {
  step.value = 1
};
definePageMeta({
  middleware: "custom-layout",
});
</script>
<template>
  <section class="w-full h-full flex justify-center items-center bg-orange-50">
    <div class="w-4/12">
      <v-card elevation="1" rounded="xl">
        <div class="p-4" v-if="step == 0">
          <v-card-title><p class="font-bold">Sign in</p></v-card-title>
          <v-card-subtitle>to countinue to platform</v-card-subtitle>
          <v-card-item class="my-6">
            <div>
              <v-text-field
                class="mt-2"
                label="email"
                variant="outlined"
                type="email"
                color="primary"
                rounded="lg"
                v-model="email"
              ></v-text-field>
            </div>
          </v-card-item>
          <v-card-actions>
            <div class="flex justify-between w-full">
              <v-btn rounded="lg" color="secondary">Create account</v-btn>
              <v-btn
                rounded="lg"
                variant="flat"
                color="primary"
                @click="()=>{gotoPasswordStep()}"
                >Next</v-btn
              >
            </div>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>

        <div class="p-4" v-if="step == 1">
          <v-card-title><p class="font-bold">Sign in</p></v-card-title>
          <v-card-subtitle>to countinue to platform</v-card-subtitle>
          <v-card-item class="my-6">
            <div>
              <v-text-field
                class="mt-2"
                label="password"
                variant="outlined"
                type="password"
                color="primary"
                rounded="lg"
                v-model="password"
              ></v-text-field>
            </div>
          </v-card-item>
          <v-card-actions>
            <div class="flex justify-between w-full">
              <v-btn
                rounded="lg"
                color="secondary"
                @click="
                  () => {
                    step -= 1;
                  }
                "
                >Prev</v-btn
              >
              <v-btn rounded="lg" variant="flat" color="primary" :loading="true">Sign in</v-btn>
            </div>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
      </v-card>
      <div class="flex mt-2 justify-end">
        <div class="flex">
          <v-btn size="x-small" variant="text">ความช่วยเหลือ</v-btn>
          <v-btn size="x-small" variant="text">ความเป็นส่วนตัว</v-btn>
          <v-btn size="x-small" variant="text">ข้อกำหนด</v-btn>
        </div>
      </div>
    </div>
  </section>
</template>
