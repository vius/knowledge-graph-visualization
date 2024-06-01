<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'radix-vue'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] } & {
  showIndicator?: boolean
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const genUid = (length: number = 8) => {
  return Math.random().toString(36).substr(2, length);
}
const id = props.id || genUid()
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem v-bind="forwardedProps" :id="id" as="button" :class="cn(
    'data-[state=checked]:bg-blue-600 data-[state=checked]:text-white py-2 px-2 text-black text-opacity-85  rounded-md cursor-pointer:text-gray-600 hover:bg-gray-100',
    props.class,
  )
    ">
    <RadioGroupIndicator class="flex items-center justify-center" v-show="forwardedProps.showIndicator">
      <Circle class="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupIndicator>

    <span>
      {{ forwardedProps.value }}
    </span>
  </RadioGroupItem>
  <!-- <label :class="props.class" :for="id">
  </label> -->
  <!-- <label :for="forwardedProps.id" v-bind="forwardedProps">
    {{ forwardedProps.value }}
  </label> -->
</template>
