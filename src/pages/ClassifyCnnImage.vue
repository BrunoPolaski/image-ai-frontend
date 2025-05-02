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
        <q-card class="bg-grey-2 bordered column flex-center width-50" style="min-height: 600px;">
            <FilePicker
                @file-change="modelStore.image = $event"
                v-model:image-url="imageUrl"
            />
            <PrimaryButton
                class="q-ma-md"
                label="Classificar"
                icon="category"
                rounded
                @click="modelStore.classifyImageCnn(modelName)"
            />
        </q-card>
        <q-dialog v-model="modelStore.dialogOpen">
            <q-card class="q-pa-xl popup-card">
                <div class="row flex-center full-border bg-green-2" style="width: 100px; height: 100px;">
                    <q-icon>
                        <q-icon name="check" size="50px" color="green"/>
                    </q-icon>
                </div>
                <div class="q-ma-md text-h6 text-primary">Classificação de imagem concluída!</div>
                <div v-if="imageUrl" class="q-mt-md">
                    <img :src="imageUrl" alt="Preview" style="max-width: 100%; max-height: 200px;border-radius: 25px;" />
                </div>
                <q-card-section>
                    <div class="row q-ma-md">
                        <q-chip color="primary" text-color="white" class="text-h2">
                            <span class="non-selectable">
                                {{modelStore.getClassificationResult }}
                                <q-tooltip
                                    v-if="modelStore.getClassificationResult"
                                    anchor="top middle"
                                    self="bottom middle"
                                    :offset="[0, 10]"
                                    :delay="100"
                                    :content="modelStore.getClassificationResult"
                                    transition-show="jump-down"
                                    transition-hide="jump-up"
                                    transition-duration="200"
                                    transition-entering="jump-down"
                                    transition-leaving="jump-up"
                                >
                                    <span class="text-h6">Classificação</span>
                                </q-tooltip>
                            </span>
                        </q-chip>
                        <q-chip :color="getProbabilityColor(modelStore.classificationProbability)" text-color="white" class="text-h2">
                            <span class="non-selectable">
                                {{intToPercentage(modelStore.classificationProbability) }}
                                <q-tooltip
                                    v-if="intToPercentage(modelStore.classificationProbability)"
                                    anchor="top middle"
                                    self="bottom middle"
                                    :offset="[0, 10]"
                                    :delay="100"
                                    :content="intToPercentage(modelStore.classificationProbability)"
                                    transition-show="jump-down"
                                    transition-hide="jump-up"
                                    transition-duration="200"
                                    transition-entering="jump-down"
                                    transition-leaving="jump-up"
                                >
                                    <span class="text-h6">Probabilidade</span>
                                </q-tooltip>
                            </span>
                        </q-chip>
                    </div>
                </q-card-section>
                <q-card-actions>
                    <PrimaryButton rounded label="OK" @click="modelStore.dialogOpen = false" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup lang="ts">
import FilePicker from 'src/components/FilePicker.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { useModelStore } from 'src/stores/model-store';
import { getProbabilityColor, intToPercentage } from 'src/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const modelStore = useModelStore();
const route = useRoute();
const modelName = route.params.modelName as string;
const imageUrl = ref('')
</script>

<style scoped>
.popup-card{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    min-width: 40%;
    border-radius: 25px !important;
}

.full-border {
    border-radius: 25px !important;
    border: 2px solid #4caf50 !important;
}
</style>