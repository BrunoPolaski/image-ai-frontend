<template>
  <div class="column justify-evenly q-pa-md q-ma-md q-gutter-md bordered" :style="getStyle">
    <q-input
      filled
      v-model="name"
      label="Nome da característica"
      class="q-ma-md"
      color="black"
      bg-color="white"
    />
    <q-input
      v-model="color"
      label="Cor da característica"
      class="q-ma-md"
      rounded
      :rules="['rgbOrRgbaColor']"
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

const name = defineModel<string>('name');
const color = defineModel<string>('color');

const getStyle = computed(() => {
  const safeColor = color.value || '#cccccc';
  return {
    backgroundColor: safeColor,
    borderColor: safeColor,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '10px'
  };
});

</script>
