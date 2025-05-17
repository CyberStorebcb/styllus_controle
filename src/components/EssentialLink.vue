<template>
  <q-item clickable tag="a" target="_blank" :href="props.link" :aria-label="props.title">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Link',
  },

  caption: {
    type: String,
    default: '',
  },

  link: {
    type: String,
    default: '#',
    validator: (value) => /^https?:\/\//.test(value) || value === '#',
  },

  icon: {
    type: String,
    default: 'link', // Ícone padrão
  },
})
</script>
