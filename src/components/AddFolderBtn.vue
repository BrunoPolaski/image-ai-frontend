<template>
    <PrimaryButton 
        rounded
        :icon="folderSelected ? 'check' : 'folder'"
        :label="folderSelected ? 'Pasta selecionada' : 'Selecionar pasta de imagens'"
        @click="triggerFolderInput"
        :color="folderSelected ? 'green' : 'primary'"
    />
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

defineProps({
    label: {
        type: String,
        required: false,
    },
    noTooltip: Boolean,
    folderSelected: {
        type: Boolean,
        default: false,
    },
});
</script>