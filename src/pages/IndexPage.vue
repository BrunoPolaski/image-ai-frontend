<template>
  <q-page class="column flex-center">
    <q-card class="width-50 q-pa-md q-ma-md bordered">
      <PrimaryStepper
        :loading="loading"
        v-model:current-step="step"
        :get-button-color="getButtonColor"
        :steps="steps"
        @btn-event="validateForm($event)">
        <template #step-1>
          <q-form
              greedy
              @submit="imagesStore.uploadFiles"
              class="row q-pa-md justify-center items-center">
              <q-select
                  standout
                  v-model="withCharacteristics"
                  emit-value
                  map-options
                  :options="[
                      { label: 'Com características', value: true },
                      { label: 'Sem características', value: false }
                  ]"
                  label="Tipo de entidade"
                  class="fit q-ma-md"
                  color="white"
                  :rules="[(val: string) => !!val || 'Campo obrigatório']"
                  lazy-rules
              />
              <EntityInput
                  class="q-ma-md bordered"
                  v-for="entity in imagesStore.entities"
                  :key="entity.id"
                  :entity="entity"
              />
              <PrimaryButton
                  v-if="(imagesStore.entities.length < 3 && withCharacteristics) || !withCharacteristics"
                  label="Adicionar entidade"
                  icon="add"
                  rounded
                  size="lg"
                  @click="imagesStore.addEntity"
              />
              <PrimaryButton
                  label="Fazer upload"
                  icon="upload"
                  rounded
                  size="lg"
                  type="submit"
                  :loading="loading"
              />
          </q-form>
        </template>
        <template #step-2>
          <div v-if="withCharacteristics" >
              <CharacteristicInput
                v-for="(characteristic, index) in imagesStore.characteristics"
                :key="index"
                v-model:name="characteristic.name"
                v-model:color="characteristic.color"
              />
              <div class="row justify-center fit">
                <PrimaryButton
                    class="fit"
                    rounded
                    v-if="imagesStore.characteristics.length < 3"
                    label="Adicionar característica"
                    icon="add"
                    @click="addCharacteristic"
                />
              </div>
          </div>
          <div>
            <q-input dense v-model.trim="imagesStore.modelSettings.epochs" label="Número de épocas" class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.layers" label="Número de camadas" class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.modelName" label="Nome do modelo" class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.neuronsByLayer" label="Número de neurônios por camada" class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.testPercentage" label="Porcentagem de arquivos para teste" class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
          </div>
        </template>
      </PrimaryStepper>
    </q-card>
    <div class="column fit flex-center">
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EntityInput from 'src/components/EntityInput.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import PrimaryStepper from 'src/components/stepper/PrimaryStepper.vue';
import type Characteristic from 'src/models/characteristics';
import { createEntity } from 'src/models/entity';
import { validateModelSettings } from 'src/models/model-settings';
import { useImagesStore } from 'src/stores/images-store';
import { onBeforeMount, ref } from 'vue'

const imagesStore = useImagesStore()
const step = ref(1)
const withCharacteristics = ref(false)
const loading = ref(false)
const uploadedFiles = ref(false)

const steps = [
    { id: 1, title: 'Upload de arquivos', icon: 'cloud_upload', caption: 'Selecione os arquivos para treinar a CNN' },
    { id: 2, title: 'Configurações do modelo', icon: 'settings', caption: 'Defina as configurações do modelo' },
];

const addCharacteristic = () => {
    const newCharacteristic: Characteristic = {
        name: '',
        color: 'rgb(0,0,0)',
    };
    imagesStore.characteristics.push(newCharacteristic);
};


onBeforeMount(() => {
    imagesStore.entities = [createEntity()];
});

const getButtonColor = () => {
  return (step.value === 1 && ((imagesStore.entities.length < 3 && withCharacteristics) || !withCharacteristics.value) && uploadedFiles.value)
    ? 'grey'
    : 'primary';
};

const validateForm = async (step: number) => {
    if (step === 1 && (imagesStore.entities.length < 3 || !withCharacteristics.value) && uploadedFiles.value) {
      try {
        await imagesStore.uploadFiles();
        uploadedFiles.value = true;
        step++;
        return true;
      } catch (error) {
        console.error('Error uploading files:', error);
        return false;
      }
    } else if (step === 2 && validateModelSettings(imagesStore.modelSettings)) {
        // imagesStore.trainModel();
    }
};
</script>