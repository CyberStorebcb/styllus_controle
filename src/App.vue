<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { checkVersion } from './version-check' // Use apenas o import

const route = useRoute()

watch(
  () => route.meta.title,
  (title) => {
    document.title = title || 'Styllus Controle'
  },
  { immediate: true },
)

// Verifica a versão a cada 10 segundos (async function)
setInterval(async () => {
  await checkVersion()
}, 10000)
</script>
