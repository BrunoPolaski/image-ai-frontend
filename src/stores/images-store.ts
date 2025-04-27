import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import http from 'src/http/http';

export const useImagesStore = defineStore('counter', {
  state: () => ({
    trainingFiles: [] as File[],
    testFiles: [] as File[],
    testFolderName: '',
    trainingFolderName: '',
    isLoading: false,
  }),

  actions: {
    uploadFiles() {
      if (this.trainingFiles.length === 0 && this.testFiles.length === 0) {
        Notify.create({
          message: 'Selecione pelo menos um arquivo para upload',
          color: 'negative',
        });
        
        return;
      }

      this.isLoading = true;
      const formData = new FormData();
      
      this.trainingFiles.forEach((file) => {
          formData.append('trainingFiles', file);
      });
      
      this.testFiles.forEach((file) => {
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
          this.trainingFiles = [];
          this.testFiles = [];
        }
      );
    },
    handleTestFolderChange(event: Event) {
      this.testFolderName = (event.target as HTMLInputElement).files!.item(0)!.webkitRelativePath;
      const files = (event.target as HTMLInputElement).files;

      if (files) {
        for (const file of files) {
          this.testFiles.push(file);
        }
      }
    },
    handleTrainingFolderChange(event: Event) {
      this.trainingFolderName = (event.target as HTMLInputElement).value;
      const files = (event.target as HTMLInputElement).files;

      if (files) {
        for (const file of files) {
          this.trainingFiles.push(file);
        }
      }
    },
  },
});