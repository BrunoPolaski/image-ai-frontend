import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import http from 'src/http/http';

export const useImagesStore = defineStore('counter', {
  state: () => ({
    trainingImages: [] as string[],
    testImages: [] as string[],
    isLoading: false,
  }),

  actions: {
    uploadFiles() {
      if (this.trainingImages.length === 0 && this.testImages.length === 0) {
        Notify.create({
          message: 'Selecione pelo menos um arquivo para upload',
          color: 'negative',
        });
        
        return;
      }

      this.isLoading = true;
      const formData = new FormData();
      
      this.trainingImages.forEach((file) => {
          formData.append('trainingFiles', file);
      });
      
      this.testImages.forEach((file) => {
          formData.append('testFiles', file);
      });

      http.requestPost('/upload', formData, {
        'Content-Type': 'multipart/form-data',
      })
        .then((response) => {
          console.log('Files uploaded successfully:', response);
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
        })
        .finally(() => {
          this.isLoading = false;
          this.trainingImages = [];
          this.testImages = [];
        }
      );
    }
  },
});