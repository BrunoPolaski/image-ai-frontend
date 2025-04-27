<template>
    <q-page class="column items-center justify-evenly animated">
        <q-form
            greedy
            @submit="imageStore.uploadFiles"
            class="column q-pa-md flex-center">
            <div class="row q-ma-md q-gutter-x-md">
                <div>
                    <PrimaryButton rounded icon="folder" label="Selecionar arquivos de TESTE" @click="triggerTestFolderInput" />
                    <input
                        ref="testFolderInput"
                        type="file"
                        webkitdirectory
                        multiple
                        style="display: none"
                        @change="imageStore.handleTestFolderChange"
                    />
                    <div v-if="imageStore.testFolderName" class="row flex-center text-subtitle1">Pasta para teste:</div>
                    <div class="row flex-center text-h6">
                        {{ imageStore.testFolderName }}
                    </div>
                </div>
                <div>
                    <PrimaryButton rounded icon="folder" label="Selecionar arquivos de TREINO" @click="triggerTrainingFolderInput" />
                    <input
                        ref="trainingFolderInput"
                        type="file"
                        webkitdirectory
                        multiple
                        style="display: none"
                        @change="imageStore.handleTrainingFolderChange"
                    />
                    <div v-if="imageStore.trainingFolderName" class="row flex-center text-subtitle1">Pasta para treino:</div>
                    <div class="row flex-center text-h6">
                        {{ imageStore.trainingFolderName }}
                    </div>
                </div>
            </div>
            <div
                class="fixed-bottom-right"
            >  
                <PrimaryButton
                label="Enviar"
                icon="send"
                rounded
                size="lg"
            />
            </div>
        </q-form>
    </q-page>
</template>

<script setup lang="ts">
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { useImagesStore } from 'src/stores/images-store';
import { ref } from 'vue';

const imageStore = useImagesStore();
const testFolderInput = ref<HTMLInputElement | null>(null);
const trainingFolderInput = ref<HTMLInputElement | null>(null);

const triggerTestFolderInput = () => {
    if (testFolderInput.value) {
        testFolderInput.value.click();
    }
};
const triggerTrainingFolderInput = () => {
    if (trainingFolderInput.value) {
        trainingFolderInput.value.click();
    }
};

</script>