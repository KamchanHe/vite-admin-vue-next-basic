<template>
  <el-config-provider :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import useStore from '@/store';
const { app } = useStore();
const size = computed(() => app.size);
</script>
