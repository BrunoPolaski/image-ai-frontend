<template>
  <q-page class="column items-center justify-evenly">
    <q-card class="q-ma-md fixed-bottom-left bordered shadow-2 q-pa-md">
      <div class="row full-width flex-center">
        <q-img height="100px" width="100px" fit="scale-down" src="src/assets/Mario.webp"/>
        <q-icon name="arrow_right_alt" size="md" />
        <q-img height="100px" fit="scale-down" width="100px" src="src/assets/Mario-blurred.webp" />
      </div>
      <div class="row flex-center">EXEMPLO DE CONVOLUCAO UTILIZANDO KERNEL DE BLUR</div>
    </q-card>
    <div class="column fit flex-center">
      <PrimaryButton
        class="width-40"
        label="Input de características"
        rounded
        size="xl"
        @click="$router.push('/characteristics')"
      />
      <PrimaryButton
        class="width-40"
        label="Upload de imagens"
        rounded
        size="xl"
        @click="$router.push('/upload')"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PrimaryButton from 'src/components/PrimaryButton.vue';
</script>