<template>
    <q-stepper class="q-pa-none" flat v-model="currentStep" :header-nav="false" ref="stepper" color="primary" animated transition-duration="500">
        <q-step v-for="step in steps" :key="step.id" :name="step.id" :title="step.title" :icon="step.icon" :done="step.id < currentStep" :caption="step.caption" active-icon="none" class="column text-center justify-start overflow-hidden">
            <slot :name="`step-${step.id}`" />
        </q-step>
        <template v-slot:navigation>
            <div class="text-center">
                <PrimaryButton v-if="currentStep > 1" flat @click="currentStep--" label="Voltar" class="q-ml-sm" />
                <q-btn @click="$emit('btnEvent', currentStep)" :color="getButtonColor()" :loading="loading"
                :label="currentStep === steps.length ? 'Concluir' : 'Continuar'"/>
            </div>
        </template>
    </q-stepper>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Step } from 'src/models/step'
import PrimaryButton from '../PrimaryButton.vue'

const currentStep = defineModel<number>('currentStep') as any

defineEmits(['btnEvent'])

defineProps({
	steps: {
		type: Array<Step>,
		required: true
	},
	getButtonColor: {
		type: Function,
		required: true
	},
	loading: {
		type: Boolean,
		required: true
	}
})
</script>
