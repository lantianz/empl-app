<template>
  <div class="el-container">
    <div class="el-header">
      <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增就业资讯</el-button>
      <h1 style="font-size: 18px; color: #666666;">就业资讯推送</h1>
      <!-- 搜索 -->
      <el-form style="margin-top: 20px;" :inline="true" :model="searchForm">
        <el-form-item label="模糊搜索：">
          <el-input v-model="searchForm.keyword" placeholder="请输入标题或作者查找" id="search"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search">查找</el-button>
          <el-button type="primary" @click="backList" icon="el-icon-refresh-left">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="el-main">
      <!-- 就业相关资讯表格 -->
      <el-table stripe border :data="tableData" height="450" style="width: 100%"
        :default-sort="{ prop: 'sendTime', order: 'descending' }">
        <el-table-column type="index" width="50px" label="">
        </el-table-column>
        <el-table-column prop="newsId" width="105px" sortable label="资讯ID">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="author" width="120px" label="作者">
        </el-table-column>
        <el-table-column width="130px" label="封面">
          <template slot-scope="scope">
            <el-image style="width: 108px; height: 64px; border-radius: 5px;"
              :src="'/api/api/files/download/' + scope.row.frontImg"
              :preview-src-list="['/api/api/files/download/' + scope.row.frontImg]">
              <div slot="error" class="image-slot">
                <span>无封面数据</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sendTime" width="145px" sortable label="最后更新时间">
        </el-table-column>
        <el-table-column prop="" label="内容" :formatter="putContent">
        </el-table-column>
        <el-table-column width="225px" label="操作">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="viewNews(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span style="color: #999999; font-size: 14px;">共{{ tableData.length }}条数据</span>
    </div>
    <!-- 编辑资讯内容对话框 -->
    <el-dialog :visible.sync="dialogVisible" :title="modalType === 0? '新增就业资讯': '编辑就业资讯'" width="75%">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="资讯ID" prop="newsId">
          <el-input v-model="form.newsId" id="newsId" disabled style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" id="title" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" id="author" style="width:150px;"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="frontImg">
          <el-upload ref="img-upload" action="/api/api/files/upload" :on-success="successUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content" style="width:95%;">
          <div id="editor"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewNews">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 右抽屉显示资讯内容 -->
    <el-drawer title="资讯展示" :visible.sync="drawer" size="50%">
      <div>
        <common-news-detail :newsData="newsDetail"></common-news-detail>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommonNewsDetail from '@/components/CommonNewsDetail.vue'
import { getEmplNews, getEmplNewsBySearch, addEmplNews, deleteEmplNews, editEmplNews } from '../api'
import E from "wangeditor"
// 初始化富文本编辑器
let editor
function initEditor(content) {
  setTimeout(() => {
    if (!editor) {
      editor = new E('#editor')
      editor.config.placeholder = '请输入内容'
      editor.config.uploadFileName = 'file'
      editor.config.uploadImgServer = '/api/api/files/wang/upload'
      editor.create()
    }
    editor.txt.html(content)
  }, 0)
}

export default {
  data() {
    return {
      tableData: [], // 假设这是从后端API获取的就业资讯列表  
      newsDetail: {}, // 资讯详情（传值给子组件）
      drawer: false,
      dialogVisible: false,
      modalType: 0,// 0表示添加，1表示编辑
      form: {
        newsId: '',
        title: '',
        author: '',
        frontImg: '',
        content: ''
      },
      rules: {
        newsId: [{ required: true, message: '请输入资讯ID', trigger: 'blur' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      searchForm: {
        keyword: ''
      }
    }
  },
  components: {
    CommonNewsDetail
  },
  methods: {
    // content填充
    putContent(row) {
      return '由于格式显示，省略内容，请点击查看按钮查看详细内容'
    },
    // 获取全部资讯
    fetchNewsList() {
      getEmplNews().then(({ data }) => {
        this.tableData = data.data;
        this.tableData.forEach(item => {
          item.newsId = Number(item.newsId);
        })
      })
    },
    // 查找
    getSearchList() {
      if (this.searchForm.keyword == '') {
        this.$message.error('请输入关键字');
        return;
      }
      getEmplNewsBySearch({ params: this.searchForm }).then(({ data }) => {
        this.tableData = data.data;
        this.tableData.forEach(item => {
          item.newsId = Number(item.newsId);
        })
        this.$message.success('共搜索到' + this.tableData.length + '条结果');
      })
    },
    // 取消时重置表单
    cancel() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    // 查看
    viewNews(row) {
      this.newsDetail = row;
      this.drawer = true;
    },
    // 新增
    handleAdd() {
      this.modalType = 0;
      initEditor("");
      this.form.newsId = parseInt(new Date().getTime() / 1000) + '';
      this.dialogVisible = true;
      this.$refs['img-upload'].clearFiles();
    },
    // 编辑
    handleEdit(row) {
      this.modalType = 1;
      initEditor(row.content);
      this.form = JSON.parse(JSON.stringify(row));    // 深拷贝全部
      this.dialogVisible = true;
      this.$refs['img-upload'].clearFiles();
    },
    // 封面上传钩子
    successUpload(res) {
      // 存储的是图片的时间戳前缀
      this.form.frontImg = res.data;
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEmplNews(row.newsId).then(() => {
          this.$message.success('删除成功');
          this.fetchNewsList();
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      })
    },
    // 查找按钮
    onSubmit() {
      this.getSearchList();
    },
    // 返回
    backList() {
      this.fetchNewsList()
      this.$message.success('已返回原列表');
    },
    submitNewNews() {
      this.form.content = editor.txt.html();
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 提交表单的逻辑
          if (this.modalType === 0) {
            // 添加操作
            addEmplNews(this.form).then((response) => {
              if (response.data.code === 20000) {
                this.fetchNewsList();
                this.$message.success('添加成功');
                this.$refs.form.resetFields();
                this.dialogVisible = false;
              } else {
                this.$message.warning('添加失败，已存在');
              }

            })
          } else {
            // 编辑操作
            editEmplNews(this.form).then(() => {
              this.fetchNewsList();
              this.$message.success('更新成功');
              this.$refs.form.resetFields();
              this.dialogVisible = false;
            })
          }
        } else {
          this.$message.error('表单验证失败');
        }
      });

    }
  },
  created() {
    editor = '' // 解决切换页面富文本失效问题
    this.fetchNewsList();
  }
}  
</script>

<style lang="less" scoped>
.el-button {
  border: 2px solid #eeeeee;
  border-radius: 8px;

  &:hover {
    color: #ccc;
  }
}

.el-button--primary {
  color: #fff;
  background-color: #aadd99;

  &:hover {
    background-color: #99cc88;
  }
}

.el-container {
  height: 400px;
  display: block;

  .el-header {
    height: 80px;
    background-color: #fff;
    border-radius: 8px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-main {
    background-color: #fff;
    border-radius: 8px;
    margin-top: 20px;
  }
}
</style>