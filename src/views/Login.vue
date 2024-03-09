<template>
    <div class="login-container">
        <el-form :inline="true" ref="form" :model="adminForm" :rules="rules">
            <h3 class="login_title">登 录</h3>
            <el-form-item label="账 号" prop="username">
                <el-input class="form_block" v-model="adminForm.username" placeholder="请输入账号" id="username"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input class="form_block" type="password" v-model="adminForm.password" placeholder="请输入密码"
                    id="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" style="">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { adminLogin, getMenu } from '../api'
import { resetRouter } from "@/router"

export default {
    data() {
        return {
            adminForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 登录按钮点击事件
        login() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    adminLogin(this.adminForm).then(res => {
                        if (res.data.code === 20000) {
                            // 重置路由
                            resetRouter()
                            const token = res.data.data.token;
                            const adminInfo = res.data.data.info;
                            // 将token存入
                            localStorage.setItem('token', token);
                            localStorage.setItem('info', JSON.stringify(adminInfo));
                            this.$store.commit('adminInfo', adminInfo)
                            this.$message.success('登录成功');
                            getMenu(res.data.data.info.role.roleId).then(({ data }) => {
                                const menu = data;
                                // 获取菜单数据，存入store，存入
                                localStorage.setItem('menu', JSON.stringify(menu));
                                this.$store.commit('activeMenu', this.$router)
                            })
                            this.$router.push('/home');
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }
            })

        }
    }
};
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    margin: 180px auto;
    padding: 35px 15px 15px 15px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 25px #ddd;
    box-sizing: border-box;

    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-form-item {
        margin-left: 20px;

        .el-input {
            width: 210px;
        }

        .el-button {
            width: 210px;
            margin-left: 55px;
        }
    }

}
</style>