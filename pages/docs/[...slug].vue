<script setup>
const route = useRoute();
definePageMeta({
  middleware: "custom-layout",
});
</script>
<template>
  <main class="h-screen w-screen p-[2rem] bg-orange-50">
    <v-card rounded="xl">
      <v-card-text >
        <ContentDoc :path="'/' + route.params.slug[0]" />
        <!-- <template #not-found>
        <div class="h-screen w-screen flex justify-center items-center">
          <div>
            <p class="text-4xl text-center w-full">Not Found</p>
            <span class="flex justify-center mt-2">
              <NuxtLink
                class="border rounded-lg px-2 py-1"
                href="/"
                color="primary"
                >Back to home</NuxtLink
              >
            </span>
          </div>
        </div>
      </template>
    </ContentDoc>-->
      </v-card-text>
    </v-card>
  </main>
</template>
