<template>
    <q-page class="column flex-center animated">
      <div class="fit row justify-center q-pa-md">
        <q-btn @click="$router.back()" icon="arrow_back" size="lg" color="primary" round />
      </div>
      <div class="row flex-center">
        <transition-group
            appear
            enter-active-class="animated fadeIn slower"
            leave-active-class="animated fadeOut">
          <EntityInput
              class="q-ma-md bordered"
              v-for="entity in imagesStore.entities"
              :key="entity.id"
              :entity="entity"
              with-characteristics
              with-folder
          />
        </transition-group>
        <PrimaryButton
          v-if="imagesStore.entities.length < 3"
          label="Adicionar entidade"
          icon="add"
          rounded
          size="lg"
          @click="imagesStore.addEntity"
        />
      </div>
      <div
        class="fixed-bottom-right"
      >  
        <PrimaryButton
          label="Enviar"
          icon="send"
          rounded
          size="lg"
          @click="imagesStore.uploadCharacteristicFiles"
        />
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
import EntityInput from 'src/components/EntityInput.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { createEntity } from 'src/models/entity';
import { useImagesStore } from 'src/stores/images-store';
import { onBeforeMount } from 'vue';

const imagesStore = useImagesStore();

onBeforeMount(() => {
    imagesStore.entities = [createEntity()];
});
</script>
  