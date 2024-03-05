<template>
    <el-row>
      <el-col id="col8" :span="col_view ? 0 : 8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.jpg" alt="">
            <div class="userinfo">
                <p class="name">admin</p>
                <p class="access">管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2024-3-1</span></p>
            <p>上次登录地点：<span>桂林</span></p>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px; height: 320px;">
                    
        </el-card>
      </el-col>
        <el-col :span="col_view ? 24 : 16" style="padding-left: 10px">
            <el-card class="box-card" style="margin-bottom: 10px">
                <div class="notice">
                    <span class="title">公告</span>
                    <el-carousel height="100px">
                    <el-carousel-item v-for="item in noticeData" :key="item.content">
                        <div class="content">
                            <el-empty :image-size="70" v-if="!item.content" description="这里是空的~" style="padding: 0;flex-direction: row;"></el-empty>
                            {{ item.content }}
                        </div>
                    </el-carousel-item>
                    </el-carousel>
                </div>
            </el-card>
            <el-card style="margin-top: 20px; height: 376px">
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import {  } from '../api'
export default {
    data() {
        return {
            col_view: false,
            noticeData: [{
                    content:null
                    //content:'这是一大堆公告这是一大堆公告！！'
                }]
        }
    },
    methods: {
        widthGet(){
            let width = document.getElementById("col8").offsetWidth;
            if (width < 300){
                this.col_view = true;
            }
        }
    },
    mounted() {
        this.widthGet();
    }
}
</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo {
      .name {
          font-size: 32px;
          margin-bottom: 10px;
      }
      .access {
          color: #999999;
      }
  }
}
.login-info {
  p {
      line-height: 28px;
      font-size: 14px;
      color: #999999;
  }
  span {
      color: #666666;
      margin-left: 80px;
  }
}
.notice {
    text-align: center;
    .title {
        font-size: 36px;
        line-height: 40px;
        color: #666666;
    }
    .content {
        font-size: 20px;
        line-height: 30px;
        color: #999999;
        padding-top: 20px;
    }
}
</style>