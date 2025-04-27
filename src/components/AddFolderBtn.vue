<template>
    <div>
        <PrimaryButton rounded icon="folder" label="Selecione a pasta" @click="triggerFolderInput" />
        <input
            :ref="classname + 'FolderInput'"
            type="file"
            webkitdirectory
            multiple
            style="display: none"
            @change="$emit('folderChange', $event)"
        />
        <div v-if="imageStore.trainingFolderName" class="row flex-center text-subtitle1">Pasta para treino:</div>
        <div class="row flex-center text-h6">
            {{ imageStore.trainingFolderName }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    classname: {
        type: String,
        required: true
    }
})
</script>