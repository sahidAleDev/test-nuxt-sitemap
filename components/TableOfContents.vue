<script lang="ts" setup>
interface Heading {
  id: string;
  text: string;
  depth: number;
}

const props = defineProps<{
  headings: Heading[];
}>();

const scrollToHeading = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 20,
      behavior: 'smooth'
    });
  }
};
</script>

<template>
  <div class="table-of-contents">
    <h3>Tabla de Contenidos</h3>
    <ul>
      <li v-for="heading in headings" :key="heading.id"
        :class="{ 'toc-h2': heading.depth === 2, 'toc-h3': heading.depth === 3 }">
        <a href="#" @click.prevent="scrollToHeading(heading.id)">{{ heading.text }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.table-of-contents {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
}

.table-of-contents h3 {
  margin-top: 0;
}

.table-of-contents ul {
  list-style-type: none;
  padding-left: 0;
}

.table-of-contents li {
  margin-bottom: 0.5rem;
}

.toc-h2 {
  margin-left: 0;
}

.toc-h3 {
  margin-left: 1.5rem;
}

.table-of-contents a {
  text-decoration: none;
  color: #333;
}

.table-of-contents a:hover {
  text-decoration: underline;
  color: #0066cc;
}
</style>