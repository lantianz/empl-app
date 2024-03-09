<template>
    <div class="manage">
        <el-dialog style="color: #aadd99;" title="新增" :visible.sync="dialogVisible" width="50%"
            :before-close="handleClose">
            <!-- 用户表单信息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="学号：" prop="studentId">
                    <el-input placeholder="请输入学号" v-model="form.studentId" :disabled="modalType === 1"
                        id="studentId"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name" id="name"></el-input>
                </el-form-item>
                <el-form-item label="年级：" prop="grade">
                    <el-select v-model="form.grade" placeholder="请选择年级" id="grade">
                        <el-option v-for="item in standInfos.standInfo.grade" :key="item.id" :label="item"
                            :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别：" prop="gender">
                    <el-select v-model="form.gender" placeholder="请选择性别" id="gender">
                        <el-option v-for="item in ['男', '女']" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="院系：" prop="department">
                    <el-select v-model="form.department" placeholder="请选择院系" @change="select_check" id="department">
                        <el-option v-for="item in departmentList" :key="item.id" :label="item"
                            :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业：" prop="major">
                    <el-select v-model="form.major" :placeholder="form.department ? '请选择专业' : '请先选择院系'"
                        :disabled="form.department ? false : true" id="major">
                        <el-option v-for="item in majorList" :key="item.id" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号：" prop="username">
                    <el-input v-model="form.studentId" placeholder="账号与学号一致" disabled id="username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password" for="password">
                    <el-input :placeholder="modalType === 0 ? '已设置默认密码' : '用户密码不可见'" disabled
                        style="width: 130px; margin-right: 10px;" id="password"></el-input>
                    <el-button v-if="modalType === 1" type="danger" @click="resetPassword">恢复默认</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">保 存</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <!-- 新增 -->
            <el-button type="primary" @click="handleAdd()">+ 新增</el-button>
            <h1 style="font-size: 18px; color: #666666;">毕业生就业信息表</h1>
            <!-- 搜索 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="userForm">
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
            <el-table stripe border height="90%" :data="tableData" style="width: 100%;"
                :default-sort="{ prop: 'studentId' }">
                <el-table-column type="index" width="80px" label="本页序号">
                </el-table-column>
                <el-table-column prop="studentId" width="150px" sortable label="学号">
                </el-table-column>
                <el-table-column prop="name" width="100px" label="姓名">
                </el-table-column>
                <el-table-column prop="gender" width="50px" label="性别">
                </el-table-column>
                <el-table-column prop="department" sortable label="院系">
                </el-table-column>
                <el-table-column prop="major" label="专业">
                </el-table-column>
                <el-table-column prop="grade" width="80px" sortable label="年级">
                </el-table-column>
                <el-table-column prop="username" width="150px" label="账号">
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-button @click="showAll" type="primary" size="mini" style="margin-right: 20px;">显示全部</el-button>
                <el-pagination @current-change="handlePage" background :page-size="pageData.pageSize"
                    layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllUserByPage, getUserBySearch, getStandInfo, addUser, editUser, deleteUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            // 用户表单信息学号、姓名、性别、院系、专业、年级、账号、密码
            form: {
                studentId: '',
                name: '',
                gender: '',
                department: '',
                major: '',
                grade: '',
                username: '',
                password: '123456' // 默认密码
            },
            // 标准信息数据
            standInfos: {
                standInfo: [
                    {
                        id: '',
                        department: '',
                        major: '',
                        company_type: '',
                        province: '',
                        city: '',
                        grade: '',
                        department_major: ''
                    }
                ]
            },
            majorList: [],
            departmentList: [],
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
                pageSize: 20,
            },
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
        // 提交表单
        submit() {
            this.form.username = this.form.studentId;
            this.$refs.form.validate((valid) => {
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
        select_check() {
            if (this.form.department) {
                // 用户选择了学院
                // 学院对应专业（每触发一次清空一次）
                this.form.major = ''
                this.majorList = []

                const length = this.standInfos.standInfo.department_major.length
                for (var i = 0; i < length; i++) {
                    if (this.form.department == this.standInfos.standInfo.department_major[i]) {
                        this.majorList.splice(1, 0, this.standInfos.standInfo.major[i])
                    }
                }
            }
        },
        // 实现恢复默认密码
        resetPassword() {
            this.form.password = '123456';
            this.$message.success('已恢复默认密码，请保存');
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
                deleteUser(row.studentId).then(() => {
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
            this.select_check()
        },
        // 新增
        handleAdd() {
            this.modalType = 0;
            this.dialogVisible = true;
        },
        // 获取标准信息
        getStandardInfo() {
            getStandInfo().then(({ data }) => {
                this.standInfos = data.data;
                this.standInfos.standInfo.department_major = this.standInfos.standInfo.department

                // 过滤学院重复
                const length = this.standInfos.standInfo.department.length
                for (var i = 0; i < length; i++) {
                    if (this.standInfos.standInfo.department[i] != this.standInfos.standInfo.department[i + 1]) {
                        this.departmentList.splice(1, 0, this.standInfos.standInfo.department[i])
                    }
                }
            })
        },
        // 获取当前页用户数据和总人数
        getAllUserByPageList() {
            getAllUserByPage({ params: this.pageData }).then(({ data }) => {
                this.tableData = data.data1;    // 分页才是data1
                this.total = data.total;
            })
        },
        // 查找
        getSearchList() {
            getUserBySearch({ params: this.userForm }).then(({ data }) => {
                this.tableData = data.data;
            })
        },
        showAll(){
            console.log('hhhh')
            this.userForm.keyword = '';
            this.getSearchList();
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
    mounted() {
        this.getAllUserByPageList();
        this.getStandardInfo();
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
        background-color: #fff;
        border-radius: 8px;
        margin-top: 20px;
        position: relative;
        height: calc(100% - 62px);

        .pager {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            position: absolute;
            bottom: 10px;
            padding-right: 20px;
            ::v-deep li:not(.disabled).active {
                background-color: #aadd99;
            }
            
        }
    }
}
</style>