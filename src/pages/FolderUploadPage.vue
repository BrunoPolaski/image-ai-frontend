<template>
    <q-page class="column items-center justify-center animated">
        <div class="fit row justify-center q-pa-md">
            <q-btn @click="$router.back()" icon="arrow_back" size="lg" color="primary" round />
        </div>
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
                @click="addEntity"
            />
            <div class="fixed-bottom-right">  
                <PrimaryButton
                    label="Enviar"
                    icon="send"
                    rounded
                    size="lg"
                    type="submit"
                    :loading="loading"
                />
            </div>
        </q-form>
    </q-page>
</template>

<script setup lang="ts">
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { useImagesStore } from 'src/stores/images-store';
import EntityInput from 'src/components/EntityInput.vue';
import { onBeforeMount, ref } from 'vue';
import { createEntity } from 'src/models/entity';

const imageStore = useImagesStore();
const loading = ref(false);

onBeforeMount(() => {
    imageStore.entities = [createEntity()];
});

const addEntity = () => {
    loading.value = true;
    imageStore.addEntity();
    loading.value = false;
};

</script>