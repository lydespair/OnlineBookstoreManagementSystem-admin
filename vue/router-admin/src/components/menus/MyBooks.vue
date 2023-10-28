<template>
    <div>
        <h2 class="text-center">图书管理</h2>
        <el-row type="flex" justify="end" style="margin-top:20px">
            <el-button
                type="primary"
                @click="dialogVisible1 = true"
                round
                style="margin-right: 560px; height: 40px"
            >新增图书</el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="查询图书">
                    <el-input v-model="book.bookName" placeholder="输入关键词查询"></el-input>
                </el-form-item>
                <el-form-item label="图书类型">
                    <el-select v-model="book.booktype" placeholder="全部类型" style="width: 150px">
                        <el-option label="文学小说" value="1"></el-option>
                        <el-option label="社科经营" value="2"></el-option>
                        <el-option label="幼儿童书" value="3"></el-option>
                        <el-option label="生活艺术" value="4"></el-option>
                        <el-option label="行业职业" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getbooklist">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-table
            :data="booklist"
            style="width: 100%"
            :row-style="{height: '120px'}"
            :row-class-name="tableRowClassName"
        >
            <el-table-column prop="isbn" label="图书ID" width="140"></el-table-column>
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
            <el-table-column prop="type" label="类型" width="100">
                <template slot-scope="scope">{{ type[scope.row.type - 1] }}</template>
            </el-table-column>
            <el-table-column prop="publisher" label="出版社"></el-table-column>
            <el-table-column prop="price" label="价格" width="80"></el-table-column>
            <el-table-column prop="author" label="作者" width="120"></el-table-column>
            <el-table-column prop="publishDate" label="出版时间" width="120"></el-table-column>
            <el-table-column prop="count" label="库存" width="80"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">下架</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="total, prev, pager, next, ->, jumper, sizes"
            :page-size="tablePage.pageSize"
            :current-page="tablePage.pageNum"
            :page-sizes="pageSizes"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="tablePage.total"
            style="margin-top: 30px"
        ></el-pagination>

        <el-dialog
            title="图书基本信息"
            :visible.sync="dialogVisible"
            @close="handleCancle"
            width="40%"
            center:true
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-col :span="11">
                    <el-form-item label="图书ID">
                        <el-input v-model="form.isbn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="书名">
                        <el-input v-model="form.bookName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="更换封面">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadActionUrl"
                            :headers="headerObj"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="form.image" :src="form.image" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="图书类型">
                        <el-select v-model="form.type" placeholder="全部类型" style="width: 150px">
                            <el-option label="文学小说" value="1"></el-option>
                            <el-option label="社科经营" value="2"></el-option>
                            <el-option label="幼儿童书" value="3"></el-option>
                            <el-option label="生活艺术" value="4"></el-option>
                            <el-option label="行业职业" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="出版社">
                        <el-input v-model="form.publisher"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="作者">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="出版时间">
                        <el-date-picker
                            style="width: 100%"
                            v-model="form.publishDate"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="库存">
                        <el-input v-model="form.count"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="update(form)">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="新增图书"
            :visible.sync="dialogVisible1"
            @close="handleCancle"
            width="40%"
            center:true
        >
            <el-form ref="form1" :model="form1" label-width="80px">
                <el-col :span="11">
                    <el-form-item label="图书ID">
                        <el-input v-model="form1.isbn"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="书名">
                        <el-input v-model="form1.bookName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="添加封面">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadActionUrl"
                            :headers="headerObj"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="form1.image" :src="form1.image" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="图书类型">
                        <el-select v-model="form1.type" placeholder="全部类型" style="width: 150px">
                            <el-option label="文学小说" value="1"></el-option>
                            <el-option label="社科经营" value="2"></el-option>
                            <el-option label="幼儿童书" value="3"></el-option>
                            <el-option label="生活艺术" value="4"></el-option>
                            <el-option label="行业职业" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="出版社">
                        <el-input v-model="form1.publisher"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="价格">
                        <el-input v-model="form1.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="作者">
                        <el-input v-model="form1.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="出版时间">
                        <el-date-picker
                            style="width: 100%"
                            v-model="form1.publishDate"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="库存">
                        <el-input v-model="form1.count"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel2">取 消</el-button>
                <el-button type="primary" @click="add(form1)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "MyBooks",
  data() {
    return {
      formInline: {},
      booklist: [],
      book: {
        bookName: "",
        booktype: null,
      },
      type: ["文学小说", "社科经营", "幼儿童书", "生活艺术", "行业职业"],
      dialogVisible: false,
      dialogVisible1: false,
      form: {},
      form1: {},
      fileType: ["png", "jpg", "bmp", "jpeg"],
      fileSize: 10,
      uploadActionUrl: "http://localhost:8080/upload",
      headerObj: {
        token: localStorage.getItem("token"),
      },
      url: "",
      tablePage: {
        pageNum: 1, // 第几页
        pageSize: 5, // 每页多少条
        total: 0, // 总记录数
      },
      pageSizes: [5, 8, 10, 20],
    };
  },
  methods: {
    async gettotal() {
      const { data: res } = await this.$http.get("/books/counts");
      this.tablePage.total = res.data;
    },
    getbooklist() {
      this.gettotal();
      this.$http
        .get("/books", {
          params: {
            type: this.book.booktype,
            name: this.book.bookName,
            page: this.tablePage.pageNum,
            pageSize: this.tablePage.pageSize,
          },
        })
        .then((res) => {
          this.booklist = res.data.data.rows;
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.count == 0) {
        return "warning-row";
      }
    },
    handleSizeChange(val) {
      this.tablePage.pageSize = val;
      this.getbooklist();
    },
    handleCurrentChange(val) {
      this.tablePage.pageNum = val;
      this.getbooklist();
    },
    handleCancle() {
      this.getbooklist();
    },
    handleEdit(obj) {
      this.dialogVisible = true;
      this.form = obj;
    },
    handleDelete(obj) {
      this.$confirm("是否删除此图书", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          })
          this.$http.delete("/books/" + obj.isbn).then((res) => {
            this.getbooklist();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    cancel() {
      this.$message({
            type: "info",
            message: "已取消",
      })
      this.dialogVisible = false
    },
    cancel2() {
      this.$message({
            type: "info",
            message: "已取消",
      })
      this.dialogVisible1 = false
    },
    handleAvatarSuccess(res, file) {
      this.url = res.data;
    },
    beforeAvatarUpload(image) {
      if (image.type != "" || image.type != null || image.type != undefined) {
        //截取文件的后缀，判断文件类型
        const FileExt = image.name.replace(/.+\./, "").toLowerCase();
        //计算文件的大小
        const isLt5M = image.size / 1024 / 1024 < 10; //这里做文件大小限制
        //如果大于10M
        if (!isLt5M) {
          this.$showMessage("上传文件大小不能超过 10MB!");
          return false;
        }
        //如果文件类型不在允许上传的范围内
        if (this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },
    update(obj) {
      this.$message({
            type: "success",
            message: "修改成功!",
      })
      this.dialogVisible = false;
      if (this.url) obj.image = this.url;
      this.url = "";
      this.$http.put("/books", obj).then((res) => {
        for (let i = 0; i < this.booklist.size(); i++) {
          if (this.booklist[i].isbn === obj.isbn) {
            this.booklist[i] = obj;
            this.getbooklist();
          }
        }
      });
    },
    add(obj) {
      this.$message({
            type: "success",
            message: "添加成功!",
      })
      this.dialogVisible1 = false;
      if (this.url) obj = this.url;
      this.url = "";
      this.$http.post("/books", obj).then((res) => {
        this.getbooklist();
      });
    },
  },
  beforeMount() {
    this.getbooklist();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>