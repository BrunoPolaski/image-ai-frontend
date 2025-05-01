<template>
  <q-page class="column flex-center">
    <div class="row justify-end width-50">
      <PrimaryButton
        icon="refresh"
        label="Reiniciar sessão"
        rounded
        color="grey"
        @click="imagesStore.resetSession"
        class="q-ma-md"
      />
    </div>

    <q-card class="width-50 q-pa-md bordered">
      <PrimaryStepper
        :loading="loading"
        v-model:current-step="step"
        :get-button-color="getButtonColor"
        :steps="steps"
        @btn-event="validateForm()">
        <template #step-1>
          <q-form
              greedy
              @submit="uploadFiles"
              class="row q-pa-md justify-center items-center">
              <q-select
                  :disable="imagesStore.uploadedFiles"
                  standout
                  v-model="withCharacteristics"
                  emit-value
                  map-options
                  :options="[
                      { label: 'Com características', value: true },
                      { label: 'Sem características', value: false }
                  ]"
                  label="Tipo de classificação"
                  class="fit q-ma-md"
                  color="white"
                  lazy-rules
              />
              <EntityInput
                  :disable="imagesStore.uploadedFiles"
                  class="q-ma-md bordered"
                  v-for="entity in imagesStore.entities"
                  :key="entity.id"
                  :entity="entity"
              />
              <PrimaryButton
                  v-if="(imagesStore.entities.length < 3 && withCharacteristics) || !withCharacteristics && !imagesStore.uploadedFiles"
                  label="Adicionar entidade"
                  icon="add"
                  rounded
                  size="lg"
                  @click="imagesStore.addEntity"
              />
              <div class="row flex-center fit">
                <PrimaryButton
                    :color="imagesStore.uploadedFiles ? 'green' : 'primary'"
                    :label="imagesStore.uploadedFiles ? 'Arquivos enviados' : 'Enviar arquivos'"
                    :icon="imagesStore.uploadedFiles ? 'check' : 'cloud_upload'"
                    rounded
                    size="lg"
                    type="submit"
                    :loading="loading"
                />
              </div>
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
            <q-input dense v-model.trim="imagesStore.modelSettings.modelName" label="Nome do modelo" class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.epochs" label="Número de épocas" class="q-ma-md"
              :rules="[(val: string) => !!val && isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.layers" label="Número de camadas" class="q-ma-md"
              :rules="[(val: string) => !!val && isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.neuronsByLayer" label="Número de neurônios por camada" class="q-ma-md"
              :rules="[(val: string) => !!val && isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.testPercentage" label="Porcentagem de arquivos para teste" class="q-ma-md"
              :rules="[(val: string) => !!val && isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
          </div>
        </template>
      </PrimaryStepper>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import CharacteristicInput from 'src/components/CharacteristicInput.vue';
import EntityInput from 'src/components/EntityInput.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import PrimaryStepper from 'src/components/stepper/PrimaryStepper.vue';
import type Characteristic from 'src/models/characteristics';
import { createEntity } from 'src/models/entity';
import { validateModelSettings } from 'src/models/model-settings';
import { useImagesStore } from 'src/stores/images-store';
import { isValidNumber } from 'src/utils';
import { onBeforeMount, ref } from 'vue'

const imagesStore = useImagesStore()
const step = ref(1)
const withCharacteristics = ref(false)
const loading = ref(false)

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
  return (step.value === 1 && ((imagesStore.entities.length < 3 && withCharacteristics) || !withCharacteristics.value) && imagesStore.uploadedFiles)
    ? 'primary'
    : 'grey';
};

const validateForm = () => {
    if (step.value === 1 && ((imagesStore.entities.length < 3 && withCharacteristics) || !withCharacteristics.value) && imagesStore.uploadedFiles) {
        step.value++;
    } else if (step.value === 2 && validateModelSettings(imagesStore.modelSettings)) {
        imagesStore.trainModel();
    } else {
      Notify.create({
        message: 'Preencha todos os campos obrigatórios',
        color: 'negative',
        position: 'top',
        timeout: 2000,
      });
    }
};

const uploadFiles = async () => {
    if (imagesStore.uploadedFiles) {
        Notify.create({
            message: 'Arquivos já enviados',
            color: 'warning',
            position: 'top',
            timeout: 2000,
        });
        return;
    }
    loading.value = true;
    try {
        await imagesStore.uploadFiles();
        imagesStore.uploadedFiles = true;
        Notify.create({
            message: 'Arquivos enviados com sucesso',
            color: 'positive',
            position: 'top',
            timeout: 2000,
        });
    } catch {
        Notify.create({
            message: 'Erro ao enviar arquivos',
            color: 'negative',
            position: 'top',
            timeout: 2000,
        });
    } finally {
        loading.value = false;
    }
};
</script>