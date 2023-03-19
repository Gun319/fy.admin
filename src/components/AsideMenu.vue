<template>
  <el-aside class="aside-menu">
    <el-row>
      <el-col :span="24">
        <div class="homepageLogo">
          <el-header>
            <span>
              <img :src="imageurl" fit="fill" />
              <span>枫叶系统</span>
            </span>
          </el-header>
        </div>
      </el-col>
    </el-row>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          :default-active="routerName" text-color="#fff" :router="true" collapse-transition>
          <TreeMenuVue :list="res"></TreeMenuVue>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TreeMenuVue from './TreeMenu.vue';
import menu from '../assets/Mocks/Menu.json';
import { useRouter } from 'vue-router';

const imageurl = "/images/logo.png";
const res = menu.data;

const router = useRouter();
const routerName = ref<string>();
// 路由监听
watch: {
  routerName.value = router.currentRoute.value.path.replace('/', '');
}
</script>

<style scoped lang="scss">
.el-header {
  text-align: center;
  line-height: 60px;

  span {
    font-weight: bold;
  }

  img {
    height: 30px;
    vertical-align: middle;
  }
}

.el-menu {
  border: 0px;
}
</style>