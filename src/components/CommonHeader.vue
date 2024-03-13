<template>
    <div class="header-container">
        <!-- 更改密码对话框 -->
        <el-dialog style="color: #aadd99;" title="更改密码" :visible.sync="dialogVisible" width="400px"
            :before-close="handleClose">
            <!-- 表单信息 -->
            <el-form class="form-password" ref="form" :rules="rules" :inline="true" :model="form" label-width="100px">
                <el-form-item label="当前密码：" prop="oldPwd">
                    <el-input placeholder="请输入" v-model="form.oldPwd" show-password id="oldPwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPwd">
                    <el-input placeholder="请输入" v-model="form.newPwd" show-password id="newPwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="password">
                    <el-input placeholder="请确认" v-model="form.password" show-password id="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">更 改</el-button>
            </span>
        </el-dialog>
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handlemenu" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb>
                <el-breadcrumb-item v-for="item in tags" :key="item.label">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <span class="r-content-name">欢迎工号 {{ adminInfo.jobId }} {{ adminInfo.name }} 使用该系统</span>
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/avatar.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userVue">个人中心</el-dropdown-item>
                    <el-dropdown-item command="changePwd">更改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { changePwd, adminLogout } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                jobId: '',
                oldPwd: '',
                newPwd: '',
                password: ''
            },
            rules: {
                oldPwd: [
                    { required: true, message: '请输入当前密码' }
                ],
                newPwd: [
                    { required: true, message: '请输入新密码' }
                ],
                password: [
                    { required: true, message: '请确认新密码' }
                ]
            }
        }
    },
    methods: {
        handlemenu() {
            this.$store.commit('collapseMenu')
        },
        // 下拉栏的点击事件处理
        handleClick(command) {
            // 个人中心
            if (command === 'userVue') {
                let item = {
                    path: '/user',
                    name: 'user',
                    label: '个人中心'
                }
                //当前页面与跳转页面不一致则允许跳转
                if (this.$route.path !== item.path) {
                    this.$router.push(item.path);
                }
                this.$store.commit("selectMenu", item);
            }
            // 更改密码
            if (command === 'changePwd') {
                this.dialogVisible = true;
            }
            // 退出登录
            if (command === 'logout') {
                adminLogout().then(res => {
                    // localStorage.removeItem('token')
                    // localStorage.removeItem('menu')
                    localStorage.clear()
                    this.$router.push('/login')
                })
            }
        },
        // 手动关闭重置表单
        handleClose() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        // 取消时重置表单
        cancel() {
            this.$refs.form.resetFields()
            this.dialogVisible = false;
        },
        submit() {
            this.form.jobId = this.adminInfo.jobId
            if (this.form.newPwd !== this.form.password) {
                this.$message.error('新密码和确认密码不一致')
                return
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    changePwd(this.form).then(res => {
                        if (res.data.code === 20000) {
                            this.$message.success('更改成功');
                            this.$refs.form.resetFields();
                            this.dialogVisible = false;
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }
            })
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        }),
        adminInfo() {
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

    .l-content {
        display: flex;
        align-items: center;

        ::v-deep .el-breadcrumb__item {

            //样式穿透
            &:last-child {
                .el-breadcrumb__inner {
                    color: #333333;
                }
            }
        }
    }

    .r-content {
        display: flex;
        align-items: center;

        .r-content-name {
            color: #666666;
            font-size: 14px;
            margin-right: 30px;
        }

        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>