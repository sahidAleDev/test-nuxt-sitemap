<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})


const activeId = ref<string>()
const isTocEnabled = computed(() => page.value?.toc)
const tocItems = computed(() => page.value?.body.toc?.links || [])

// Usa la forma de función para que sea reactivo
useHead(() => ({
  title: page.value?.title || 'Default Site Title',
  meta: [
    {
      name: 'description',
      content: page.value?.description || 'Default description for the page'
    }
  ]
}))

onMounted(() => {
  const callbak = (entries: IntersectionObserverEntry[]) => {
    console.log("ENTRIES", entries)
    
    for( const entry of entries) {
      if(entry.isIntersecting) {
        activeId.value = entry.target.id
        break
      }
    }
  }

  const observer = new IntersectionObserver(callbak, {
    root: null,
    threshold: 0.5
  })

  const elements = document.querySelectorAll('h2, h3')

  for (const element of elements) {
    observer.observe(element)
  }


  onBeforeUnmount(() => {
    for (const element of elements) {
      observer.unobserve(element)
    }
  })
})
</script>

<template>
  <article
    class="prose dark:prose-invert max-w-none prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300"
    v-if="page">
    <div class="grid grid-cols-6 gap-16">
      <div :class="{ 'col-span-6 md:col-span-4': isTocEnabled, 'col-span-6': !isTocEnabled }">
        <ContentRenderer :value="page" />
      </div>
      <div class="hidden md:block md:col-span-2 not-prose" v-if="isTocEnabled">
        <aside class="sticky top-8">
          <div class="font-semibold mb-2">
            Table of Contents
          </div>
          <nav>
            <TocLinks :links="tocItems" :active-id="activeId" />
          </nav>
        </aside>
      </div>
    </div>
  </article>
  <template v-else>
    <div class="empty-page">
      <h1 class="text-4xl">Document not found (404)</h1>
      <p>This blog post could not be found.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>