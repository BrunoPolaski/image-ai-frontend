import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import http from 'src/http/http';
import type Entity from 'src/models/entity';
import { createEntity } from 'src/models/entity';

export const useImagesStore = defineStore('counter', {
  state: () => ({
    entities: [
      createEntity(),
    ] as Entity[],
    testAndTrainingFolderName: '',
    isLoading: false,
  }),

  actions: {
    addEntity() {
      this.entities.push(createEntity());
    },
    async uploadFiles() {
      if (this.entities.length === 0) {
        Notify.create({
          message: 'Necessário adicionar ao menos uma entidade',
          color: 'negative',
        });
        
        return;
      }

      this.isLoading = true;
      const formData = new FormData();

      for (const entity of this.entities) {
        entity.files.forEach((file) => {
          formData.append(entity.name + '_' + 'files', file);
        });
        entity.trainingFiles.forEach((file) => {
          formData.append(entity.name + '_' + 'training_files', file);
        });
        entity.testFiles.forEach((file) => {
          formData.append(entity.name + '_' + 'test_files', file);
        });

        formData.append('classname', entity.name);
        await http.post('/upload', formData, {
          'Content-Type': 'multipart/form-data',
        })
          .then((response: any) => {
            console.log('Files uploaded successfully:', response);
          })
          .catch((error: any) => {
            console.error('Error uploading files:', error);
          });
      }
    },
    async uploadCharacteristicFiles() {
      if (this.entities.length === 0) {
        Notify.create({
          message: 'Necessário adicionar ao menos uma entidade',
          color: 'negative',
        });
        
        return;
      }

      this.isLoading = true;
      const formData = new FormData();

      for (const entity of this.entities) {
        const buffer: Array<File> = [];

        entity.files.forEach((file) => {
          if (buffer.length < 100) {
            buffer.push(file);
          }
        });

        buffer.forEach((file) => {
          formData.append(entity.name + '_' + 'files', file);
        });
        formData.append('classname', entity.name);

        try {
          const response = await http.post('/upload', formData, {
            'Content-Type': 'multipart/form-data',
          });
          console.log('Files uploaded successfully:', response);
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }
    }
  },
});