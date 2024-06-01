<template>
  <section class="relative">
    <section class="h-full w-full bg-[#111D34] overflow-auto flex justify-around items-center" :class="{ agentHidden: !state.showNeo }">
      <iframe src="http://112.31.213.24:7474/" frameborder="0" width="100%" height="100%" id="neo-iframe"></iframe>
    </section>
    <section class="h-full w-full bg-gray-50 absolute top-0" v-if="state.showUpLayer">
      <el-button link class="absolute right-1 top-1" @click="hiddenUpLayer">
        <Cross1Icon class="text-base h-4 w-4" v-if="state.type === 1"></Cross1Icon>
        <section class="rounded-full flex justify-center items-center h-6 w-6 bg-red-700" v-if="state.type !== 1">
          <Cross1Icon class="text-base h-4 w-4 text-white"></Cross1Icon>
        </section>
      </el-button>
      <Labels v-if="state.type === 1"></Labels>
      <iframe v-if="state.type === 2" src="http://112.31.213.24:5601/" frameborder="0" width="100%" height="100%" id="neo-iframe"></iframe>
    </section>
  </section>
</template>
<script setup lang="ts">
import { state, hiddenUpLayer } from '../../hook'
import { Cross1Icon } from '@radix-icons/vue'
import Labels from '../labels/index.vue'
</script>
<style>
.agentHidden {
  visibility: hidden;
}
</style>