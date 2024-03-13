<template>
    <el-row style="height: 98%;">
        <el-col :span="8" style="padding-right: 10px; height: 100%;">
            <el-card style="height: 36%;">
                <div class="admin">
                    <img src="../assets/images/avatar.png" alt="">
                    <div class="admin-info">
                        <p class="role-name">Admin</p>
                        <p class="role-desc">管理员</p>
                    </div>
                </div>
                <div class="new-time">
                    <span>{{ newTime }}</span>
                </div>
            </el-card>
            <el-card class="notice" style="margin-top: 4%; height: 60%;">
                <span class="title">公告</span>
                <el-carousel>
                    <el-carousel-item v-for="item in noticeData" :key="item.content">
                        <div class="content">
                            <el-empty v-if="!item.content" :image-size="70" description="这里是空的~"></el-empty>
                            {{ item.content }}
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left: 10px; height: 100%;">
            <el-card style="height: 99%">
                <span class="r-span" style="margin-bottom: 50px;">欢迎使用毕业生就业信息管理系统</span>
                <el-calendar v-model="value"></el-calendar>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import { } from '../api'
export default {
    data() {
        return {
            newTime: "",
            value: new Date(),
            col_view: false,
            noticeData: [{
                content: null
                //content:'这是一大堆公告这是一大堆公告！！'
            }]
        }
    },
    methods: {
        getNowTime() {
            var date = new Date();
            var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
                + this.addZero(date.getHours()) + ':' + this.addZero(date.getMinutes()) + ':' + this.addZero(date.getSeconds());
            this.newTime = time;
        },
        addZero(s) {
            return s < 10 ? ('0' + s) : s;
        }

    },
    mounted() {
        this.getNowTime();
        clearInterval(myTimeDisplay);//销毁之前
        var myTimeDisplay = setInterval(() => {
            this.getNowTime(); //每秒更新一次时间
        }, 1000);
    }
}
</script>
<style lang="less" scoped>
.admin {
    display: flex;
    justify-content: space-evenly;
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

    .admin-info {
        .role-name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .role-desc {
            color: #999999;
        }
    }
}

.new-time {
    text-align: center;

    span {
        font-size: 32px;
        color: #999999;
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
    }
}

::v-deep .el-card__body {
    display: flex;
    flex-direction: column;

    .r-span {
        font-size: 32px;
        color: #666666;
    }
}

::v-deep .el-calendar-table .el-calendar-day {
    height: 50px;
}
</style>