<template>
    <div style="margin: 30px 300px; text-align: center">
        <h1>购物车</h1>
        <el-table
            :data="bookList"
            style="width: 100%; margin-top: 30px"
            :row-style="{height: '100px'}"
            ref="multipleTable"
            @select="select"
            @select-all="select_all"
        >
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column prop="bookName" label="书名" width="140"></el-table-column>
            <el-table-column label="封面" width="130">
                <template slot-scope="scope">
                    <div class="block">
                        <el-image
                            fit="contain"
                            style="height: 115px; width: 80px"
                            :src="scope.row.image"
                        ></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="单价" width="100">
                <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>
            <el-table-column label="数量" width="180">
                <template slot-scope="scope">
                    <el-input-number
                        v-if="cartList[scope.$index]"
                        v-model="cartList[scope.$index].count"
                        controls-position="right"
                        @change="handleChange"
                        :min="1"
                        :max="100"
                        size="small"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleEdit(scope.row, scope.$index)"
                    >立即购买</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(cartList[scope.$index].cartId)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 40px 50px 40px 0; height: 70px">
            <el-button
                type="danger"
                @click="deleteInBatches"
                style="float: left"
                :disabled="show ? false:true"
            >批量删除</el-button>
            <el-button
                @click="bugList"
                style="float: right"
                type="success"
                :disabled="show ? false:true"
            >批量购买</el-button>
            <h2
                v-if="show"
                style="float: right; line-height: 40px; margin-right: 10px"
            >¥: {{ total }}</h2>
        </div>
    </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cartList: [],
      bookList: [],
      cur_bookList: [],
      deleteList: [],
      total: "",
      show: false,
      order: {
        userId: localStorage.getItem("user"),
        price: "",
      },
      orderDetail: {
        orderId: "",
        isbn: "",
        bookCount: "",
      },
      selectList: [],
      insertList: [],
    };
  },
  methods: {
    getbook(val) {
      this.$http
        .get("/books/id", {
          params: {
            ISBN: val,
          },
        })
        .then((res) => {
          this.bookList.push(res.data.data);
        });
    },
    async load() {
      this.bookList = [];
      this.cur_bookList = [];
      await this.$http
        .get("/users/cart", {
          params: {
            userId: localStorage.getItem("user"),
          },
        })
        .then((res) => {
          this.cartList = res.data.data;
        });
      for (let i = 0; i < this.cartList.length; i++) {
        await this.$http
          .get("/books/id", {
            params: {
              ISBN: this.cartList[i].isbn,
            },
          })
          .then((res) => {
            this.cur_bookList[i] = res.data.data;
          });
      }
      this.bookList = this.cur_bookList;
    },
    handleEdit(val, index) {
      this.$message({
        type: "success",
        message: "购买成功!",
      })
      this.order.price = val.price * this.cartList[index].count;
      this.$http.post("/orders", this.order).then((res) => {
        this.orderDetail.orderId = res.data.data;
        this.orderDetail.bookCount = this.cartList[index].count;
        this.orderDetail.isbn = val.isbn;
        this.$http.post("/orders/detail", this.orderDetail).then((res) => {
          console.log(this.cartList[index].cartId);
          this.deleteList.push(this.cartList[index].cartId);
          this.$http.post("/users/cart", this.deleteList).then((res) => {
            this.deleteList = [];
            this.load();
          });
        });
      });
    },
    async handleDelete(val) {
      this.$message({
        type: "success",
        message: "删除成功!",
      })
      this.deleteList.push(val);
      await this.$http.post("/users/cart", this.deleteList).then((res) => {
        this.deleteList = [];
        this.load();
      });
    },
    deleteInBatches() {
      this.$message({
        type: "success",
        message: "删除成功!",
      })
      this.deleteList = [];
      this.selectList = this.$refs.multipleTable.selection;
      for (let i = 0; i < this.selectList.length; i++) {
        for (let j = 0; j < this.bookList.length; j++) {
          if (this.selectList[i] == this.bookList[j]) {
            console.log(this.bookList[j]);
            this.deleteList.push(this.cartList[j].cartId);
          }
        }
      }
      this.$http.post("/users/cart", this.deleteList).then((res) => {
        this.deleteList = [];
        this.load();
      });
    },
    handleChange() {},
    select() {
      if (this.$refs.multipleTable.selection.length == 0) this.show = false;
      else {
        this.show = true;
        this.total = 0;
        this.selectList = this.$refs.multipleTable.selection;
        for (let i = 0; i < this.selectList.length; i++) {
          for (let j = 0; j < this.bookList.length; j++) {
            if (this.selectList[i] == this.bookList[j]) {
              this.total += this.bookList[j].price * this.cartList[j].count;
            }
          }
        }
      }
    },
    select_all() {
      this.select();
    },
    async bugList() {
      this.$message({
        type: "success",
        message: "购买成功!",
      })
      this.insertList = [];
      this.order.price = this.total;
      await this.$http.post("/orders", this.order).then((res) => {
        this.selectList = this.$refs.multipleTable.selection;
        for (let i = 0; i < this.selectList.length; i++) {
          for (let j = 0; j < this.bookList.length; j++) {
            if (this.selectList[i] == this.bookList[j]) {
              this.orderDetail = {};
              this.orderDetail.orderId = res.data.data;
              this.orderDetail.isbn = this.cartList[j].isbn;
              this.orderDetail.bookCount = this.cartList[j].count;
              this.deleteList.push(this.cartList[j].cartId);
              this.insertList.push(this.orderDetail);
            }
          }
        }

        for (let i = 0; i < this.insertList.length; i++) {
          this.$http
            .post("/orders/detail", this.insertList[i])
            .then((res) => {});
        }
        this.$http.post("/users/cart", this.deleteList).then((res) => {
          this.deleteList = [];
          this.load();
        });
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style>
</style>