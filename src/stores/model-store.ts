import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { NotFoundError } from 'src/http/errors/notFoundError';
import http from 'src/http/http';
import { modelFromJson, type Model } from 'src/models/model';
import { capitalize } from 'vue';

export const useModelStore = defineStore('model', {
  state: () => ({
    loadingModels: false,
    rgbModels: [] as Model[],
    cnnModels: [] as Model[],
    image: {} as File,
    classificationResult: "",
    classificationProbability: 0,
    dialogOpen: false,
  }),
  getters: {
    getProbabilityInPercent(): string {
      const probability = this.classificationProbability * 100;
      return probability.toFixed(2) + '%';
    },
    getProbabilityInColor(): string {
      const probability = this.classificationProbability * 100;
      if (probability >= 80) {
        return 'positive';
      } else if (probability >= 30) {
        return 'warning';
      } else {
        return 'negative';
      }
    },
    getClassificationResult(): string {
      return capitalize(this.classificationResult);
    },
  },
  actions: {
    async getTrainedRgbModels() {
      try {
        this.loadingModels = true;
        const response = await http.get('/rgb/list-models');
        this.rgbModels = response.models.map((model: any) => modelFromJson(model));
      } catch (error) {
        console.error('Error getting models:', error);
        if (error instanceof NotFoundError) {
          Notify.create({
            message: 'Nenhum modelo RGB encontrado',
            color: 'warning',
          });
        } else {
          Notify.create({
            message: 'Erro ao obter modelos RGB',
            color: 'negative',
          });
        }
      } finally {
        this.loadingModels = false;
      }
    },

    async getTrainedCnnModels() {
      try {
        this.loadingModels = true;
        const response = await http.get('/cnn/list-models');
        this.cnnModels = response.models.map((model: any) => modelFromJson(model));
      } catch (error) {
        console.error('Error getting models:', error);
        if (error instanceof NotFoundError) {
          Notify.create({
            message: 'Nenhum modelo CNN encontrado',
            color: 'warning',
          });
        } else {
          Notify.create({
            message: 'Erro ao obter modelos CNN',
            color: 'negative',
          });
        }
      } finally {
        this.loadingModels = false;
      }
    },

    async classifyImageCnn(modelName: string) {
      if (!this.image) {
        Notify.create({
          message: 'Nenhuma imagem selecionada',
          color: 'negative',
        });
        return;
      }

      try {
        const formData = new FormData();
        formData.append('image', this.image);
        formData.append('model_name', modelName.toLowerCase());

        const response = await http.post('/cnn/classify-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Classification response:', response.classification_result);

        this.classificationResult = response.classification_result.class_name;
        this.classificationProbability = response.classification_result.confidence;

        this.dialogOpen = true;
      } catch (error) {
        console.error('Error classifying image:', error);
        Notify.create({
          message: 'Erro ao classificar imagem',
          color: 'negative',
        });
      }
    }
  },
});