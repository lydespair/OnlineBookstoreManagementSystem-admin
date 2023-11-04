<template>
    <div style="margin: 30px 300px">
        <el-button type="success" icon="el-icon-caret-left" @click="$router.back()">后退</el-button>
        <h1 style="margin-left: 330px">订单详情</h1>
        <div style="margin-left: 40px">
            <el-table :data="tableData" style="width: 100%; margin-top: 30px">
                <el-table-column label="订单号" width="120">
                    <template slot-scope="scope">{{ orderDetail[scope.$index].orderId }}</template>
                </el-table-column>
                <el-table-column label="图书名称" prop="bookName"></el-table-column>
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <div class="block">
                            <img
                                style="height: 115px; width: 80px"
                                fit="contain"
                                :src="scope.row.image"
                                :alt="scope.row.image"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template slot-scope="scope">{{ orderDetail[scope.$index].bookCount }}</template>
                </el-table-column>
                <el-table-column label="单价">
                    <template slot-scope="scope">{{ scope.row.price }} 元</template>
                </el-table-column>
                <el-table-column align="right">
                    <template></template>
                </el-table-column>
            </el-table>
        </div>
        <el-row type="flex" style="float: right; margin: 30px 150px">
            <h1>¥：{{ total }}</h1>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "OrderDetail",
  props: ["orderId"],
  data() {
    return {
      tableData: [],
      orderDetail: [],
      bookData: [],
      total: 0,
    };
  },
  methods: {
    async load() {
      await this.$http
        .get("/orders/detail", {
          params: {
            orderId: this.orderId,
          },
        })
        .then((res) => {
          this.orderDetail = res.data.data;
        });
      this.total = 0;
      for (let i = 0; i < this.orderDetail.length; i++) {
        await this.$http
          .get("/books/id", {
            params: {
              ISBN: this.orderDetail[i].isbn,
            },
          })
          .then((res) => {
            this.bookData[i] = res.data.data;
            this.total +=
              this.bookData[i].price * this.orderDetail[i].bookCount;
          });
      }
      this.tableData = this.bookData;
      console.log(this.tableData);
    },
  },
  created() {
    this.load();
  },
};
</script>

<style>
</style>