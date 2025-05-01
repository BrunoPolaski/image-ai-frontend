<template>
    <q-page class="flex flex-center">
        <PrimaryButton
        icon="dynamic_feed"
        label="Ir para sessões"
        rounded
        @click="router.push('/')"
        class="fixed-left"
        style="height: 100px; align-self: center;"
        />
        <q-table
            class="width-50"
            :rows="modelStore.models"
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
                        @click="router.push(`/model/${props.row.model_name}`)"
                    />
                </q-td>
            </template>
            <template #header-cell-actions="props">
                <q-t :props="props"/>
            </template>
        </q-table>
    </q-page>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import type { Model } from 'src/models/model';
import { useModelStore } from 'src/stores/model-store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const columns: QTableColumn[] = [
    { name: 'modelName', label: 'Nome', align: 'left', field: (row: Model) => row.model_name },
    { name: 'modelSizeMb', label: 'Tamanho', align: 'left', field: (row: Model) => `${row.model_size_mb}MBs` },
    { name: 'classes', label: 'Classes', align: 'left', field: (row: Model) => row.classes.join(', ') },
    { name: 'createdAt', label: 'Criado em', align: 'left', field: (row: Model) => row.created_date.toLocaleString('pt-BR') },
    { name: 'actions', label: 'Ações', align: 'left', field: 'actions' },
];

const router = useRouter();
const modelStore = useModelStore();

onMounted(async () => {
    await modelStore.getTrainedModels();
});
</script>