<template>
    <q-page class="column items-center justify-evenly animated">
        <q-form
            greedy
            @submit="imageStore.uploadFiles"
            class="column q-pa-md flex-center">
            <div class="row q-ma-md q-gutter-x-md">
                <q-file
                    outlined
                    v-model="imageStore.trainingImages"
                    label="Arquivos de TREINO"
                    multiple
                    style="max-width: 300px"
                    use-chips
                    lazy-rules
                    :rules="[
                        (val) => val.length > 0 || 'Selecione pelo menos um arquivo',
                        (val) => val.length <= 10 || 'Selecione no máximo 10 arquivos',
                    ]"
                />
                <q-file
                    outlined
                    v-model="imageStore.testImages"
                    label="Arquivos de TESTE"
                    multiple
                    use-chips
                    style="max-width: 300px"
                    lazy-rules
                    :rules="[
                        (val) => val.length > 0 || 'Selecione pelo menos um arquivo',
                        (val) => val.length <= 10 || 'Selecione no máximo 10 arquivos',
                    ]"
                />
            </div>
            <q-btn
                rounded
                color="primary"
                icon="add"
                label="Fazer upload de arquivos"
                type="submit"
                :loading="imageStore.isLoading"
            />
        </q-form>
    </q-page>
</template>

<script setup lang="ts">
import { useImagesStore } from 'src/stores/images-store';

const imageStore = useImagesStore();
</script>