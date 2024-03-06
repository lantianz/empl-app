<template>
    <div class="login-container">
        <el-form :inline="true" ref="form" :model="form" :rules="rules">
            <h3 class="login_title">登 录</h3>
            <el-form-item label="账 号" prop="username" style="margin-left: 20px;">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password" style="margin-left: 20px;">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" style="margin-left: 125px;">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
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
            },
            dialogVisible: false,
            loginSuccess: false
        };
    },
    methods: {
        login() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 这里你可以添加你的登录逻辑，现在我们只是模拟一个成功登录
                    if (this.form.username === 'admin' && this.form.password === 'password') {
                        this.loginSuccess = true;
                    } else {
                        this.loginSuccess = false;
                    }
                    this.dialogVisible = true;
                } else {
                    return false;
                }
            });
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
}

</style>