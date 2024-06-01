<script setup lang="ts">
import { Button } from '@/components/ui/button'
// import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'
const clickAction = (type = 0) => {
  console.log(type)
}
</script>

<template>
  <section class="flex flex-col  h-full justify-center bg-[#111D34] p-3">
    <!-- <section class="flex justify-center items-center ">
      <span class="mr-3 min-w-14 text-sm ">参与人数</span>
      <section class="flex-1 flex">
        <el-input-number v-model="state.count" class="config-number" :min="2" :max="10" :step="1" :precision="0" @change="handleChange" />
      </section>
    </section> -->
    <section class="flex justify-around flex-1 items-center">
      <Button @click="clickAction(1)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">数据写入</Button>
      <Button @click="clickAction(2)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">数据更新</Button>
      <Button @click="clickAction(3)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">数据处理</Button>
    </section>
    <section class="flex justify-around flex-1 items-center">
      <Button @click="clickAction(4)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">知识提取</Button>
      <Button @click="clickAction(5)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">普通查询</Button>
      <Button @click="clickAction(6)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">专用查询</Button>
    </section>
  </section>
</template>

<style lang="less">
.tab-list {
  [data-state="active"] {
    background: linear-gradient(to right, #008FFF 0%, #006299 100%);
  }
}

.config-number {
  width: 100%;

  .el-input {
    .el-input__wrapper {
      background-color: #11294A;
      box-shadow: none;

      input {
        color: #D0DEEE;
        opacity: 1;
      }
    }
  }

  &>span {
    background-color: #11294A;
    color: #D0DEEE;
    border-color: #063154;
  }
}
</style>