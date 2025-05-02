<template>
  <div
    class="column fullscreen flex-center bg-grey-2">
    <div class="text-h1 text-bold text-italic text-primary">404</div>
    <div
      class="text-primary text-h3 q-mb-xl"
    >
      Opa! Não encontramos o que você estava procurando.
    </div>
    <img
      :src="image"
      alt="No content"
      width="300"
      height="300"
    />
    <PrimaryButton
      class="q-mt-xl"
      to="/"
      label="Ir para a página inicial"
      rounded
      no-caps
    />
  </div>
</template>

<script setup lang="ts">
import image from 'src/assets/error.png';
import PrimaryButton from 'src/components/PrimaryButton.vue';
</script>
