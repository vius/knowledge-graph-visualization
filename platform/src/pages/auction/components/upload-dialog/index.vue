<template>
  <el-dialog v-model="state.show" :title="props.title" width="550px" :close-on-click-modal="false" @close="close()">
    <section class="mx-8 py-4">
      <section class="px-8">
        <section class="flex mb-5">
          <span class="min-w-28 leading-8">上传待处理数据</span>
          <el-upload ref="uploadRef" :data="handleBeforeUpload" class="flex-1" :auto-upload="false" action="/expressapi/dealdata" accept=".json,.csv" :limit="1" :on-success="onSuccess" :on-error="onError">
            <el-button type="primary">选择文件</el-button>
          </el-upload>
        </section>
        <section class="flex items-center mb-6">
          <span class="min-w-28">选择数据类型</span>
          <el-radio-group v-model="state.type" v-if="props.type === 1">
            <el-radio-button :value="1">网络资产</el-radio-button>
            <el-radio-button :value="2">开源情报</el-radio-button>
            <el-radio-button :value="3">社工情报</el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="state.type" v-else>
            <el-radio-button :value="2">半结构化</el-radio-button>
            <el-radio-button :value="1">网络资产</el-radio-button>
            <el-radio-button :value="3">社工数据</el-radio-button>
          </el-radio-group>
        </section>
        <section class="flex justify-end">
          <template v-if="props.type === 1">
            <el-button type="success" plain @click="submitUpload(1)">开始处理</el-button>
            <el-button type="success" plain @click="submitUpload(2)">开始重构</el-button>
          </template>
          <template v-else>
            <el-button type="success" plain @click="submitUpload(3)">开始处理</el-button>
          </template>
        </section>
      </section>
      <Separator class="my-6" />
      <section class="px-8">
        <section class="flex items-center mb-5">
          <span class="min-w-28">数据状态</span>
          <p>{{ state.url.length ? '上传成功' : '等待上传' }}</p>
        </section>
        <section class="flex justify-end">
          <el-button type="success" plain :disabled="!state.url.length" @click="download">下载数据</el-button>
        </section>
      </section>
    </section>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast()
const emits = defineEmits(['close'])
const props: any = defineProps({
  title: String,
  type: Number
})
const state: any = reactive({
  actionType: 1,
  type: props.type,
  show: true,
  url: [],
})
const download = () => {
  state.url.forEach((url: string) => {
    const a = document.createElement('a');
    a.href = url;
    const paths = url.split('/')
    a.download = paths[paths.length - 1]
    document.body.appendChild(a);
    a.click();
  });
}
const uploadRef = ref<any>()
const submitUpload = async (type: number) => {
  state.actionType = type
  uploadRef.value!.submit()
}
const handleBeforeUpload = () => {
  return {
    type: state.type,
    actionType: state.actionType,
  }
}
const onSuccess = (url: any) => {
  if (Array.isArray(url)) {

  }
  console.log('response', url)
  state.url = Array.isArray(url) ? url : [url]
  toast({
    title: '上传数据集成功!',
    duration: 2000,
  })
}
const onError = (error: Error) => {
  const { message } = error
  if (message) {
    const errInfo = JSON.parse(message)
    const msg = errInfo.message || '上传数据集失败！'
    toast({
      title: msg,
      duration: 2000,
      variant: 'destructive',
    })
  }
}

const close = (refresh = false) => {
  emits('close', refresh)
}

</script>
