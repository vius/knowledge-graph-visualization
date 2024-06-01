<template>
  <section class="h-full w-full bg-[#111D34] overflow-auto flex justify-around p-4 items-center">
    <Button @click="check" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">历史信息</Button>
    <Button @click="check" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">预测信息</Button>
  </section>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
const check = () => { }
</script>