<template>
  <el-row class="headerOne">
    <el-col :span="12">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }" class="HomeStyle">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ routePath }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="12">
      <div class="dropdown">
        <el-avatar :size="25" :src="circleUrl" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ NickName }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-link :underline="false"><span @click="goToPerson">个人主页</span></el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <el-divider />     
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';

const routePath = ref<any>();
const route = useRoute();
const router = useRouter();

const circleUrl = ref('/images/Person.png');
const NickName = ref("张三");

// 监听路由变化
watch(() => route.path, () => {
  routePath.value = route.name;
});

const goToPerson = () => {

}

</script>

<style scoped lang="scss">
.el-header {
  .el-col {
    .el-breadcrumb {
      line-height: inherit;
      margin-left: 10px;
    }

    .el-icon {
      margin-right: 5px;
    }

    .el-divider {
      margin: 0;
    }

    .dropdown {
      padding-right: 10px;

      .el-dropdown-link {
        color: var(--el-bg-color);
      }
    }
  }
}

.headerOne {
  background-color: #001529;
}

.HomeStyle {
  color: var(--el-bg-color);
}
</style>