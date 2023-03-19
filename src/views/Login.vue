<template>
  <div class="login">
    <div class="relative">
      <div class="left">
        <el-row>
          <el-col :span="24">
            <el-image class="boxbg" :src="boxbg" />
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <el-row>
          <el-col :span="24">
            <h2>登录</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form :model="form" label-width="120px" label-position="top" size="large" class="form" :rules="rules"
              ref="ruleFormRef">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="form.userName" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" show-password />
              </el-form-item>
              <el-form-item>
                <el-button class="submitBtn" type="primary" @click="onSubmit(ruleFormRef)">登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { FormInstance, FormRules, ElMessage, ElLoading } from 'element-plus';
import { useStore } from '../pinia/Pinia';
import login from '../http/API';

const boxbg = ref('/images/svgs/login-box-bg.svg');

const form = reactive({
  userName: "",
  password: ""
});

form.userName = "admin";
form.password = "123456";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const store = useStore();
const rules = reactive<FormRules>({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 24, message: "密码长度需要在6-24之间", trigger: "blur" }
  ]
});

const onSubmit = async (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate(async (valid, fields) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: '登录中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      setTimeout(() => {
        // const token: string = (await login.login(form)).data;   
        store.TimeSlot = Date.now();
        localStorage.setItem("token", "123123");
        router.push({ name: '首页', replace: true });
        loading.close();
      }, 1000);

    } else {
      let errors: string = "";
      fields?.userName?.forEach(element => {
        errors += element.message + ';';
      });
      fields?.password?.forEach(element => {
        errors += element.message + ';';
      });
      ElMessage({ type: "warning", message: errors });
    }
  });
};
</script> 

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;

  .relative {
    width: 100vw;
    height: 100vh;
    text-align: center;

    .left {
      width: 50vw;
      height: 100vh;
      float: left;
      background-image: url('/images/svgs/login-bg.svg');

      .boxbg {
        margin-top: 25vh;
      }

      .homepageLogo {
        height: 50px;
        line-height: 50px;
        margin-top: 40px;

        span {
          color: white;
          font-size: 24px;
        }

        ul {
          list-style: none;

          li {
            float: left;
            margin-left: 5px;
          }
        }
      }

      p {
        color: white;
      }

      .p1 {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }

      .p2 {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }

    .right {
      width: 50vw;
      float: left;
      padding-top: 25vh;

      .form {
        width: 25vw;
        margin: 0px auto;

        .submitBtn {
          width: 100vw;
        }
      }
    }
  }
}
</style>