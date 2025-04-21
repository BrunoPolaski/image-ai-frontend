<template>
    <q-btn
    :class="['q-ma-' + margin, 'q-pa-' + padding, 'shadow-2']"
    :icon="icon"
    color="primary"
    :label="label"
    :outline="outline"
    :dense="dense"
    :loading="loading"
    :rounded="rounded"
    :size="size"
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
    }
});

const emit = defineEmits(['click']);
</script>

