<script setup>
import colors from "vuetify/util/colors";
const props = defineProps({
    title:String,
    status_code:Number,
    status:String
});
</script>
<template>

  <v-card flat :color="colors.grey.lighten5" rounded="lg" :title="props?.title">
    <template v-slot:prepend>
      <v-card flat :color="colors.grey.lighten3">
        <div class="p-1">
          <v-icon icon="mdi-server-minus-outline"></v-icon>
        </div>
      </v-card>
    </template>

    <template v-slot:append>
      <v-card flat :color="colors.green.lighten5" v-if="Math.floor(props?.status_code/100) == 2">
        <div class="p-1 flex items-center gap-1 text-green-600">
          <v-icon class="animate-pulse" color="success" icon="mdi-adjust"></v-icon>
          <p>UP</p>
        </div>
      </v-card>
      <v-card flat :color="colors.red.lighten5" v-else>
        <div class="p-1 flex items-center gap-1 text-red-700">
          <v-icon class="animate-pulse" color="error" icon="mdi-adjust"></v-icon>
          <p>DOWN</p>
        </div>
      </v-card>
    </template>
  </v-card>
</template>
