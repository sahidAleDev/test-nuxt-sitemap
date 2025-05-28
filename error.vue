<script setup lang="ts">
interface NuxtErrorResponse {
  url: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  stack: string;
  data: string; // JSON string que representa datos adicionales
}

interface NuxtErrorData {
  path: string;
}


defineProps<{
  error: NuxtErrorResponse;
}>()
</script>


<template>
  <NuxtLayout>
    <section>
      <h1 class="text-4xl mb-4">
        Opps {{ error.statusCode }}
      </h1>

      <h2>
        {{ error.statusMessage }}
      </h2>
    </section>
  </NuxtLayout>
</template>

<style scoped>

</style>