<template>
    <div v-if="imageUrl" class="q-mt-md">
      <img :src="imageUrl" alt="Preview" style="max-width: 100%; max-height: 400px;border-radius: 25px;" />
    </div>
    <PrimaryButton
        :disable="disable"
        rounded
        icon="image"
        label="Selecionar imagem"
        @click="triggerFileInput"
        color="primary"
    />
    <input
        :disable="disable"
        ref="fileInput"
        type="file"
        accept=".jpg, .jpeg, .png, .webp, .bmp, .gif"
        style="display: none"
        @change="onFileSelected"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PrimaryButton from './PrimaryButton.vue';

const emit = defineEmits(['fileChange']);

const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }

  emit('fileChange', file);
}

const imageUrl = defineModel('imageUrl') as any;

defineProps({
    label: {
        type: String,
        required: false,
    },
    noTooltip: Boolean,
    fileSelected: {
        type: Boolean,
        default: false,
    },
    disable: Boolean
});
</script>