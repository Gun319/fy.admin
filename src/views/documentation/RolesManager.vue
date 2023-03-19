<template>
  <div style="margin-bottom:10px;">
    <el-button type="danger" icon="Delete" @click="handleSelectDelete" :disabled="filterTableData.length === 0">批量删除
    </el-button>
    <el-button type="primary" icon="Plus" @click="addHandleOpen">添加角色</el-button>
  </div>

  <el-table :data="filterTableData" border style="width: 100%" :row-class-name="tableRowClassName"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="50" />
    <el-table-column prop="id" label="ID" width="100" />
    <el-table-column prop="roleName" label="角色名称" />
    <el-table-column prop="describe" label="描述" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" placeholder="输入角色名称搜索" />
      </template>
      <template #default="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="title" v-model="form.addDialogVisible" :before-close="addHandleClose" draggable
    :close-on-click-modal="false" @close="closeDialog(form.role)">
    <el-form :model="form.role" label-width="80px">
      <el-form-item label="角色ID">
        <el-input v-model="form.role.id"></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="form.role.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.role.describe"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="form.addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

interface Roles {
  id: string;
  roleName: string;
  describe: string; // 描述
}
const multipleSelection = ref<Roles[]>([]);
const title = ref<string>("");
const tableRowClassName = ({
  rowIndex
}: {
  row: Roles;
  rowIndex: number;
}) => {
  if (rowIndex % 2 != 0) {
    return 'success-row';
  }
  return;
};
const search = ref('');

const form = reactive({
  tableData: [
    {
      id: '1',
      roleName: '超级管理员',
      describe: '所有权限'
    },
    {
      id: '2',
      roleName: '管理员',
      describe: '部分权限'
    },
    {
      id: '3',
      roleName: '游客',
      describe: '部分权限'
    }
  ],
  addDialogVisible: false,
  role: {
    id: "",
    roleName: "",
    describe: ""
  },
  roleIndex: 0
});

/**
 * 全选
 * @param val 
 */
const handleSelectionChange = (val: Roles[]) => {
  multipleSelection.value = val;
};

/**
 * 编辑
 * @param index 
 * @param row 
 */
const handleEdit = (index: number, row: Roles) => {
  title.value = "编辑角色信息";
  form.roleIndex = index;
  form.role = {
    id: row.id,
    roleName: row.roleName,
    describe: row.describe
  };
  form.addDialogVisible = true;
};

/**
 * 删除
 * @param index 
 * @param row 
 */
const handleDelete = (index: number, row: Roles) => {
  ElMessageBox.confirm("确认删除此用户信息？", "提示", {
    customClass: "del-model",
    type: "warning",
    icon: "delete"
  }).then(() => {
    form.tableData.splice(index, 1);
  }).catch(() => { });
};

/**
 * 批量删除
 */
const handleSelectDelete = () => {
  if (!multipleSelection.value.length) {
    ElMessageBox.alert("请选择要删除的记录！", "提示", {
      customClass: "del-model",
      type: "warning"
    }).then(() => { }).catch(() => { });
    return;
  }

  ElMessageBox.confirm("确定要删除记录吗？", "提示", {
    customClass: "del-model",
    type: "warning",
    icon: "delete"
  }).then(() => {
    multipleSelection.value.forEach(element => {
      form.tableData.forEach((e, i) => {
        if (element.id == e.id) {
          form.tableData.splice(i, 1);
        }
      });
    });
  }).catch(() => { });
};

const filterTableData = computed(() =>
  form.tableData.filter(
    (data) =>
      !search.value ||
      data.roleName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const addHandleOpen = () => {
  title.value = "添加角色信息";
  form.addDialogVisible = true;
};

const addHandleClose = () => {
  form.addDialogVisible = false;
};

const addConfirm = () => {
  if (!form.role.id) {
    ElMessage({
      message: "请输入角色ID",
      type: "warning"
    });
    return;
  }

  if (!form.role.roleName) {
    ElMessage({
      message: "请输入角色名称",
      type: "warning"
    });
    return;
  }

  if (!form.role.describe) {
    ElMessage({
      message: "请输入角色描述",
      type: "warning"
    });
    return;
  }

  if (title.value === "添加角色信息") {
    form.tableData.push(form.role);
    form.role = {
      id: "",
      roleName: "",
      describe: ""
    };
  } else {
    form.tableData[form.roleIndex] = form.role;
    form.role = {
      id: "",
      roleName: "",
      describe: ""
    };
  }
  form.addDialogVisible = false;
};

const closeDialog = function (role: any) {
  if (role) {
    role.id = "";
    role.roleName = "";
    role.describe = "";
  }
};
</script>

<style>
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>