<template>
  <main class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh; line-height: 1">404</div>
      <div class="text-h4 q-mb-md" style="opacity: 0.7">Oops! Página não encontrada.</div>
      <div class="text-subtitle2 q-mb-xl" style="opacity: 0.6">
        A página que você procura não existe ou foi movida.
      </div>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Voltar para o início"
        no-caps
        aria-label="Voltar para o início"
        icon="home"
      />
    </div>
  </main>
</template>

<script setup>
//
</script>
