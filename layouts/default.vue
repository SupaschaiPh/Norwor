<script setup>
import colors from "vuetify/util/colors";
const router = useRouter();

const railModeSidebar = useIsRail();
const openSidebar = ref(true);
const displayName = ref("Displayname");
const userName = ref("aaaa@aaaaah");

const isLogin = ref(false);
const screenWidth = ref(0);

const acc = useAcc()

onMounted(() => {
  screenWidth.value = window.innerWidth;
  if(screenWidth.value<1300){
    openSidebar.value = false;

  }
});

$fetch("/api/session").then(
  (res)=>{
    if(res && res.acc && res.acc.id){
      displayName.value = res.acc.displayName
      userName.value = res.acc.username
      isLogin.value = true
      acc.value = res.acc
    }
  }
)

const openNavbarHandler = function () {
  if (window) screenWidth.value = window.innerWidth;

  if(screenWidth.value<1300){
    if (openSidebar.value){
    openSidebar.value = false;

    }else{
      railModeSidebar.value = false
          openSidebar.value = true;
    }
    return
  }
  else if (openSidebar.value) {
    railModeSidebar.value = !railModeSidebar.value;
  }
  openSidebar.value = true;
};
const logoutHandler = function(){
  $fetch("/api/logout")
  isLogin.value = false
}

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
  <v-layout>
    <v-app-bar :elevation="0" density="comfortable">
      <v-app-bar-nav-icon
        @click="
          () => {
            openNavbarHandler();
          }
        "
      >
      </v-app-bar-nav-icon>
    <img src="/public/favicon.ico" width="30px" @click="()=>{ router.push('/') }" style="cursor: pointer;">
    <v-toolbar-title class="font-bold cursor-pointer" @click="()=>{ router.push('/') }" style="flex: 1;">SuperStream</v-toolbar-title>
      <!--<v-text-field
        v-model="searchKeyword"
        append-inner-icon="mdi-magnify"
        class="mt-5"
        density="compact"
        rounded="pill"
        flat
        variant="solo-filled"
      ></v-text-field>-->
      <div
        class="text-center bg-gray-100 p-2 rounded-full w-[25rem] hidden sm:block"
        variant="solo-filled"
      >{{ router.currentRoute.value.fullPath }}</div>
      <v-spacer> </v-spacer>
      <div v-if="isLogin" class="mx-5 cursor-pointer">
        <v-avatar
          class="cursor-pointer"
          id="avatarMeunAticvator"
          color="secondary"
          size="small"
        >
          {{ displayName.slice(0, 1) }}
        </v-avatar>

        <v-menu activator="#avatarMeunAticvator">
          <v-list rounded="lg">
            <!-- title="Displayname" subtitle="Displayname@gmail.com" -->
            <v-list-item class="mb-2">
              <div class="text-center rounded-lg bg-primary-50 p-4 min-w-[10rem]">
                <div class="w-full flex justify-center">
                  <v-avatar
                    class="cursor-pointer"
                    id="avatarMeunAticvator"
                    color="secondary"
                    size="small"
                  >
                    {{ displayName.slice(0, 1) }}
                  </v-avatar>
                </div>
                <v-list-item-title>{{ displayName }}</v-list-item-title>
                <v-list-item-subtitle class="pb-2"
                  >{{ userName }}</v-list-item-subtitle
                >
              </div>
              <!--
              <template v-slot:prepend>
                
              </template>
              -->
            </v-list-item>
            <hr />
            <v-list-item
              density="compact"
              prepend-icon="mdi-logout"
              title="Logout"
              @click="logoutHandler"
            ></v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else class="mx-5 cursor-pointer">
        <v-btn
          density="comfortable"
          @click="
            () => {
              router.push('/signin');
            }
          "
          icon="mdi-login"
        >
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="openSidebar"
      :elevation="0"
      class="border-0"
      :rail="railModeSidebar"
    >
      <v-list-item v-if="!railModeSidebar" title="General"></v-list-item>

      <v-list-item
        @click="
          () => {
            router.push('/');
          }
        "
        prepend-icon="mdi-home"
        rounded="lg"
        link
        title="Home"
      ></v-list-item>
      <div v-if="railModeSidebar" class="mt-2"></div>
      <v-list-item
        @click="
          () => {
            router.push('/status');
          }
        "
        prepend-icon="mdi-server-network"
        rounded="lg"
        link
        title="Server Status"
      ></v-list-item>
      <div v-if="railModeSidebar" class="mt-2"></div>

      <v-list-item v-if="!railModeSidebar" title="Admin"></v-list-item>
      <v-divider v-if="!railModeSidebar"></v-divider>

      <v-list-item
        prepend-icon="mdi-file-document-multiple"
        rounded="lg"
        link
        title="Docs"
        @click="
          () => {
            router.push('/docs');
          }
        "
      ></v-list-item>


      <v-list-item
        prepend-icon="mdi-access-point"
        rounded="lg"
        link
        title="Stream Setting"
        @click="
          () => {
            router.push('/admin/setting');
          }
        "
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-account-group"
        rounded="lg"
        link
        title="Manage Account"
        @click="
          () => {
            router.push('/admin/account');
          }
        "
      ></v-list-item>

     
      <div v-if="railModeSidebar" class="mt-2"></div>
    </v-navigation-drawer>

    <v-main>
      <v-card rounded="xl" :elevation="2" class="m-2">
        <slot />
      </v-card>
    </v-main>
  </v-layout>
</template>
