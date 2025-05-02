import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { NotFoundError } from 'src/http/errors/notFoundError';
import http from 'src/http/http';
import type Entity from 'src/models/entity';
import { createEntity } from 'src/models/entity';
import type { ModelSettings } from 'src/models/model-settings';
import { sessionFromJson, type Session } from 'src/models/session';
import { ShowDialog, transformRgbToArray } from 'src/utils';

export const useImagesStore = defineStore('session', {
  state: () => ({
    sessionId: '',
    selectedSession: {} as Session,
    sessions: [] as Session[],
    loadingSessions: false,
    entities: [
      createEntity(),
    ] as Entity[],
    modelSettings: {} as ModelSettings,
    uploadedFiles: false,
    loadingTraining: false,
    trainedSession: false
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

      if (this.sessionId === '') await this.createSession();

      for (const entity of this.entities) {
        if (entity.files.length === 0) {
          throw new Error(`Necessário adicionar ao menos um arquivo para a entidade ${entity.name}`);
        }
        
        for (let i = 0; i < entity.files.length; i += 50) {
          const batch = entity.files.slice(i, i + 50);
          const formData = new FormData();
  
          formData.append('class_name', entity.name.replace(/\s+/g, '_'));
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
      }
    },
    async trainSession(withCharacteristics: boolean = false) {
      if (this.sessionId === '') {
        Notify.create({
          message: 'Necessário criar uma sessão antes de treinar',
          color: 'negative',
        });
        return;
      }

      for (const entity of this.entities) {
        if (withCharacteristics && entity.characteristics.length === 0) {
          Notify.create({
            message: `Necessário adicionar ao menos uma característica para a entidade ${entity.name}`,
            color: 'negative',
          });
          return;
        }

        if (withCharacteristics) {
          const rgbRanges = entity.characteristics.map((characteristic) => ({
            name: characteristic.name,
            rgb: transformRgbToArray(characteristic.rgb),
          }));

          this.modelSettings.rgb_ranges = (this.modelSettings.rgb_ranges || []).concat({
            class_name: entity.name.replace(/\s+/g, '_'),
            rgb_ranges: rgbRanges,
          });
        }
      }

      try {
        await http.post(`/train-from-session/${this.sessionId}`, this.modelSettings);
        this.trainedSession = true;
      } catch (error) {
        console.error('Error training session:', error);
        Notify.create({
          message: 'Erro ao treinar sessão',
          color: 'negative',
        });
      }
    },
    
    async getSessions() {
      this.loadingSessions = true;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const response = await http.get('/list-upload-sessions');
        console.log('Sessions:', response);
        this.sessions = response.sessions.map((session: any) => sessionFromJson(session));
      } catch (error) {
        console.error('Error getting sessions:', error);
        if (error instanceof NotFoundError) {
          Notify.create({
            message: 'Nenhuma sessão encontrada',
            color: 'warning',
          });
        } else {
          Notify.create({
            message: 'Erro ao obter sessões',
            color: 'negative',
          });
        }
      } finally {
        this.loadingSessions = false;
      }
    },

    selectSession(session: Session) {
      this.selectedSession = session;
      this.sessionId = session.session_id;
    },

    async resetSession(autoConfirm: boolean = false) {
      if (!autoConfirm) {
        if (!(await ShowDialog.showConfirm('Limpar sessão', 'Deseja limpar a sessão atual?', 'negative'))) return;
      }
      this.uploadedFiles = false;
      this.trainedSession = false;
      this.sessionId = '';
      this.entities = [createEntity()];
    }
  },
});