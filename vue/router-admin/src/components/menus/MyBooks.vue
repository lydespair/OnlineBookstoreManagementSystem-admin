<template>
    <div>
        <h2 class="text-center">图书管理</h2>

        <el-row type="flex" justify="end" style="margin-top:20px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="查询图书">
                    <el-input v-model="book.bookName" placeholder="输入关键词查询"></el-input>
                </el-form-item>
                <el-form-item label="图书类型">
                    <el-select v-model="book.type" placeholder="全部类型" style="width: 150px">
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
            :row-class-name="tableRowClassName">
            <el-table-column prop="isbn" label="图书ID" width="140"></el-table-column>
            <el-table-column prop="bookName" label="书名">
            </el-table-column>
            <el-table-column label="封面" width="140">
              <template slot-scope="scope">
                    <div class="block">
                        <el-image fit="contain"  style="height: 115px; width: 80px" :src="scope.row.image"></el-image>
                    </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
            <el-table-column prop="publisher" label="出版社"></el-table-column>
            <el-table-column prop="price" label="价格" width="80"></el-table-column>
            <el-table-column prop="author" label="作者" width="120"></el-table-column>
            <el-table-column prop="publishDate" label="出版时间" width="120"></el-table-column>
            <el-table-column prop="count" label="库存" width="80"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >下架</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 30px"></el-pagination>

        <el-dialog title="图书基本信息" :visible.sync="dialogVisible" width="40%" center:true>
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
                <el-form-item label="更换封面">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadActionUrl"
                        :headers="headerObj"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.image" :src="form.image" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-col :span="11">
                    <el-form-item label="类型">
                        <el-input v-model="form.type"></el-input>
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
                        <el-input v-model="form.publishDate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="库存">
                        <el-input v-model="form.count"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="update(form)">确 定</el-button>
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
        booktype: "",
      },
      dialogVisible: false,
      form: {},
      fileType: ["png", "jpg", "bmp", "jpeg"],
      fileSize: 10,
      fileList: [],
      uploadActionUrl: "http://localhost:8080/upload",
      headerObj: {
        token: localStorage.getItem("token"),
      },
      url: "",
    };
  },
  methods: {
    getbooklist() {
      this.$http.get("/books").then((res) => {
        this.booklist = res.data.data.rows;
        console.log(this.booklist);
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.count == 0) {
        return "warning-row";
      }
    },
    handleEdit(obj) {
      this.dialogVisible = true;
      this.form = obj;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
      this.dialogVisible = false;
      obj.image = this.url;
      this.$http.put("/books", obj).then((res) => {
        for (let i = 0; i < this.booklist.size(); i++) {
          if (this.booklist[i].isbn === obj.isbn) {
            this.booklist[i] = obj;
            this.getbooklist();
          }
        }
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