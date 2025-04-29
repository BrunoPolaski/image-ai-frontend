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
    sessionId: '',
  }),

  actions: {
    async createSession() {
      try {
        const response = await http.post('/create-upload-session', {});
        this.sessionId = response.session_id;
      } catch (error) {
        console.error('Error creating session:', error);
        Notify.create({
          message: 'Erro ao criar sessão',
          color: 'negative',
        });
      }
    },
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

      await this.createSession();

      for (const entity of this.entities) {
        if (entity.files.length === 0) {
          return;
        }
        
        for (let i = 0; i < entity.files.length; i += 50) {
          const batch = entity.files.slice(i, i + 50);
          const formData = new FormData();
  
          formData.append('class_name', entity.name);
          batch.forEach((file) => {
            formData.append('files', file, file.name);
          });
  
          await http.post(`/upload-batch/${this.sessionId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response: any) => {
              console.log(`Batch ${i / 50 + 1} uploaded successfully:`, response);
            })
            .catch((error: any) => {
              console.error(`Error uploading batch ${i / 50 + 1}:`, error);
              return;
            });
        }

        entity.files = [];
        Notify.create({
          message: `Arquivos da entidade ${entity.name} enviados com sucesso`,
          color: 'positive',
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

      const formData = new FormData();

      for (const entity of this.entities) {
        const buffer: Array<File> = [];

        entity.files.forEach((file) => {
          if (buffer.length < 100) {
            buffer.push(file);
          }
        });

        buffer.forEach((file) => {
          formData.append('files', file, file.name);
        });
        formData.append('class_name', entity.name);

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