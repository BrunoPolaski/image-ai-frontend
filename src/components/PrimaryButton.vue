<template>
    <q-btn
        :disable="disable"
        :class="['q-ma-' + margin, 'q-pa-' + padding, 'shadow-2']"
        :icon="icon"
        :color="color"
        :label="label"
        :outline="outline"
        :dense="dense"
        :loading="loading"
        :rounded="rounded"
        :size="size"
        :fab="fab"
        :flat="flat"
        @click="emit('click', $event)"
    >
        <slot></slot>
    </q-btn>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    icon: {
        type: String,
        default: undefined
    },
    label: {
        type: String,
        default: ''
    },
    outline: Boolean,
    dense: Boolean,
    loading: Boolean,
    rounded: Boolean,
    size: {
        type: String,
        default: 'md'
    },
    margin: {
        type: String,
        default: 'md'
    },
    padding: {
        type: String,
        default: 'md'
    },
    fab: Boolean,
    color: {
        type: String,
        default: 'primary'
    },
    disable: Boolean,
    flat: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);
</script>

