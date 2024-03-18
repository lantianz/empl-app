<template>
    <el-row style="height: 98%;">
        <!-- 左边 -->
        <el-col :span="8" style="padding-right: 10px; height: 100%;">
            <el-card style="height: 36%;">
                <div class="admin">
                    <img src="../assets/images/avatar.png" alt="">
                    <div class="admin-info">
                        <p class="role-name">{{ adminInfo.role.roleName }}</p>
                        <p class="role-desc">{{ adminInfo.role.roleDesc }}</p>
                    </div>
                </div>
                <div class="new-time">
                    <span>{{ newTime }}</span>
                </div>
            </el-card>
            <!-- 提示 -->
            <el-card class="notice" style="margin-top: 3%; height: 58%;">
                <span class="title">提示</span>
                <el-carousel>
                    <el-carousel-item v-for="item in noticeData" :key="item.content">
                        <el-empty v-if="!item.content" :image-size="150" description="这里是空的~"></el-empty>
                        <div class="content">
                            {{ item.content }}
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-card>
        </el-col>
        <!-- 右边 -->
        <el-col :span="16" style="padding-left: 10px; height: 100%;">
            <el-card style="height: 96%">
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
                //content:'这是一大堆提示这是一大堆提示！这是一大堆提示这是一大堆提示！这是一大堆提示这是一大堆提示！！这是一大堆提示这是一大堆提示！！这是一大堆提示这是一大堆提示！！'
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
    },
    computed: {
        adminInfo() {
            return this.$store.state.admin.info || JSON.parse(localStorage.getItem('info'));
        }
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
        margin: 20px auto;
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