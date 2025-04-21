<template>
    <q-page class="row items-center justify-evenly animated">
      <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut">
        <EntityInput
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
          color: '#000000'
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
          color: '#000000'
        }
      ]
    };
    entities.value.push(newEntity);
  };
  </script>
  