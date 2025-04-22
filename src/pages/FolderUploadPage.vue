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
                    <div class="row flex-center text-subtitle1">Arquivos selecionados para teste:</div>
                    <q-list class="bg-secondary bordered" style="height: 200px;overflow: scroll;">
                        <q-item v-for="(file, index) in imageStore.testFiles" :key="index">
                            <q-item-section>{{ file.name }}</q-item-section>
                            <q-item-section side>
                                <q-btn
                                    icon="delete"
                                    color="negative"
                                    @click="imageStore.testFiles.splice(index, 1)"
                                    round
                                    dense
                                />
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <q-btn rounded icon="folder" label="Selecionar arquivos de TREINO" @click="triggerTrainingFolderInput" />
                <input
                    ref="trainingFolderInput"
                    type="file"
                    webkitdirectory
                    multiple
                    style="display: none"
                    @change="imageStore.handleTrainingFolderChange"
                />
            </div>
            <q-btn
                rounded
                color="primary"
                icon="add"
                label="Fazer upload de pastas"
                type="submit"
                :loading="imageStore.isLoading"
            />
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