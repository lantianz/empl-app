<template>
    <div class="manage">
        <el-dialog style="color: #aadd99;" :title="modalType === 0? '添加院系负责人': '编辑院系负责人'" :visible.sync="dialogVisible" width="500px"
            :before-close="handleClose">
            <!-- 用户表单信息 -->
            <el-form class="form-user" ref="form" :rules="rules" :inline="true" :model="form" label-width="140px">
                <el-form-item label="工号：" prop="jobId">
                    <el-input placeholder="请输入工号" v-model="form.jobId" :disabled="modalType === 1"
                        id="jobId"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name" id="name"></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="phone">
                    <el-input placeholder="请输入电话" v-model="form.phone" id="phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input placeholder="请输入邮箱" v-model="form.email" id="email"></el-input>
                </el-form-item>
                <el-form-item label="账号：" prop="username">
                    <el-input placeholder="请输入账号" v-model="form.username" id="username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input :placeholder="modalType === 0 ? '已设置默认密码' : '用户密码不可见'" disabled
                        style="width: 130px; margin-right: 10px;" id="password"></el-input>
                    <el-button v-if="modalType === 1" type="danger" size="mini" @click="resetPassword">恢复默认</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button style="float:left;" v-if="modalType === 0" @click="resetForm">清空</el-button>
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <!-- 新增 -->
            <el-button type="primary" @click="handleAdd()" icon="el-icon-plus">添加院系负责人</el-button>
            <h1 style="font-size: 18px; color: #666666;">院系负责人信息表</h1>
            <!-- 搜索 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="userForm">
                <el-form-item label="模糊搜索：">
                    <el-input v-model="userForm.keyword" placeholder="请输入工号或姓名查找" id="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="el-icon-search">查找</el-button>
                    <el-button type="primary" @click="backList" icon="el-icon-refresh-left">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <!-- 用户主体表格 -->
            <el-table stripe border height="90%" ref="multipleTable" :data="tableData" style="width: 100%;"
                :default-sort="{ prop: 'jobId' }">
                <el-table-column type="selection" width="40px">
                </el-table-column>
                <el-table-column type="index" width="80px" label="本页序号">
                </el-table-column>
                <el-table-column prop="jobId" sortable label="工号">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="username" label="账号">
                </el-table-column>
                <el-table-column prop="" label="密码">
                    ******
                </el-table-column>
                <el-table-column fixed="right" prop="" width="150px" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-button @click="toggleSelection(tableData)" type="primary" size="mini" style="margin-right: 10px;">全选
                    /
                    反选</el-button>
                <el-button @click="toggleSelection()" type="primary" size="mini"
                    style="margin-right: 10px;">取消选择</el-button>
                <el-button @click="removeAll()" type="danger" size="mini" style="margin-right: 10px;">批量删除</el-button>
                <span>共有{{ total }}条数据</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllDeptAdminInfo, getDeptAdminBySearch, addDeptAdmin, editDeptAdmin, deleteDeptAdmin, deleteAllDeptAdmin } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            // 用户表单信息
            form: {
                jobId: '',
                name: '',
                phone: '',
                email: '',
                username: '',
                password: '123456'
            },
            // 表单验证规则
            rules: {
                jobId: [
                    { required: true, message: '请输入工号' },
                    { pattern: /^[a-zA-Z0-9]+$/, message: '工号限制大小写字母数字'},
                    { min: 6, message: '工号至少6位'}
                ],
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                phone: [
                    { required: false, message: '请输入电话' },
                    { pattern: /^1[3456789]\d{9}$/, message: '电话格式有误'},
                ],
                email: [
                    { required: false, message: '请输入邮箱' },
                    { pattern: /^([a-zA-Z0-9]+[|-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[|-|.]?)*[a-zA-Z0-9]+(.[a-zA-Z]{2,3})+$/, message: '邮箱格式有误'},
                ],
                username: [
                    { required: true, message: '请输入账号' },
                    { pattern: /^[a-zA-Z0-9]+$/, message: '账号限制大小写字母数字'},
                    { min: 6, message: '账号至少6位'}
                ],
                password: [
                    { required: false, message: '请输入密码' },
                    { min: 6, message: '密码至少6位'}
                ]
            },
            tableData: [],
            modalType: 0,// 0表示添加，1表示编辑
            total: 0,// 总用户数
            // 要删除的用户ID
            delData: {
                deleteId: ''
            },
            // 查找关键词
            userForm: {
                keyword: ''
            }
        }
    },
    methods: {
        // 重置表单
        resetForm() {
            this.form = {
                jobId: '',
                name: '',
                phone: '',
                email: '',
                username: '',
                password: '123456'
            }
            this.$message.success('已清空表单');
        },
        resetPassword() {
            this.form.password = '123456';
            this.$message.success('已恢复默认密码，请保存');
        },
        // 提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 提交表单的逻辑
                    if (this.modalType === 0) {
                        // 添加操作
                        addDeptAdmin(this.form).then((response) => {
                            if (response.data.code === 20000) {
                                this.getAllDeptAdminInfoList();
                                this.$message.success('添加成功');
                                this.$refs.form.resetFields();
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('添加失败，已存在');
                            }

                        })
                    } else {
                        // 编辑操作
                        editDeptAdmin(this.form).then(() => {
                            this.getAllDeptAdminInfoList();
                            this.$message.success('更新成功');
                            this.$refs.form.resetFields();
                            this.dialogVisible = false;
                        })
                    }
                } else {
                    this.$message.error('表单验证失败');
                }
            });
        },
        // 手动关闭表单(新增时不重置)
        handleClose() {
            if (this.modalType === 1) {
                this.$refs.form.resetFields();
            }
            this.dialogVisible = false;
        },
        // 取消时重置表单
        cancel() {
            this.$refs.form.resetFields()
            this.dialogVisible = false;
        },
        // 删除
        handleDelete(row) {
            this.$confirm('确定要删除该负责人吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delData.deleteId = row.jobId;
                deleteDeptAdmin(row.jobId).then(() => {
                    this.$message.success('删除成功');
                    this.getAllDeptAdminInfoList();
                })
            }).catch(() => {
                this.$message.info('已取消删除');
            })
        },
        // 编辑
        handleEdit(row) {
            this.modalType = 1;
            this.dialogVisible = true;
            this.form = JSON.parse(JSON.stringify(row));    // 深拷贝
        },
        // 新增
        handleAdd() {
            this.modalType = 0;
            this.dialogVisible = true;
        },
        // 获取全部院系负责人
        getAllDeptAdminInfoList() {
            getAllDeptAdminInfo().then(({ data }) => {
                this.tableData = data.data;
                this.total = data.total;
            })
        },
        // 查找
        getSearchList() {
            if (this.userForm.keyword == '') {
                this.$message.error('请输入关键字');
                return;
            }
            getDeptAdminBySearch({ params: this.userForm }).then(({ data }) => {
                this.tableData = data.data;
                this.total = data.total;
                this.$message.success('共搜索到' + data.total + '条结果');
            })
        },
        // 返回
        backList() {
            this.getAllDeptAdminInfoList()
            this.$message.success('已返回原列表');
        },
        // 选择、全选框
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // 查找按钮
        onSubmit() {
            this.getSearchList();
        },
        // 批量删除
        removeAll() {
            // 获取被选中的项
            let selectedRows = this.$refs.multipleTable.selection;
            if (selectedRows.length === 0) {
                this.$message.warning('请先选择要删除的项');
                return;
            }

            // 弹出确认框
            this.$confirm('确定要删除选中的' + selectedRows.length + '条信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 构造要删除的用户ID数组
                let deleteIds = selectedRows.map(row => row.jobId);
                // 发送删除请求
                deleteAllDeptAdmin(deleteIds).then(() => {
                    this.$message.success('批量删除成功');
                    // 重新加载数据
                    this.getAllDeptAdminInfoList();
                }).catch(() => {
                    this.$message.error('批量删除失败');
                });
            }).catch(() => {
                this.$message.info('已取消批量删除');
            });
        }
    },
    mounted() {
        this.getAllDeptAdminInfoList();
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

.el-input {
    width: 200px;
}

.el-select {
    width: 200px;
}

.manage {
    height: 93%;

    .manage-header {
        background-color: #fff;
        border-radius: 8px;
        padding-left: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .common-table {
        display: flex;
        justify-content: flex-end;
        background-color: #fff;
        border-radius: 8px;
        margin-top: 20px;
        position: relative;
        height: calc(100% - 62px);

        ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #aadd99;
            border-color: #aadd99;
        }

        ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #aadd99;
            border-color: #aadd99;
        }

        ::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #aadd99;
        }

        ::v-deep .el-checkbox__input:hover .el-checkbox__inner {
            border-color: #aadd99;
        }

        .pager {
            display: flex;
            align-items: flex-end;
            position: absolute;
            bottom: 10px;
            padding-right: 20px;

            span {
                font-size: 14px;
                color: #999999;
                margin: auto;
            }

            ::v-deep li:not(.disabled).active {
                background-color: #aadd99;
            }

        }
    }
}
</style>