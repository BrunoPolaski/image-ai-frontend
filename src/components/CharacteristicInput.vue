<template>
  <div class="column flex-center q-pa-md q-ma-md bordered" :style="getStyle">
    <q-input
      :disable="disable"
      class="fit"
      filled
      dense
      v-model.trim="name"
      label="Nome da característica"
      color="black"
      bg-color="white"
      :rules="[
        (val: string) => !!val || 'Campo obrigatório',
        (val: string) => val.length <= 20 || 'Máximo de 20 caracteres'
      ]"
      lazy-rules
    />
    <q-input
      lazy-rules
      :disable="disable"
      class="fit"
      v-model.trim="color"
      filled
      dense
      label="Cor da característica"
      format-model
      :rules="[
        (val: string) => !!val || 'Campo obrigatório',
        (val: string) => /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/.test(val) || 'Formato inválido'
      ]"
      bg-color="white"
    >
      <template #append>
        <q-icon
          name="colorize"
          class="cursor-pointer"
        >
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color
              v-model="color"
              format-model="rgb"
            />
          </q-popup-proxy>
        </q-icon>
        <q-icon name="circle" :style="{ color: color }" />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps({
  disable: Boolean,
});

const name = defineModel<string>('name');
const color = defineModel<string>('color');

const getStyle = computed(() => {
  const safeColor = color.value || 'rgb(0,0,0)'; 
  return {
    backgroundColor: safeColor,
    borderColor: safeColor,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '10px'
  };
});

</script>
