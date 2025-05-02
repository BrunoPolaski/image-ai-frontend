<template>
  <q-page class="column flex-center q-pa-md">
    <PrimaryButton
      v-if="step === 1"
      icon="view_in_ar"
      label="Ir para modelos"
      rounded
      @click="$router.push('/models')"
      class="fixed-right"
      style="height: 100px; align-self: center;"
    />
    <div class="row justify-end width-50">
      <PrimaryButton
        v-if="!listedSessionsOn"
        icon="list"
        label="Listar sessões"
        :loading="imagesStore.loadingSessions"
        rounded
        @click="listSessions"
        class="q-ma-md"
      />
      <PrimaryButton
        v-if="listedSessionsOn"
        icon="close"
        label="Fechar lista"
        rounded
        @click="listedSessionsOn = false"
        class="q-ma-md"
      />
      <PrimaryButton
        icon="refresh"
        label="Reiniciar sessão"
        rounded
        color="grey"
        @click="imagesStore.resetSession(false)"
        class="q-ma-md"
      />
    </div>

    <q-card class="width-50 bordered q-py-md">
      <q-table
        card-container-class="row flex-center fit"
        card-class="bg-primary text-white bordered"
        grid
        v-if="listedSessionsOn"
        :rows="imagesStore.sessions"
        :columns="sessionsColumns"
        row-key="id"
        :loading="imagesStore.loadingSessions"
        loading-label="Carregando sessões..."
        no-data-label="Nenhuma sessão encontrada"
        no-results-label="Nenhum resultado encontrado"
      >
        <template #item="props">
          <div
            class="q-ma-md"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card bordered flat class="bg-primary text-white bordered q-pa-md">
              <q-list dense>
                <q-item class="q-ma-sm" v-for="col in props.cols.filter((col: any) => col.name !== 'actions')" :key="col.name">
                  <q-item-section>
                    <q-item-label class="text-grey">{{ col.label }}</q-item-label>
                    <q-item-label>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <PrimaryButton
                icon="system_update_alt"
                label="Usar sessão"
                rounded
                color="grey"
                @click="reconfigureSession(props.row)"
                size="sm"
              />
            </q-card>
          </div>
        </template>
      </q-table>
      <div v-else-if="imagesStore.loadingSessions" class="row flex-center fit q-ma-md">
        <q-spinner-dots
          size="50px"
          color="primary"
          v-if="imagesStore.loadingSessions"
        />
      </div>
      <PrimaryStepper
        v-else
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
                  @update:model-value="imagesStore.entities = imagesStore.entities.slice(0, 3)"
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
              <div
                class="fit"
                v-if="imagesStore.selectedSession.session_id"
              >
                Entidades já cadastradas: {{ imagesStore.selectedSession.classes.join(', ') }}
              </div>
              <div
                class="fit"
                v-if="imagesStore.selectedSession.session_id"
              >
                Para adicionar mais imagens para uma entidade já cadastrada, apenas use o mesmo nome.
              </div>
              <EntityInput
                  :with-characteristics="withCharacteristics"
                  :disable="imagesStore.uploadedFiles"
                  class="q-ma-md bordered"
                  v-for="entity in imagesStore.entities"
                  :key="entity.id"
                  :entity="entity"
              />
              <div class="row flex-center fit">
                <PrimaryButton
                    v-if="(imagesStore.entities.length < 3 && withCharacteristics) || !withCharacteristics && !imagesStore.uploadedFiles"
                    label="Adicionar entidade"
                    icon="add"
                    rounded
                    size="lg"
                    @click="imagesStore.addEntity"
                />
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
          <div>
            <q-input dense v-model.trim="imagesStore.modelSettings.model_name" label="Nome do modelo. Obrigatório." class="q-ma-md"
              :rules="[(val: string) => !!val || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.epochs" label="Número de épocas. Padrão: 30." class="q-ma-md"
              :rules="[(val: string) => !val || isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.layers" label="Número de camadas. Padrão: 6." class="q-ma-md"
              :rules="[(val: string) => !val || isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.neurons_by_layer" label="Número de neurônios por camada. Padrão: 6." class="q-ma-md"
              :rules="[(val: string) => !val || isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
            <q-input dense v-model.trim="imagesStore.modelSettings.test_percentage" label="Porcentagem de arquivos para teste. Padrão: 20." class="q-ma-md"
              :rules="[(val: string) => !val || isValidNumber(val) || 'Campo obrigatório']" lazy-rules />
          </div>
          <PrimaryButton
            rounded
            :color="imagesStore.trainedSession ? 'green' : 'primary'"
            :label="imagesStore.trainedSession ? 'Treinamento já inicializado' : 'Treinar modelo'"
            :icon="imagesStore.trainedSession ? 'check' : 'play_arrow'"
            @click="trainSession"
            :loading="imagesStore.loadingTraining"
          />
        </template>
      </PrimaryStepper>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar';
import { Notify } from 'quasar';
import EntityInput from 'src/components/EntityInput.vue';
import PrimaryButton from 'src/components/PrimaryButton.vue';
import PrimaryStepper from 'src/components/stepper/PrimaryStepper.vue';
import { createEntity } from 'src/models/entity';
import { validateModelSettings } from 'src/models/model-settings';
import type { Session } from 'src/models/session';
import { useImagesStore } from 'src/stores/images-store';
import { isValidNumber } from 'src/utils';
import { onBeforeMount, ref } from 'vue'

const imagesStore = useImagesStore()
const step = ref(1)
const withCharacteristics = ref(false)
const loading = ref(false)
const listedSessionsOn = ref(false)
const listSessions = async () => {
  listedSessionsOn.value = true
  await imagesStore.getSessions()
};

const sessionsColumns: QTableColumn[] = [
  { name: 'sessionId', label: 'ID', align: 'left', field: 'session_id' },
  { name: 'totalFiles', label: 'Total de arquivos', align: 'left', field: 'total_files' },
  { name: 'createdAt', label: 'Data de criação', align: 'left', field: (row: Session) => row.created_at.toLocaleString('pt-BR') },
  { name: 'status', label: 'Status', align: 'left', field: 'status' },
  { name: 'classes', label: 'Classes', align: 'left', field: (row: Session) => row.classes.join(', ') },
  { name: 'actions', label: 'Ações', align: 'left', field: 'actions' }
];

const steps = [
    { id: 1, title: 'Upload de arquivos', icon: 'cloud_upload', caption: 'Selecione os arquivos para treinar a CNN' },
    { id: 2, title: 'Configurações do modelo', icon: 'settings', caption: 'Defina as configurações do modelo' },
];


onBeforeMount(() => {
    imagesStore.entities = [createEntity()];
});

const getButtonColor = () => {
  if (step.value === 1 && canProceedToStep2()) {
    return 'primary';
  } else if (step.value === 2 && trainedModel()) {
    return 'primary';
  }

  return 'grey';
};

const validateForm = async () => {
    if (step.value === 1 && canProceedToStep2()) {
      step.value++;
    } else if (step.value === 2 && trainedModel()) {
      step.value = 1;
      listedSessionsOn.value = true;

      await imagesStore.resetSession(true);
      for (let i = 0; i < 3; i++) {
          await imagesStore.getSessions();
          await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } else {
      Notify.create({
        message: 'Preencha todos os campos obrigatórios',
        color: 'negative',
        position: 'top',
        timeout: 2000,
      });
    }
};

const canProceedToStep2 = () => {
  if (imagesStore.selectedSession.session_id) return true;
  if (withCharacteristics.value) {
    return imagesStore.uploadedFiles &&
           imagesStore.entities.length > 0 &&
           imagesStore.entities.length <= 3 &&
           !imagesStore.entities.some(e => e.characteristics.length === 0);
  } else {
    return imagesStore.uploadedFiles;
  }
};

const trainedModel = () => {
  return validateModelSettings(imagesStore.modelSettings) ||
    (imagesStore.selectedSession.session_id && imagesStore.modelSettings.model_name) &&
    imagesStore.trainedSession;
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
    } catch (e: any) {
        Notify.create({
            message: e.message,
            color: 'negative',
            position: 'top',
            timeout: 2000,
        });
    } finally {
        loading.value = false;
    }
};

const trainSession = async () => {
    if (imagesStore.trainedSession) {
        Notify.create({
            message: 'Treinamento já inicializado',
            color: 'warning',
            position: 'top',
            timeout: 2000,
        });
        return;
    }

    try {
        await imagesStore.trainSession();
        Notify.create({
            message: 'Treinamento iniciado com sucesso',
            color: 'positive',
            position: 'top',
            timeout: 2000,
        });
    } catch {
        Notify.create({
            message: 'Erro ao iniciar o treinamento',
            color: 'negative',
            position: 'top',
            timeout: 2000,
        });
    }
};

const reconfigureSession = async (session: Session) => {
  await imagesStore.resetSession(false);
  
  imagesStore.selectSession(session);

  listedSessionsOn.value = false;
};
</script>