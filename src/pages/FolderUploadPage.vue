<template>
    <q-page class="column items-center justify-evenly animated">
        <q-form
            greedy
            @submit="imageStore.uploadFiles"
            class="row q-pa-md flex-center">
            <EntityInput
                class="q-ma-md bordered"
                v-for="entity in imageStore.entities"
                :key="entity.id"
                :entity="entity"
                with-folder
                :with-characteristics="false"
            />
            <PrimaryButton
                label="Adicionar entidade"
                icon="add"
                rounded
                size="lg"
                @click="imageStore.addEntity"
            />
            <div class="fixed-bottom-right">  
                <PrimaryButton
                label="Enviar"
                icon="send"
                rounded
                size="lg"
                type="submit"
            />
            </div>
        </q-form>
    </q-page>
</template>

<script setup lang="ts">
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { useImagesStore } from 'src/stores/images-store';
import EntityInput from 'src/components/EntityInput.vue';

const imageStore = useImagesStore();

</script>