<template>  
    <div class="job-news-list-page">  
      <el-container>  
        <el-header>  
          <el-button type="primary" @click="addNewsDialogVisible = true">新增就业资讯</el-button>  
        </el-header>  
        <el-main>  
          <el-row :gutter="20" style="height: 200px; background-color: aqua;">  
            <el-col v-for="(news, index) in newsList" :key="index" :span="12">  
              <div class="news-item">  
                <h3>{{ news.title }}</h3>  
                <p>{{ news.content }}</p>  
                <el-button type="text" @click="viewNews(news)">查看</el-button>  
                <el-button type="text" @click="editNews(news)">编辑</el-button>  
                <el-button type="text" @click="deleteNews(news.id)">删除</el-button>  
              </div>  
            </el-col>  
          </el-row>  
        </el-main>  
        <el-dialog :visible.sync="addNewsDialogVisible" title="新增就业资讯">  
          <el-form ref="addNewsForm" :model="addNewsForm" label-width="120px">  
            <el-form-item label="标题">  
              <el-input v-model="addNewsForm.title"></el-input>  
            </el-form-item>  
            <!-- 富文本编辑内容 -->
            <el-form-item label="内容">  
              
            </el-form-item>  
            <el-form-item>  
              <el-button type="primary" @click="submitNewNews">保存</el-button>  
              <el-button @click="addNewsDialogVisible = false">取消</el-button>  
            </el-form-item>  
          </el-form>  
        </el-dialog>  
      </el-container>  
    </div>  
  </template>  
    
  <script>  
    
  export default {
    data() {  
      return {  
        newsList: [], // 假设这是从后端API获取的就业资讯列表  
        addNewsDialogVisible: false,  
        addNewsForm: {  
          title: '',  
          content: ''  
        }  
      }  
    },  
    created() {  
      this.fetchNewsList();  
    },  
    methods: {  
      fetchNewsList() {  
        // 假设你有一个API端点用于获取就业资讯列表  
        // 发送GET请求到后端API获取列表  
      },  
      viewNews(news) {  
        // 处理查看新闻的逻辑，可以弹出一个新的对话框显示新闻详情  
        console.log('查看新闻:', news);  
      },  
      editNews(news) {  
        // 处理编辑新闻的逻辑，可以弹出一个新的对话框用于编辑新闻  
        console.log('编辑新闻:', news);  
      },
    deleteNews(newsId) {  
      // 处理删除新闻的逻辑，发送DELETE请求到后端API删除新闻  
    },  
    submitNewNews() {  
      // 处理保存新就业资讯的逻辑，发送POST请求到后端API保存新闻  
    }  
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
.news-item {  
  margin-bottom: 20px;  
  padding: 10px;  
  border: 1px solid #ddd;  
  border-radius: 4px;  
}  
</style>