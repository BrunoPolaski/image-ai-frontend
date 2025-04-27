<template>
    <PrimaryButton rounded icon="folder" label="Selecione a pasta" @click="triggerFolderInput" />
    <input
        ref="folderInput"
        type="file"
        webkitdirectory
        multiple
        style="display: none"
        @change="$emit('folderChange', $event)"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PrimaryButton from './PrimaryButton.vue';

defineEmits(['folderChange']);

const folderInput = ref<HTMLInputElement | null>(null);
const triggerFolderInput = () => {
    if (folderInput.value) {
        folderInput.value.click();
    }
};
</script>