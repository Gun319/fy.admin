<template>
  <div>
    <h1>计算结果：{{ form.numCount }}</h1>
    <div>第一个数字：<input type="number" v-model="form.num1" /></div>
    <div>第二个数字：<input type="number" v-model="form.num2" /></div>
    <div style="margin: 10px">
      <button @click="MCK('加')">加</button>
      <button @click="MCK('减')">减</button>
      <button @click="MCK('乘')">乘</button>
      <button @click="MCK('除')">除</button>
    </div>

    <div>
      <h1>增删改查</h1>
      <div class="head">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="form.searchName" placeholder="请输入你的公司名"></el-input>
          </el-col>
          <el-button type="primary">搜索</el-button>
          <el-button type="success" style="margin-left:10px;" @click="addUser">新增</el-button>
        </el-row>
      </div>

      <div class="body">
        <el-table :data="form.tableData">
          <el-table-column label="序号">
            <template v-slot="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="name" label="公司名"></el-table-column>
          <el-table-column prop="position" label="职位"></el-table-column>
          <el-table-column prop="major" label="专业"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column prop="birthday" label="操作">
            <template v-slot="scope">
              <el-button type="primary" @click="editUser(scope.row, scope.$index)">编辑</el-button>
              <el-button type="danger" @click="delUser(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="新增信息" v-model="form.addDialogVisible" :before-close="addHandleClose" draggable
        :close-on-click-modal="false">
        <el-form :model="form.userInfo" label-width="80px">
          <el-form-item label="公司名">
            <el-input v-model="form.userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.userInfo.position"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.userInfo.major"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="form.userInfo.number"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span slot="footer" class="dialog-footer">
            <el-button @click="form.addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addConfirm">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog title="编辑用户信息" v-model="form.editDialogVisible" :before-close="editHandleClose" draggable
        :close-on-click-modal="false">
        <el-form v-model="form.editObj" label-width="80px">
          <el-form-item label="公司名">
            <el-input v-model="form.editObj.name"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.editObj.position"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.editObj.major"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="form.editObj.number"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span slot="footer" class="dialog-footer">
            <el-button @click="form.editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editConfirm">确 定</el-button>
          </span>
        </template>
      </el-dialog>

    </div>

    <div style="margin: 10px 0px; display: inline-block">
      <div>
        <h1>小目标列表</h1>
        <div>
          <input type="text" v-model="form.message" @keyup.enter="add" placeholder="输入小目标后，按回车确认" />
          <h1 style="display: inline-block; margin: 0px 10px">
            共有{{ form.addList.length }}个小目标
          </h1>
        </div>
        <ul v-for="(item, index) in form.addList" :key="index">
          <ol>
            {{
              item
            }}
            <a @click="delBtn(index)" style="color: red; margin: 15px; cursor: pointer">删除</a>
          </ol>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';

let list: string[] = [];

const form = reactive({
  numCount: ref(0),
  num1: 0,
  num2: 0,

  message: "",
  addList: list,
  userInfo: {
    name: "",
    position: "",
    major: "",
    number: "",
  },

  tableData: [
    {
      name: "互联网+学院",
      position: "专职教师",
      major: "对外贸易",
      number: "2",
    },
    {
      name: "徐州重工",
      position: "工厂车研发部工程师",
      major: "精密机械制造",
      number: "12",
    },
    {
      name: "北京青码科技",
      position: "前端开发工程师",
      major: "Vue、React",
      number: "4",
    },
  ],

  addDialogVisible: false,
  editDialogVisible: false,
  searchName: ref(""),
  editObj: {
    name: '',
    position: '',
    major: '',
    number: '',
  },
  userIndex: 0
});

const MCK = function (val: any) {
  if (form.num1 && form.num2) {
    switch (val) {
      case "加":
        form.numCount = form.num1 + form.num2;
        break;
      case "减":
        form.numCount = form.num1 - form.num2;
        break;
      case "乘":
        form.numCount = form.num1 * form.num2;
        break;
      case "除":
        form.numCount = form.num1 / form.num2;
        break;
    }
  } else {
    alert("请输入数字");
  }
};

const add = () => {
  if (form.message) {
    form.addList.push(form.message);
    form.message = "";
  } else {
    alert("没有输入小目标");
  }
};

const delBtn = (index: number) => {
  form.addList.splice(index, 1);
};

const addUser = function () {
  form.addDialogVisible = true;
};

const addConfirm = function () {
  if (!form.userInfo.name) {
    ElMessage({
      message: '请输入你的公司名'
    });
    return;
  }

  if (!form.userInfo.position) {
    ElMessage({
      message: '请输入你的职位',
      type: "warning"
    });
    return;
  }

  if (!form.userInfo.major) {
    ElMessage({
      message: '请输入你的专业',
      type: "success"
    });
    return;
  }

  if (!form.userInfo.number) {
    ElMessage({
      message: '请输入数量',
      type: "error"
    });
    return;
  }

  form.tableData.push(form.userInfo);
  form.userInfo = {
    name: "",
    position: "",
    major: "",
    number: ""
  };
  form.addDialogVisible = false;
};

const delUser = function (index: any) {
  ElMessageBox.confirm("确认删除此用户信息", "提示", {
    customClass: "del-model",
    type: "warning"
  }).then(() => {
    form.tableData.splice(index, 1);
  }).catch(() => { });
};

const editUser = function (item: { name: any; position: any; major: any; number: any; }, index: number) {
  form.userIndex = index;
  form.editObj = {
    name: item.name,
    position: item.position,
    major: item.major,
    number: item.number,
  };
  form.editDialogVisible = true;
};

const addHandleClose = function () {
  form.addDialogVisible = false;
};

const editHandleClose = function () {
  form.editDialogVisible = false;
};

const editConfirm = function () {
  form.tableData[form.userIndex] = form.editObj;
  form.editDialogVisible = false;
};
</script>

<style>
.add-btn {
  margin-top: 20px;
}

.body {
  margin-top: 10px;
}

el-table {
  text-align: center;
}
</style>