<template>
    <div class="manage">
        <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <!-- 用户表单信息 -->
        <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
    <el-form-item label="学号：" prop="studentId">
      <el-input placeholder="请输入学号" v-model="form.studentId" :disabled="modalType === 1" id="studentId"></el-input>
    </el-form-item>
    <el-form-item label="姓名：" prop="name">
      <el-input placeholder="请输入姓名" v-model="form.name" id="name"></el-input>
    </el-form-item>
    <el-form-item label="年级：" prop="grade">
      <el-select v-model="form.grade" placeholder="请选择年级" id="grade">
            <el-option v-for="item in standInfo" :key="item.grade" :label="item.grade" :value="item.grade"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="性别：" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别" id="gender">
            <el-option v-for="item in ['男','女']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="院系：" prop="department">
      <el-select v-model="form.department" placeholder="请选择院系" id="department">
        <el-option v-for="item in standInfo" :key="item.department" :label="item.department" :value="item.department"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="专业：" prop="major">
      <el-select v-model="form.major" placeholder="请选择专业"  id="major">
        <el-option v-for="item in standInfo" :key="item.major" :label="item.major" :value="item.major"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="账号：" prop="username">
      <el-input v-model="form.studentId" placeholder="账号与学号一致" disabled id="username"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
        <span v-if="modalType === 0" style="color: #aaaaaa; margin-right: 20px;">已设置默认密码</span>
        <span v-if="modalType === 1" style="color: #aaaaaa; margin-right: 20px;">用户密码不可见</span>
        <el-button type="danger" @click="resetPassword" id="password">恢复默认</el-button>
    </el-form-item>
  </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd()">
                + 新增
            </el-button>
            <h1 style="font-size: 18px; color: #666666;">毕业生基本信息表</h1>
            <!-- 搜索 -->
            <el-form :inline="true" :model="userForm">
                <el-form-item label="模糊搜索：">
                    <el-input v-model="userForm.keyword" placeholder="请输入学号或姓名查找" id="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 用户主体表格 -->
        <div class="common-table">
            <el-table
            stripe
            height="90%"
            :data="tableData"
            style="width: 100%;">
                <el-table-column
                    prop="studentId"
                    label="学号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="department"
                    label="院系">
                </el-table-column>
                <el-table-column
                    prop="major"
                    label="专业">
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="年级">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="账号">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllUserByPage,getUserBySearch,getStandInfo,addUser,editUser,deleteUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            // 用户表单信息学号、姓名、性别、院系、专业、年级、账号、密码
            form: {
                studentId:'',
                name:'',
                gender:'',
                department:'',
                major:'',
                grade:'',
                username:'',
                password:'123456' // 默认密码
            },
            // 标准信息数据
            standInfo: [],
            // 表单验证规则
            rules: {
                studentId: [
                    { required: true, message: '请输入学号' }
                ],
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                gender: [
                    { required: true, message: '请选择性别' }
                ],
                department: [
                    { required: true, message: '请选择院系' }
                ],
                major: [
                    { required: true, message: '请选择专业' }
                ],
                grade: [
                    { required: true, message: '请选择年级' }
                ],
                username: [
                    { required: false, message: '请输入账号' }
                ],
                password: [
                    { required: false, message: '请输入密码' }
                ]
            },
            tableData: [],
            modalType: 0,// 0表示添加，1表示编辑
            total: 0,// 总用户数
            // 分页
            pageData: {
                pageNum: 1,
                pageSize: 10,
            },
            // 要删除的用户ID
            delData: {
                deleteId: ''
            },
            userForm: {
                keyword: ''
            }
        }
    },
    methods: {
        // 提交表单
        submit() {
            this.form.username = this.form.studentId;
            this.$refs.form.validate((valid) => {
                // console.log(valid);// 表单验证结果
                if (valid) {
                    // 提交表单的逻辑
                    if (this.modalType === 0) {
                        // 添加操作
                        addUser(this.form).then((response) => {
                            if (response.data.code === 20000) {
                                this.getAllUserByPageList();
                                this.$message.success('添加成功');
                            } else {
                                this.$message.warning('添加失败，该账户已存在');
                            }
                            
                        })
                    } else {
                        // 编辑操作
                        editUser(this.form).then(() => {
                            this.getAllUserByPageList();
                            this.$message.success('更新成功');
                        })
                    }
                    this.$refs.form.resetFields();
                    this.dialogVisible = false;
                } else {
                    this.$message.error('表单验证失败');
                }
            });
        },
        // 实现恢复默认密码
        resetPassword() {
            this.form.password = '123456';
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
            this.$refs.form.resetFields();
            this.dialogVisible = false;
        },
        // 删除
        handleDelete(row) {
            this.$confirm('确定要删除该用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delData.deleteId = row.studentId;
                deleteUser({params:this.delData}).then(() => {
                    this.$message.success('删除成功');
                    this.getAllUserByPageList();
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
        // 新增按钮事件
        handleAdd() {
            this.modalType = 0;
            this.dialogVisible = true;
        },
        // 获取标准信息
        getStandardInfo() {
            getStandInfo().then(({ data }) => {
                this.standInfo = data.data;
            })
        },
        // 获取当前页用户数据和总人数
        getAllUserByPageList() {
            getAllUserByPage({params:this.pageData}).then(({ data }) => {
                this.tableData = data.data1;    // 分页才是data1
                this.total = data.total;
        })
        },
        // 查找
        getSearchList() {
            getUserBySearch({params:this.userForm}).then(({ data }) => {
                console.log(data);
                this.tableData = data.data;
        })
        },
        // 选择页码
        handlePage(val) {
            this.pageData.pageNum = val;
            this.getAllUserByPageList();
        },
        // 查找按钮
        onSubmit() {
            this.getSearchList();
        }
    },
    mounted () {
        this.getAllUserByPageList();
        this.getStandardInfo();
    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .common-table {
        position: relative;
        height: calc(100% - 62px);
        .pager {
            position: absolute; 
            bottom: 0;
            right: 20px;
        }
    }
}
</style>