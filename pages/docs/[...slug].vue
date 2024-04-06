<script setup>
definePageMeta({
  middleware: "custom-layout",
});
</script>
<template>
  <main>
    <ContentDoc>
      <template #not-found>
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
    </ContentDoc>
  </main>
</template>
