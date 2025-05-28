<script setup lang="ts">

interface Props {
  type: 'blog' | 'home'
  limit: number
}

const props = defineProps<Props>()

const { data } = await useAsyncData(() => {

  const query = queryCollection("content")
    .select("path", "title", 'publishedAt')
    .where("path", "LIKE", "%blog%")
    .where("path", "NOT LIKE", "/blog")  // Filtrar elementos con título vacío
    .order("publishedAt", "DESC")
    .limit(
      props.limit ? props.limit : 10
    )
    .all();

  return query
  //.where("path", "LIKE", "%blog/2022%")
});

const posts = computed(() => {
  if (!data.value) return [];

  const result = [];
  let lastYear = null;

  for (const post of data.value) {
    const year = new Date(post.publishedAt).getFullYear();
    const displayYear = year !== lastYear;
    result.push({
      ...post,
      year,
      displayYear
    });
    lastYear = year;
  }

  return result
})

console.log(posts); // Log the pages data to the console
</script>

<template>
  <section class="not-prose font-mone">
    <template v-if="type === 'home'">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Latest Posts Home</h2>

      <div v-for="post in posts" :key="post.title">
        <NuxtLink :to="post.path">
          <div>{{ post.title }}</div>
        </NuxtLink>
      </div>
    </template>

    <template v-else>
      <div class="colum text-gray-400 text-sm">
        <div>Date</div>
        <div>Title</div>
      </div>
      <ul>
        <li v-for="post in posts" :key="post.title">
          <NuxtLink class="colum group hover:bg-gray-100 dark:hover:bg-gray-800" :to="post.path">
            <div
              :class="{ 'text-white group-hover:text-gray-400 dark:text-gray-900': !post.displayYear, 'text-gray-400 dark:text-gray-500': post.displayYear }">
              {{ post.year }}</div>
            <div>{{ post.title }}</div>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </section>
</template>

<style scoped>
.colum {
  @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700
}
</style>>