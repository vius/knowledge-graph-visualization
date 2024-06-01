<template>
  <section class="corner relative overflow-auto flex flex-col">
    <section class="block-header w-full h-8 flex items-center" v-if="slotTest">
      <slot name="header"></slot>
    </section>
    <section class="block-content flex-1 overflow-auto">
      <slot></slot>
    </section>
  </section>
</template>
<script setup lang="ts">
import { useSlots } from "vue";
const slotTest = !!useSlots().header;
</script>
<style>
.block-header {
  background-image: url('@/assets/auction/block-header-bg.png');
  background-size: 100% 100%;

  p {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(88, 131, 255, 1) 150%);
    color: transparent;
    -webkit-background-clip: text;
  }
}

.block-header img {
  width: 24px;
  height: 32px;
  margin-right: 3px;
}

.block-content {
  background-image: url('@/assets/auction/block-border.png');
  background-size: 100% 100%;
  color: #D0DEEE;
}
</style>