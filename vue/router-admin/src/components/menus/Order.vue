<template>
  <div style="margin: 30px 400px; text-align: center">
    <h1>订单页</h1>
    <div>
      <el-table :data="tableData" :stripe="true">
        <el-table-column prop="orderId" label="订单Id" width="120"></el-table-column>
        <el-table-column width="200" label="下单日期">
          <template slot-scope="scope">
            <div v-if="scope.row.createTime"> {{ dataFormat(scope.row.createTime) }} </div>
          </template>
        </el-table-column>
        <el-table-column label="总价" width="130">
          <template slot-scope="scope">
            {{scope.row.price }} 元
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <a href="#" @click.prevent="gotoOrderDetail(scope.row.orderId)"> 详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    dataFormat(value) {
        var year = value.substr(0, 4)
        var month = value.substr(5, 2)
        var day = value.substr(8, 2)
        var hour = value.substr(11, 2)
        var min = value.substr(14, 2)
        var second = value.substr(17,2)
        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":"+second
    },
    gotoOrderitem() {

    },
    async load() {
      const {data: res} = await this.$http.get("/orders/all", {
        params: {
          userId: localStorage.getItem('user')
        }
      })
      this.tableData = res.data
    },
    gotoOrderDetail(orderId) {
      this.$router.push('/index/orderDetail/' + orderId)
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style>

</style>