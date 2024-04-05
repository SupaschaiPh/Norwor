<script setup lang="ts">
import colors from "vuetify/util/colors";

const searchKeyword = ref("");
const railModeSidebar = useIsRail();
const openSidebar = ref(true);
const displayName = ref("Displayname");
const isLogin = ref(false);
const screenWidth = ref(0);

const router = useRouter();
onMounted(() => {
  screenWidth.value = window.innerWidth;
});

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
      <v-toolbar-title class="font-bold">X Tube</v-toolbar-title>
      <!--<v-text-field
        v-model="searchKeyword"
        append-inner-icon="mdi-magnify"
        class="mt-5"
        density="compact"
        rounded="pill"
        flat
        variant="solo-filled"
      ></v-text-field>-->
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
              <div class="text-center rounded-lg bg-orange-50 p-4 pb-6">
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
                  >Displayname@gmail.com</v-list-item-subtitle
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
              prepend-icon="mdi-cog"
              title="Setting"
            ></v-list-item>
            <v-list-item
              density="compact"
              prepend-icon="mdi-logout"
              title="Logout"
            ></v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else class="mx-5 cursor-pointer">
        <v-btn
          density="comfortable"
          @click="
            () => {
              router.push('/login');
              isLogin = true;
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
      <v-list-item v-if="!railModeSidebar" title="Gobal"></v-list-item>

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
        prepend-icon="mdi-access-point"
        rounded="lg"
        link
        title="Steam Setting"
        @click="
          () => {
            router.push('/admin/setting');
          }
        "
      ></v-list-item>
      <div v-if="railModeSidebar" class="mt-2"></div>
    </v-navigation-drawer>

    <v-main>
      <v-card rounded="xl" class="m-2" :loading="true">
        <slot />
      </v-card>
    </v-main>
  </v-layout>
</template>
