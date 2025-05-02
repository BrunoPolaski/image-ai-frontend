<template>
    <q-page class="column flex-center">
        <PrimaryButton
        icon="dynamic_feed"
        label="Ir para sessões"
        rounded
        @click="router.push('/')"
        class="fixed-left"
        style="height: 100px; align-self: center;"
        />
        <div class="row flex-center q-ma-md">
            <PrimaryButton
                :outline="!isCnnModelTable"
                icon="change_history"
                label="Modelos CNN"
                rounded
                @click="isCnnModelTable = true"
            />
            <PrimaryButton
                :outline="isCnnModelTable"
                icon="image_aspect_ratio"
                label="Modelos RGB"
                rounded
                @click="isCnnModelTable = false"
            />
        </div>
        <div class="row fit flex-center" style="min-height: 700px;">
            <q-table
                class="width-75 bordered q-ma-md"
                :rows="isCnnModelTable ? modelStore.cnnModels : modelStore.rgbModels"
                :columns="columns"
                row-key="id"
                :loading="modelStore.loadingModels"
                loading-label="Carregando modelos..."
                no-data-label="Nenhum modelo encontrado"
                no-results-label="Nenhum resultado encontrado"
            >
                <template #body-cell-actions="props">
                    <q-td :props="props">
                        <PrimaryButton
                            size="sm"
                            icon="select_all"
                            label="Usar"
                            rounded
                            @click="router.push(`${route.path + '/' + props.row.model_name}/${isCnnModelTable ? 'cnn' : 'rgb'}`)"
                        />
                    </q-td>
                </template>
                <template #body-cell-accuracy="props">
                    <q-td :props="props">
                        <q-chip
                            size="md"
                            :label="props.row.accuracy ? intToPercentage(props.row.accuracy) : 'Indisponível'"
                            :color="getProbabilityColor(props.row.accuracy)"
                            text-color="white"
                            class="text-h6 text-center"
                        />
                    </q-td>
                </template>
                <template #header-cell-actions="props">
                    <q-th :props="props"/>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import type { Model } from 'src/models/model';
import { useModelStore } from 'src/stores/model-store';
import { getProbabilityColor, intToPercentage } from 'src/utils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const columns: QTableColumn[] = [
    { name: 'modelName', label: 'Nome', align: 'left', field: (row: Model) => row.model_name },
    { name: 'modelSizeMb', label: 'Tamanho', align: 'left', field: (row: Model) => `${row.model_size_mb}MBs` },
    { name: 'classes', label: 'Classes', align: 'left', field: (row: Model) => row.classes.join(', ') },
    { name: 'createdAt', label: 'Criado em', align: 'left', field: (row: Model) => row.created_date.toLocaleString('pt-BR') },
    { name: 'accuracy', label: 'Acurácia', align: 'left', field: (row: Model) => row.accuracy ? row.accuracy : 'Indísponivel' },
    { name: 'training_samples', label: 'Imagens usadas para treino', align: 'left', field: (row: Model) => row.training_samples || 'Indísponivel' },
    { name: 'test_samples', label: 'Imagens usadas para teste', align: 'left', field: (row: Model) => row.test_samples || 'Indísponivel' },
    { name: 'actions', label: 'Ações', align: 'left', field: 'actions' },
];

const isCnnModelTable = ref(true);
const router = useRouter();
const modelStore = useModelStore();

onMounted(async () => {
    await Promise.all([
        modelStore.getTrainedRgbModels(),
        modelStore.getTrainedCnnModels(),
    ]);
});

</script>

<style scoped>
.transition {
    transition: all 0.5s ease-in-out;
}
</style>