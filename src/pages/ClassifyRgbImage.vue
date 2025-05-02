<template>
    <q-page class="column flex-center">
        <div class="width-50 row flex-start">
            <PrimaryButton
                rounded
                class="q-mb-md"
                label="Voltar"
                icon="arrow_back"
                to="/models"
            />
        </div>
        <q-card class="bordered column justify-between items-center width-50" style="min-height: 600px;">
            <div class="row q-pa-md text-h4 bg-primary text-white fit flex-center">Classificação de Imagem RGB</div>
            <div class="row q-ma-md bg-grey">
                <FilePicker
                    @file-change="file = $event"
                />
            </div>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import FilePicker from 'src/components/FilePicker.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { ref } from 'vue';
// import { useModelStore } from 'src/stores/model-store';
// import { useRoute } from 'vue-router';

// const route = useRoute();
const file = ref<File | null>(null);


</script>