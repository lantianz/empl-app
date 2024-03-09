<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handlemenu" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb>
                <el-breadcrumb-item v-for="item in tags" :key="item.path">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <span>????</span>
            <el-dropdown @command="handleClick">
                  <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.jpg" alt="">
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {adminLogout} from '../api'
export default {
    data() {
        return {

        }
    },
    methods: {
        handlemenu() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command) {
            if(command === 'logout') {
                adminLogout().then(res=>{
                    // localStorage.removeItem('token')
                    // localStorage.removeItem('menu')
                    localStorage.clear()
                    this.$router.push('/login')
                })
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        }),
        adminInfo() {
            console.log(this.$store.state.admin.info.name)
            return this.$store.state.admin.info || JSON.parse(localStorage.getItem('info'));
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
    &:focus {
        color: #aadd99;
        background-color: #fff;
    }
}

.el-button--primary {
    color: #fff;
    background-color: #aadd99;

    &:hover {
        background-color: #99cc88;
    }
}
.header-container {
    padding: 0 20px;
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 3px solid #eee;
    .r-content {
        display: flex;
        align-items: center;
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content {
        display: flex;
        align-items: center;
        ::v-deep .el-breadcrumb__item { //样式穿透
            &:last-child {
                .el-breadcrumb__inner {
                    color: #333333;
                }
            }
        }
    }
}
</style>