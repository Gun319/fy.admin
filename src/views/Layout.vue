<template>
  <el-container>
    <el-aside width="200px">
      <AsideMenu/>
    </el-aside>
    <el-container>
      <el-header>
        <!-- <HeaderCom></HeaderCom> -->
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AsideMenu from '../components/AsideMenu.vue';


</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;

  .el-aside {
    background-color: bisque;
  }

  .el-header {
    --el-header-padding: 0 0px;
    background-color: burlywood;
  }
}
</style>