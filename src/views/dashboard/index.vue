<template>
  <div class="dashboard-container">
    <div class="dashboard-text">nickname: {{ nickname }}</div>
    <div class="dashboard-text">
      roles: <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
    <el-button type="primary">Button</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useStore from '@/store';

const { user } = useStore();

const nickname = computed(() => user.nickname);
const roles = computed(() => user.roles);
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
