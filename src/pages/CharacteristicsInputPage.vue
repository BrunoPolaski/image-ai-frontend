<template>
    <q-page class="column flex-center animated">
      <q-btn @click="$router.back()" icon="arrow_back" size="lg" color="primary" round />
      <div class="row flex-center">
        <transition-group
            appear
            enter-active-class="animated fadeIn slower"
            leave-active-class="animated fadeOut">
          <EntityInput
              class="q-ma-md bordered"
              v-for="entity in entities"
              :key="entity.id"
              :characteristics="entity.characteristics"
          />
        </transition-group>
        <PrimaryButton
          v-if="entities.length < 3"
          label="Adicionar entidade"
          icon="add"
          rounded
          size="lg"
          @click="addEntity"
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
          @click="addEntity"
        />
      </div>
    </q-page>
  </template>
  
  <script setup lang="ts">
import EntityInput from 'src/components/EntityInput.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import type Entity from 'src/models/entity';
import type { Ref} from 'vue';
import { ref } from 'vue';
  
 const entities: Ref<Entity[]> = ref([
    {
      id: Date.now(),
      name: '',
      characteristics: [
        {
          id: Date.now(),
          name: '',
          color: 'rgb(0, 0, 0)'
        }
      ]
    }
  ]);
  
  const addEntity = () => {
    const newEntity: Entity = {
      id: Date.now(),
      name: '',
      characteristics: [
        {
          id: Date.now(),
          name: '',
          color: 'rgb(0, 0, 0)'
        }
      ]
    };
    entities.value.push(newEntity);
  };
  </script>
  