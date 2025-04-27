<template>
    <q-card>
        <q-input
            outlined
            v-model="name"
            label="Nome da entidade"
            class="q-ma-md"
            :rules="[
                (val: string) => !!val || 'Campo obrigatório',
                (val: string) => val.length <= 20 || 'Máximo de 20 caracteres',    
            ]"
            lazy-rules
            input-class="text-h5 text-center"
        />
        <CharacteristicInput
            v-for="(characteristic, index) in characteristics"
            :key="index"
            v-model:name="characteristic.name"
            v-model:color="characteristic.color"
        />
        <div class="row justify-center">
            <PrimaryButton
                rounded
                v-if="characteristics!.length < 3"
                label="Adicionar característica"
                icon="add"
                @click="addCharacteristic"
            />
            <AddFolderBtn
                @folder-change="$emit('folderChange', $event)"
                class="q-ma-md"
            />
        </div>
    </q-card>
</template>

<script setup lang="ts">
import type Characteristic from 'src/models/characteristics';
import CharacteristicInput from './CharacteristicInput.vue';
import AddFolderBtn from './AddFolderBtn.vue';
import PrimaryButton from './PrimaryButton.vue';

defineEmits(['folderChange']);

const name = defineModel<string>('name');

const characteristics = defineModel<Characteristic[]>('characteristics');

const addCharacteristic = () => {
    const newCharacteristic: Characteristic = {
        id: Date.now(),
        name: '',
        color: '#000000'
    };
    characteristics.value!.push(newCharacteristic);
};

</script>