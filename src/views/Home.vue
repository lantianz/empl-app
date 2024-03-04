<template>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
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
                    <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column v-for="(val, key) in tableLabel"  :prop="key" :label="val" :key="key" />
            </el-table>
        </el-card>
      </el-col>
        <el-col :span="16" style="padding-left: 10px">
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
            tableData: [{
                name: 'oppo',
                todayBuy: '100',
                monthBuy: '300',
                totalBuy: '800'
            },
            {
                name: 'vivo',
                todayBuy: '100',
                monthBuy: '300',
                totalBuy: '800'
            },
            {
                name: '苹果',
                todayBuy: '100',
                monthBuy: '300',
                totalBuy: '800'
            },
            {
                name: '小米',
                todayBuy: '100',
                monthBuy: '300',
                totalBuy: '800'
            },
            {
                name: '魅族',
                todayBuy: '100',
                monthBuy: '300',
                totalBuy: '800'
            }],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            noticeData: [{
                    content:null
                    //content:'这是一大堆公告这是一大堆公告！！'
                }]
        }
    },
    mounted() {
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