<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { ElConfigProvider } from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';

defineComponent({
  components: { ElConfigProvider }
});

const locale = lang;
</script>