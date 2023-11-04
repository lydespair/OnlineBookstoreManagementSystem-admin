<template>
    <div style="margin: 0 160px">
        <div style=" margin: 40px 100px 20px 60px">
            <el-input placeholder="请输入内容" v-model="book.name" class="input-with-select">
                <el-select v-model="book.type" slot="prepend" placeholder="请选择" style="width: 120px">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="文学小说" value="1"></el-option>
                    <el-option label="社科经营" value="2"></el-option>
                    <el-option label="幼儿童书" value="3"></el-option>
                    <el-option label="生活艺术" value="4"></el-option>
                    <el-option label="职业行业" value="5"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="getBookList"></el-button>
            </el-input>
        </div>

        <ul style="margin: 30px">
            <li id="cart" v-for="item in bookList" :key="item.isbn" style="margin: 10px">
                <div style="display: inline-block; width: 200px; height: 170px">
                    <img
                        style="display: inline-block; width: 120px; height: 160px; margin-left: 20px"
                        :src="item.image"
                        :alt="item.image"
                    />
                </div>
                <span
                    style="display: inline-block; width: 160px; height:60px; margin-left: 20px"
                >{{item.bookName}}</span>
                <span
                    style="display: inline-block; width: 200px; height:25px; margin-left: 20px"
                >售价: {{item.price}}</span>
                <el-button size="small" type="warning" @click="addcart(item.bookName)">加入购物车</el-button>
                <el-button size="small" type="success" @click="bug(item)">立即购买</el-button>
            </li>
        </ul>

        <div style="text-align: center; height: 60px">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :page-size="tablePage.pageSize"
                :current-page="tablePage.pageNum"
                @current-change="handleCurrentChange"
                :total="tablePage.total"
                style="margin: 30px"
            ></el-pagination>
        </div>

        <el-dialog title="选择图书数量" :visible.sync="dialogVisible" width="40%" center:true @close='closeDialog'>
            <el-input-number
                style="margin: 0 200px"
                v-model="count"
                controls-position="right"
                :min="1"
                :max="100"
            ></el-input-number>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="购买图书数量" :visible.sync="dialogVisible1" width="40%" center:true @close='closeDialog'>
            <el-input-number
                style="margin: 0 200px"
                v-model="count"
                controls-position="right"
                :min="1"
                :max="100"
            ></el-input-number>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="update1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "UserHome",
  data() {
    return {
      bookList: [],
      tablePage: {
        pageNum: 1, // 第几页
        pageSize: 10, // 每页多少条
        total: 0, // 总记录数
      },
      dialogVisible: false,
      dialogVisible1: false,
      book: {
        isbn: '',
        type: "",
        name: "",
        price: ''
      },
      count: 1,
      orderDetail: {
        orderId: '',
        isbn: '',
        bookCount: '',
      },
      order: {
        userId: localStorage.getItem('user'),
        price: '',
      }
    };
  },
  methods: {
    async gettotal() {
      const { data: res } = await this.$http.get("/books/counts");
      this.tablePage.total = res.data;
    },
    getBookList() {
      this.$http
        .get("/books", {
          params: {
            type: this.book.type,
            name: this.book.name,
            page: this.tablePage.pageNum,
            pageSize: this.tablePage.pageSize,
          },
        })
        .then((res) => {
          this.bookList = res.data.data.rows;
          console.log(this.bookList);
        });
    },
    handleCurrentChange(val) {
      this.tablePage.pageNum = val;
      this.getBookList();
    },
    update() {
      this.dialogVisible = false
        this.$http
          .get("/books", {
            params: {
              name: this.book.name,
            },
          })
          .then((res) => {
            console.log(res.data.data.rows[0].isbn);
            this.$http
              .get("/users/addCart", {
                params: {
                  userId: localStorage.getItem("user"),
                  ISBN: res.data.data.rows[0].isbn,
                  count: this.count,
                },
              })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "成功加入购物车!",
                })
                this.book.name = ''
              });
          });
    },
    update1() {
      this.dialogVisible1 = false
      this.order.price = this.book.price * this.count
      this.$http.post('/orders', this.order).then(res => {
        console.log(res.data.data)
        this.orderDetail.orderId = res.data.data
        this.orderDetail.bookCount = this.count
        this.orderDetail.isbn = this.book.isbn
        this.$http.post('/orders/detail', this.orderDetail).then(res => {
          this.book.name = ''
        })
      })
    },
    cancel() {
      this.dialogVisible = false
      this.dialogVisible1 = false
      this.book.name = ''
      
    },
    addcart(val) {
      this.dialogVisible = true
      this.count = 1
      this.book.name = val;
    },
    bug (obj) {
      this.dialogVisible1 = true
      this.count = 1
      this.book.name = obj.bookName;
      this.book.price = obj.price
      this.book.isbn = obj.isbn;
    },
    closeDialog() {
      this.book.name = ''
    }
  },
  mounted() {
    this.gettotal();
    this.getBookList();
  },
};
</script>

<style scoped>
img {
  width: 120px;
  height: auto;
}
ul {
  list-style-type: none;
}

ul li {
  display: inline-block;
}
#cart {
  width: 200px;
  height: 300px;
  margin: 20px 0;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>