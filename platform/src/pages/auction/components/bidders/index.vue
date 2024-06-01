<template>
  <section class="h-full w-full bg-[#111D34] overflow-auto flex flex-col justify-around px-2 py-4">
    <section class="flex justify-between items-center">
      <span class="mr-2 min-w-10 text-sm ">按类型</span>
      <section class="flex flex-1 justify-between items-center">
        <Button @click="check" class="w-20 h-8 bg-[#008FFF] rounded-[3px]">资产类要素</Button>
        <Button @click="check" class="w-20 h-8 bg-[#008FFF] rounded-[3px]">内容类要素</Button>
        <Button @click="check" class="w-20 h-8 bg-[#008FFF] rounded-[3px]">社工类要素</Button>
      </section>
    </section>
    <section class="flex justify-between items-center">
      <span class="mr-2 min-w-10 text-sm ">按层级</span>
      <section class="flex justify-between items-center flex-1">
        <Button @click="check" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">用户层</Button>
        <Button @click="check" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">网络层</Button>
        <Button @click="check" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">地理层</Button>
        <Button @click="check" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">物理层</Button>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
const check = () => { }
</script>