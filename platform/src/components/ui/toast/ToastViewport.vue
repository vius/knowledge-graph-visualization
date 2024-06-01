<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ToastViewport, type ToastViewportProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('fixed top-2 right-2 z-[10000] flex max-h-screen flex-col-reverse w-auto', props.class)" />
</template>
