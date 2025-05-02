<template>
    <q-card class="column q-ma-md">
        <q-input
            :disable="disable"
            outlined
            v-model.trim="entity!.name"
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
            <div class="column">
                <div class="row flex-center">
                    <FolderPicker
                        :disable="disable"
                        label="Selecionar pasta para arquivos"
                        :folder-selected="folderSelected"
                        @folder-change="addFolder"
                    />
                    <PrimaryButton
                        :disable="disable"
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
        <div
            v-if="withCharacteristics"
        >
            <CharacteristicInput
                :disable="disable"
                v-for="(characteristic, index) in entity!.characteristics"
                :key="index"
                v-model:name="characteristic.name"
                v-model:color="characteristic.rgb"
            />
        </div>
        <div
            class="row flex-center"
            v-if="withCharacteristics"
        >
            <PrimaryButton
                :disable="disable"
                rounded
                v-if="entity!.characteristics.length < 3"
                label="Adicionar característica"
                icon="add"
                @click="addCharacteristic"
            />
        </div>
    </q-card>
</template>

<script setup lang="ts">
import type Characteristic from 'src/models/characteristics';
import FolderPicker from './FolderPicker.vue';
import PrimaryButton from './PrimaryButton.vue';
import type Entity from 'src/models/entity';
import { ref } from 'vue';
import CharacteristicInput from './CharacteristicInput.vue';

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

const addCharacteristic = () => {
    const newCharacteristic: Characteristic = {
        name: '',
        rgb: 'rgb(0,0,0)',
    };
    entity.value!.characteristics.push(newCharacteristic);
};

const emptyFiles = () => {
    entity.value!.files = [];
    folderSelected.value = false;
};

defineProps({
    disable: Boolean,
    withCharacteristics: {
        type: Boolean,
        default: true,
    },
});

</script>