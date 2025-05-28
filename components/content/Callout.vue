<template>
  <div class="callout">
    <h2 v-if="$slots.title">
      <slot name="title" mdc-unwrap="p" />
    </h2>
    <section v-if="$slots.text" class="text-red-600">
      <slot name="text"/>
    </section>
  </div>
</template>