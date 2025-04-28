<template>
    <PrimaryButton rounded icon="folder" :label="label || ''" @click="triggerFolderInput" />
    <input
        ref="folderInput"
        type="file"
        webkitdirectory
        multiple
        style="display: none"
        @change="$emit('folderChange', $event)"
    />
    <q-btn
        icon="delete"
        class="q-ma-md"
        color="red"
        size="md"
        rounded
        v-if="folderInput && folderInput.files && folderInput.files.length > 0"
        @click="emptyFiles"
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

const emptyFiles = () => {
    if (folderInput.value) {
        folderInput.value.files = null;
    }
};

defineProps({
    label: {
        type: String,
        required: false,
    },
    noTooltip: Boolean
});
</script>