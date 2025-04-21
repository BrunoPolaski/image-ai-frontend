<template>
    <q-card>
        <q-input
            filled
            v-model="name"
            label="Nome da entidade"
            class="q-ma-md"
            :rules="[
                (val: string) => !!val || 'Campo obrigatório',
                (val: string) => val.length <= 20 || 'Máximo de 20 caracteres',    
            ]"
            lazy-rules
        />
        <CharacteristicInput
            v-for="(characteristic, index) in characteristics"
            :key="index"
            v-model:name="characteristic.name"
            v-model:color="characteristic.color"
        />
        <div class="row justify-center">
            <q-btn
                rounded
                v-if="characteristics!.length < 3"
                class="q-ma-md"
                color="primary"
                label="Adicionar característica"
                icon="add"
                @click="addCharacteristic"
            />
        </div>
    </q-card>
</template>

<script setup lang="ts">
import type Characteristic from 'src/models/characteristics';
import CharacteristicInput from './CharacteristicInput.vue';

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