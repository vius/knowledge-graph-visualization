<template>
  <el-dialog v-model="state.show" :title="props.title" width="550px" :close-on-click-modal="false" @close="close()">
    <section class="mx-8 py-4">
      <section class="px-8">
        <section class="flex mb-5">
          <span class="min-w-28 leading-8">上传待处理数据</span>
          <el-upload class="flex-1" v-model:file-list="fileList" :limit="1" :auto-upload="false">
            <el-button type="primary">选择文件</el-button>
          </el-upload>
        </section>
        <section class="flex items-center mb-6">
          <span class="min-w-28">选择数据类型</span>
          <el-radio-group v-model="state.datatype">
            <el-radio-button :value="1">网络资产</el-radio-button>
            <el-radio-button :value="2">开源情报</el-radio-button>
            <el-radio-button :value="3">社工情报</el-radio-button>
          </el-radio-group>
        </section>
        <section class="flex justify-end">
          <el-button type="success" plain>开始处理</el-button>
          <el-button type="success" plain v-if="props.type === 1">开始重构</el-button>
        </section>
      </section>
      <Separator class="my-6" />
      <section class="px-8">
        <section class="flex items-center mb-5">
          <span class="min-w-28">数据状态</span>
          <p>等待上传</p>
        </section>
        <section class="flex justify-end">
          <el-button type="success" plain>下载数据</el-button>
        </section>
      </section>
    </section>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Separator } from '@/components/ui/separator'
const state = reactive({
  datatype: 1,
  show: true
})
const fileList = ref([])
const emits = defineEmits(['close'])
const props: any = defineProps({
  title: String,
  type: Number
})

const close = (refresh = false) => {
  emits('close', refresh)
}

</script>
