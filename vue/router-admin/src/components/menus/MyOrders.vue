<template>
    <div>
        <h2 class="text-center">订单管理</h2>
        <div>
            <el-input
                style="width: 200px; margin: 10px"
                placeholder="输入查询信息"
                v-model="orderIdOrUserId"
                @keyup.enter.native="load"
            ></el-input>
            <el-button type="primary" @click.native="load">查询</el-button>
        </div>

        <div>
            <el-table :data="tableData">
                <el-table-column prop="orderId" label="订单Id"></el-table-column>
                <el-table-column prop="userId" label="用户Id"></el-table-column>
                <el-table-column width="200" label="下单日期">
                    <template slot-scope="scope">{{ dataFormat(scope.row.createTime) }}</template>
                </el-table-column>
                <el-table-column label="收货地址">
                    <template slot-scope="scope">
                        <span
                            v-if="userList[map[scope.$index]]"
                        >{{ userList[map[scope.$index]].address }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template v-slot="scope">
                        <a href="#" @click.prevent="gotoOrderitem(scope.row.orderId, scope.row.userId)">详情</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: "MyOrders",
  data() {
    return {
      orderIdOrUserId: null,
      tableData: [],
      fromVisible: false,
      fromVisible1: false,
      type: ["未支付", "已完成", "已取消"],
      form: {
        orderId: "",
        userId: "",
        userName: "",
        orderDate: "",
        address: "",
        deliveryDate: "",
        orderState: "",
      },
      address: "",
      form1: {},
      rules: {
        userId: [{ required: true, message: "请输入用户Id", trigger: "blur" }],
      },
      userList: [],
      map: [],
    };
  },
  mounted() {
    this.load();
  },

  methods: {
    async load() {
      await this.$http
        .get("/admins", {
          params: {
            orderId: this.orderIdOrUserId,
          },
        })
        .then((res) => {
          this.tableData = res.data.data;
        });
      await this.$http.get("/users").then((res) => {
        this.userList = res.data.data.rows;
        console.log(this.tableData);
        console.log(this.userList);
        for (let i = 0; i < this.tableData.length; i++) {
          for (let j = 0; j < this.userList.length; j++) {
            if (this.tableData[i].userId == this.userList[j].userId) {
              this.map[i] = j;
            }
          }
        }
      });
    },
    dataFormat(value) {
      var year = value.substr(0, 4);
      var month = value.substr(5, 2);
      var day = value.substr(8, 2);
      var hour = value.substr(11, 2);
      var min = value.substr(14, 2);
      var second = value.substr(17, 2);
      return (
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second
      );
    },
    handleAdd() {},
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.fromVisible = true;
    },
    information(row) {
      this.$http.get("/order/" + row.orderId).then((res) => {
        localStorage.setItem("orderInformation", JSON.stringify(res));
        this.$router.push("/orderitemId");
      });
    },
    gotoOrderitem(orderId, userId) {
      this.$router.push("/home/orderItem/" + orderId + "/" + userId);
    },
    del(row) {
      this.$confirm("是否删除此订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$http
            .delete("http://localhost:8080/order/" + row.orderId)
            .then((res) => {
              this.load();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    reset() {
      this.load();
    },
    save() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          if (this.form.orderId !== "") {
            console.log("this is editing !");
            this.http
              .put("http://localhost:8080/order", this.form)
              .then((res) => {
                this.load();
              });
          } else {
            console.log("this is adding !");
          }
        }
        this.fromVisible = false;
      });
    },
  },
};
</script>

<style scoped>
</style>