<script setup>
const route = useRoute();
definePageMeta({
  middleware: "custom-layout",
});
</script>
<template>
  <main class="h-screen w-screen p-[2rem] bg-primary-50 overflow-auto">
    <v-card rounded="xl">
      <v-card-text >
      <article class="prose-sm lg:prose min-w-full w-full p-4 px-8">
        <ContentDoc :path="'/' + route.params.slug[0]" />
      </article>
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
