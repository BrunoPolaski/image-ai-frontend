<template>
    <q-card class="column q-ma-md">
        <q-input
            outlined
            v-model="entity!.name"
            label="Nome da entidade"
            class="q-ma-md"
            :rules="[
                (val: string) => !!val || 'Campo obrigatório',
                (val: string) => val.length <= 20 || 'Máximo de 20 caracteres',    
            ]"
            lazy-rules
            input-class="text-h5 text-center"
        />
        <div>
            <div class="column fit">
                <div class="row flex-center q-ma-md">
                    <AddFolderBtn
                        label="Selecionar pasta para arquivos"
                        :folder-selected="folderSelected"
                        @folder-change="addFolder"
                    />
                    <PrimaryButton
                        color="red"
                        icon="delete"
                        rounded
                        v-if="folderSelected"
                        @click="emptyFiles"
                        class="q-ma-md"
                    />
                </div>
                <div v-if="entity!.files.length > 0" class="row flex-center text-subtitle2">Pasta: {{ entity?.files[0]?.webkitRelativePath.split('/')[0] }}</div>
            </div>
        </div>
    </q-card>
</template>

<script setup lang="ts">
import AddFolderBtn from './AddFolderBtn.vue';
import PrimaryButton from './PrimaryButton.vue';
import type Entity from 'src/models/entity';
import { ref } from 'vue';

const entity = defineModel<Entity>('entity');
const folderSelected = ref(false);

const addFolder = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        for (const file of files) {
            entity.value!.files.push(file);
        }
    }

    folderSelected.value = true;
};

const emptyFiles = () => {
    entity.value!.files = [];
    folderSelected.value = false;
};

</script>