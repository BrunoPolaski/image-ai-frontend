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
        <div
            v-if="withCharacteristics"
        >
            <CharacteristicInput
                v-for="(characteristic, index) in entity!.characteristics"
                :key="index"
                v-model:name="characteristic.name"
                v-model:color="characteristic.color"
            />
            <div class="row justify-center fit">
                <PrimaryButton
                    class="fit"
                    rounded
                    v-if="entity!.characteristics.length < 3"
                    label="Adicionar característica"
                    icon="add"
                    @click="addCharacteristic"
                />
            </div>
        </div>
        <div
            v-if="withFolder"
        >
            <div
                class="column fit"
                v-if="singleFolder"
            >
                <div class="row flex-center q-ma-md">
                    <AddFolderBtn
                        label="Selecionar pasta para arquivos"
                        @folder-change="addFolder"
                    />
                </div>
                <div v-if="entity!.files.length > 0" class="row flex-center text-subtitle2">Pasta: {{ entity?.files[0]?.webkitRelativePath.split('/')[0] }}</div>
            </div>
            <div
                v-else
                class="row justify-center"
            >
                <div>
                    <AddFolderBtn
                        label="Selecionar pasta para arquivos de TESTE"
                        @folder-change="addTestFolder"
                        class="q-ma-md"
                    />
                    <div v-if="entity!.testFiles.length > 0" class="row flex-center text-subtitle2">Pasta: {{ entity?.testFolderName }}</div>
                </div>
                <div>
                    <AddFolderBtn
                        label="Selecionar pasta para arquivos de TREINO"
                        @folder-change="addTrainingFolder"
                        class="q-ma-md"
                    />
                    <div v-if="entity!.trainingFiles.length > 0" class="row flex-center text-subtitle2">Pasta: {{ entity?.trainingFolderName }}</div>
                </div>
            </div>
        </div>
    </q-card>
</template>

<script setup lang="ts">
import type Characteristic from 'src/models/characteristics';
import CharacteristicInput from './CharacteristicInput.vue';
import AddFolderBtn from './AddFolderBtn.vue';
import PrimaryButton from './PrimaryButton.vue';
import type Entity from 'src/models/entity';

defineProps({
    withCharacteristics: {
        type: Boolean,
        default: true
    },
    withFolder: Boolean,
    singleFolder: Boolean
});

const entity = defineModel<Entity>('entity');

const addCharacteristic = () => {
    const newCharacteristic: Characteristic = {
        id: Date.now(),
        name: '',
        color: 'rgb(0,0,0)',
    };
    entity.value!.characteristics.push(newCharacteristic);
};

const addFolder = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        for (const file of files) {
            entity.value!.files.push(file);
        }
    }
};

const addTestFolder = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        entity.value!.testFolderName = files[0]?.webkitRelativePath.split('/')[0];
        for (const file of files) {
            entity.value!.testFiles.push(file);
        }
    }
};

const addTrainingFolder = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
        entity.value!.trainingFolderName = files[0]?.webkitRelativePath.split('/')[0];
        for (const file of files) {
            entity.value!.trainingFiles.push(file);
        }
    }
};

</script>