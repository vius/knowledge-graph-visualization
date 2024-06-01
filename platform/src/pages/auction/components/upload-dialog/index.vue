<template>
  <el-dialog v-model="state.show" :title="props.title" width="750px" :close-on-click-modal="false" @close="close()">
    <section class="m-4">
      <section v-for="item in props.list" :key="item" class="mb-6">
        <p class="font-bold text-lg">{{ item.name }}</p>
        <p class="text-sm mt-2 text-opacity-60 text-black">{{ item.desc }}</p>
      </section>
      <section>
        <el-input v-model="state.query" placeholder="create xxx" size="large"></el-input>
      </section>
    </section>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { confirmPostMessage } from '../../hook'
const { toast } = useToast()
const state = reactive({
  query: '',
  show: true
})
const emits = defineEmits(['close'])
const props: any = defineProps({
  title: String,
  list: []
})

const confirm = async () => {
  if (!state.query) {
    toast({
      title: '请输入实体或关系语句！',
      duration: 1500,
      variant: 'destructive',
    });
    return
  }
  confirmPostMessage(state.query)
  close(true)
}
const close = (refresh = false) => {
  emits('close', refresh)
}

</script>
