<template>
  <el-dialog v-model="state.show" :title="props.title" width="650px" :close-on-click-modal="false" @close="close()">
    <section class="mx-8 mb-4">
      <p class="text-sm mt-2 text-opacity-80 text-black text-base font-medium leading-6">{{ props.query }}</p>
    </section>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirm" size="large">查询</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { confirmPostMessage } from '../../hook'
const emits = defineEmits(['close'])
const props: any = defineProps({
  title: String,
  query: []
})
const state = reactive({
  show: true
})

const confirm = async () => {
  confirmPostMessage(props.query)
  close(true)
}
const close = (refresh = false) => {
  emits('close', refresh)
}

</script>
