<script setup>
definePageMeta({
  middleware: "custom-layout",
});

const router = useRouter()

const step = ref(0);
const username = ref("");
const usernameError = ref(null);
const password = ref("");
const passwordError = ref(null);
const loading = ref(false);

const gotoPasswordStep = function () {
  step.value = 1;
};

const checkUsernameHandler = function () {
  loading.value = true;

  $fetch("/api/signin", {
    method: "POST",
    body: {
      username: username.value,
    },
  })
    .then((res) => {
      loading.value = false;
      if (res.status == 200) {
        gotoPasswordStep();
      } else {
        usernameError.value = "incorrect username";
      }
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
};

const onSigninHandler = function () {
  if (password.value != "") {
    loading.value = true;
    $fetch("/api/signin", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
    })
      .then((res) => {
        loading.value = false;
        if (res.status == 200) {
          router.push("/")
        } else {
          passwordError.value = res.mss.replace("fail", "password should be");
        }
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
      });
  }
};

useSeoMeta({
  title: 'SuperStream',
  ogTitle: 'SuperStream',
  description: 'ถ่ายทอดสดวิดีโอ live streaming เพื่อให้การสื่อสารที่ทันเวลาทันเหตุการณ์',
  ogDescription: 'ถ่ายทอดสดวิดีโอ live streaming เพื่อให้การสื่อสารที่ทันเวลาทันเหตุการณ์',
  // ogImage: 'https://example.com/image.png',
  // twitterCard: 'summary_large_image',
})
</script>
<template>
  <section class="w-full h-full flex justify-center items-center bg-primary-50">
    <div class="w-10/12 md:w-6/12 lg:w-4/12">
      <v-card elevation="1" rounded="xl">
        <div class="p-4" v-if="step == 0">
          <div class="flex items-center pl-4">
            <img src="/public/favicon.ico" width="40px" @click="()=>{ router.push('/') }" style="cursor: pointer;">
            <v-card-title style="flex: 1; cursor: pointer;" @click="()=>{ router.push('/') }">SuperStream</v-card-title>
          </div>
          <v-card-title>
            <p class="font-bold">Sign in</p>
          </v-card-title>
          <v-card-subtitle>to countinue to platform</v-card-subtitle>
          <v-card-item class="my-6">
            <div>
              <v-text-field class="mt-2" label="username" variant="outlined" type="text" color="primary" rounded="lg"
                v-model="username" :error-messages="usernameError"></v-text-field>
            </div>
          </v-card-item>
          <v-card-actions>
            <div class="flex justify-between w-full">
              <span></span>
              <v-btn rounded="lg" variant="flat" color="primary" :loading="loading" @click="() => {
            checkUsernameHandler();
          }
          ">Next</v-btn>
            </div>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>

        <div class="p-4" v-if="step == 1">
          <div class="flex items-center pl-4">
            <img src="/public/favicon.ico" width="40px" @click="()=>{ router.push('/') }" style="cursor: pointer;">
            <v-card-title style="flex: 1; cursor: pointer;" @click="()=>{ router.push('/') }">SuperStream</v-card-title>
          </div>
          <v-card-title>
            <p class="font-bold">Sign in</p>
          </v-card-title>
          <v-card-subtitle>to countinue to platform</v-card-subtitle>
          <v-card-item class="my-6">
            <div>
              <v-text-field class="mt-2" label="password" variant="outlined" type="password" color="primary"
                rounded="lg" v-model="password" :error-messages="passwordError"></v-text-field>
            </div>
          </v-card-item>
          <v-card-actions>
            <div class="flex justify-between w-full">
              <v-btn rounded="lg" color="secondary" @click="() => {
            step -= 1;
          }
          ">Prev</v-btn>
              <v-btn rounded="lg" variant="flat" color="primary" :loading="loading" @click="onSigninHandler">Sign
                in</v-btn>
            </div>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
      </v-card>
      <div class="flex mt-2 justify-end">
        <div class="flex">
          <v-btn href="/docs/help" size="x-small" variant="text">ความช่วยเหลือ</v-btn>
          <v-btn href="/docs/private" size="x-small" variant="text">ความเป็นส่วนตัว</v-btn>
          <v-btn href="/docs/policy" size="x-small" variant="text">ข้อกำหนด</v-btn>
        </div>
      </div>
    </div>
  </section>
</template>
