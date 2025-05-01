import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import http from 'src/http/http';
import { modelFromJson, type Model } from 'src/models/model';

export const useModelStore = defineStore('model', {
  state: () => ({
    loadingModels: false,
    models: [] as Model[],
  }),

  actions: {
    async getTrainedModels() {
      try {
        this.loadingModels = true;
        const response = await http.get('/list-models');
        this.models = response.models.map((model: any) => modelFromJson(model));
      } catch (error) {
        console.error('Error getting models:', error);
        Notify.create({
          message: 'Erro ao obter modelos',
          color: 'negative',
        });
      } finally {
        this.loadingModels = false;
      }
    },
  },
});