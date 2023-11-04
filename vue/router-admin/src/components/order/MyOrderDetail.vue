<template>
    <div>
        <el-button type="success" icon="el-icon-caret-left" @click="$router.back()">后退</el-button>
        <h2 class="text-center">订单号 {{ orderId}} 详情页</h2>
        <div>
            <el-descriptions title="用户信息" border>
                <el-descriptions-item label="用户 ID">
                    <template slot="label">
                        <i class="el-icon-user"></i> 用户 ID
                    </template>
                    {{ user.userId }}
                </el-descriptions-item>

                <el-descriptions-item label="用户名">
                    <template slot="label">
                        <i class="el-icon-user"></i> 用户名
                    </template>
                    {{ user.userName }}
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i> 手机号
                    </template>
                    {{ user.tel }}
                </el-descriptions-item>
                <el-descriptions-item label="居住地">
                    <template slot="label">
                        <i class="el-icon-location-outline"></i> 地址
                    </template>
                    {{ user.address }}
                </el-descriptions-item>
                <el-descriptions-item label="备注">
                    <template slot="label">
                        <i class="el-icon-tickets"></i> 备注
                    </template>
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">
                    <template slot="label">
                        <i class="el-icon-message"></i> 邮箱
                    </template>
                    {{ user.email }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div style="margin-left: 40px">
            <el-table :data="bookList" style="width: 100%; margin-top: 30px">
                <el-table-column label="订单号" width="120">
                    <template>{{ orderId }}</template>
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
  name: "MyOrderDetail",
  props: ["orderId", "userId"],
  data() {
    return {
      user: {},
      bookList: [],
      cur_bookList: [],
      orderDetail: [],
      search: "",
      total: 0,
    };
  },
  methods: {
    async getOrder() {
      await this.$http
        .get("/orders/detail", {
          params: {
            orderId: this.orderId,
          },
        })
        .then((res) => {
          this.orderDetail = res.data.data;
        });
      await this.$http
        .get("/users/exact", {
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.user = res.data.data;
        });
        this.total = 0
      for (let i = 0; i < this.orderDetail.length; i++) {
        await this.$http
          .get("/admins/findByISBN", {
            params: {
              ISBN: this.orderDetail[i].isbn,
            },
          })
          .then((res) => {
            this.cur_bookList[i] = res.data.data;
            this.total += this.cur_bookList[i].price * this.orderDetail[i].bookCount
          })
      }
      this.bookList = this.cur_bookList;
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
  },
  mounted() {
    this.getOrder();
  },
};
</script>
<style lang="less" scoped></style>
