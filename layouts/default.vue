<script setup>
useHead({
  titleTemplate: '%s - Sahid Alejandro',
})
</script>

<template>
  <div class="container mx-auto max-w-4xl">
    <header class="flex justify-between items-start md:items-center mt-5">
      <div class="flex items-center md:space-x-10">
        <div class="hidden md:block">
          <NuxtLink to="/" class="text-xl font-semibold p-2 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-800">Sahid Alejandro</NuxtLink>
        </div>

        <Menu />
      </div>

      <ClientOnly>
        <ColorModeSelector />
      </ClientOnly>
    </header>

    <main class="p-2 mt-10">
      <slot></slot>
    </main>
  </div>
</template>

<style>
body {
  @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300
}
</style>