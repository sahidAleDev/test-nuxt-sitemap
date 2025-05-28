<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  console.log('Fetching page data for route:', route.path)
  return queryCollection('content').path('/').first()
})

useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://imgcdn.terio.xyz/images/2025/05/27/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <article v-if="page" class="prose dark:prose-invert max-w-none">
    <ContentRenderer :value="page" />
  </article>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
