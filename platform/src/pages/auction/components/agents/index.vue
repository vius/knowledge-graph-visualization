<template>
  <section class="relative" ref="containerRef">
    <section class="h-full w-full bg-[#111D34] overflow-auto flex justify-around items-center relative" :class="{ agentHidden: !state.showNeo }">
      <iframe src="http://localhost:8001/browser/" frameborder="0" width="100%" height="100%" id="neo-iframe"></iframe>
      <!-- <iframe src="http://localhost:8080/browser/" frameborder="0" width="100%" height="100%" id="neo-iframe"></iframe> -->
      <section class="absolute left-0 bottom-0 bg-white p-4 rounded-sm border-blue-300 border-2" v-if="state.floatInfo">
        <p class="font-bold text-xl mb-2">{{ state.floatInfo.name }}</p>
        <p class="mb-2">
          <span class="text-opacity-85 text-gray-700 mr-4">组织机构个数</span>
          <span class="text-opacity-85 text-gray-700 font-bold">{{ state.floatInfo.jigou }}</span>
        </p>
        <p class="mb-2">
          <span class="text-opacity-85 text-gray-700 mr-4">网络资产个数</span>
          <span class="text-opacity-85 text-gray-700 font-bold">{{ state.floatInfo.wangluozichan }}</span>
        </p>
        <p class="mb-2">
          <span class="text-opacity-85 text-gray-700 mr-4">关联关系个数</span>
          <span class="text-opacity-85 text-gray-700 font-bold">{{ state.floatInfo.guanxi }}</span>
        </p>
      </section>
    </section>
    <section class="h-full w-full bg-gray-50 absolute top-0" v-if="state.showUpLayer">
      <el-button link class="absolute right-2 top-2" @click="hiddenUpLayer">
        <Cross1Icon class="text-base h-4 w-4" v-if="state.type === 1"></Cross1Icon>
        <section class="rounded-full flex justify-center items-center h-6 w-6 bg-red-700 z-50" v-if="state.type !== 1">
          <Cross1Icon class="text-base h-4 w-4 text-white"></Cross1Icon>
        </section>
      </el-button>
      <Labels v-if="state.type === 1"></Labels>
      <iframe v-show="state.type === 2" src="http://localhost:5601/" frameborder="0" width="100%" id="neo-iframe123" ref="esRef"></iframe>
    </section>
  </section>
</template>
<script setup lang="ts">
import { state, hiddenUpLayer } from '../../hook'
import { Cross1Icon } from '@radix-icons/vue'
import Labels from '../labels/index.vue'
import { ref, onMounted, watch } from 'vue'
const containerRef = ref<any>()
const esRef = ref<any>()
watch(() => state.type, (val) => {
  if (val === 2) {
    setTimeout(() => {
      const node: any = document.querySelector('#neo-iframe123')
      if (node) {
        node.style.height = containerRef.value.height + 96 + 'px';
        node.style.position = 'relative'
        node.style.top = '-96px'
      }
    }, 100);
  }
})
onMounted(() => {
})
</script>
<style>
.agentHidden {
  visibility: hidden;
}

#neo-iframe123 {
  height: calc(100vh + 8px)
}
</style>