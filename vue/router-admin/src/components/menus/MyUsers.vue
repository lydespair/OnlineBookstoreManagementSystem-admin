<template>
    <div>
        <!-- 标题 -->
        <h2 class="text-center">用户管理</h2>
        <el-row type="flex" justify="end" style="margin-top:20px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="查询用户">
                    <el-input v-model="user.userName" placeholder="输入关键词查询"></el-input>
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-select v-model="user.state" placeholder="全部状态" style="width: 150px">
                        <el-option label="账号正常" value="1"></el-option>
                        <el-option label="已封禁" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getuserlist">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-table :data="userlist" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="userId" label="用户ID" width="140"></el-table-column>
            <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="tel" label="联系方式"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="230"></el-table-column>
            <el-table-column label="账号状态" width="160">
                <template slot-scope="scope">{{ scope.row.state == 1 ? '账号正常' : '已封禁' }}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 30px"></el-pagination>
    </div>
</template>

<script>
export default {
  name: "MyUser",
  data() {
    return {
      // 用户列表数据
      userlist: [],
      user: {
        userName: "",
        state: "",
      },
      formInline: {},
    };
  },
  methods: {
    getuserlist() {
      this.$http.get("/users").then((res) => {
        this.userlist = res.data.data.rows;
        console.log(this.userlist);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state == 2) {
        return "warning-row";
      }
    }
  },
  beforeMount() {
    this.getuserlist();
  },
};
</script>
  
<style lang="less">
.el-table .warning-row {
  background: oldlace;
}
</style>
