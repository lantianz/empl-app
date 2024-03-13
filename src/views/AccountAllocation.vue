<template>
    <div class="manage">
        <div class="manage-header">
            <!-- 选择院系 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="dept">
                <el-form-item>
                    <el-select v-model="dept.deptName" placeholder="请选择院系">
                        <el-option v-for="item in departmentList" :key="item.id" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="deptConfirm">确认</el-button>
                </el-form-item>
            </el-form>
            <h1 style="font-size: 18px; color: #666666;">初始账号密码分配</h1>
            <!-- 搜索 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="userForm">
                <el-form-item label="模糊搜索：">
                    <el-input v-model="userForm.keyword" placeholder="请输入学号或姓名查找" id="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查找</el-button>
                    <el-button type="primary" @click="backList">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-container">
            <!-- 左侧功能表单 -->
            <div class="common-operate">
                <el-form style="margin-top: 20px;" :inline="true" :model="accountForm">
                    <el-form-item>
                        <span style="color: #bb6666;">1、请先选择院系<br>2、再选择需要分配的项<br>3、再进行下一步分配<br></span>
                        <el-button @click="showNullAccount()" type="primary"
                            style="margin-right: 30px;">显示无账密用户</el-button>
                        <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
                    </el-form-item>
                    <el-form-item label="初始账号：" prop="username">
                        <el-input v-model="accountForm.username" placeholder="默认初始账号为学号" disabled
                            id="username"></el-input>
                    </el-form-item>
                    <el-form-item label="初始密码：" prop="password">
                        <el-input v-model="accountForm.password" placeholder="默认初始密码: 111111" id="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span style="color: #999999;">直接点击“确定分配”即分配默认账密</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="toggleSelection(tableData)" type="primary" style="margin-right: 60px;">全选 /
                            反选</el-button>
                        <el-button @click="onSubmitInit" type="primary">确定分配</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 用户主体表格 -->
            <div class="common-table">
                <el-table stripe border height="90%" ref="multipleTable" :data="tableData"
                    :default-sort="{ prop: 'studentId' }">
                    <el-table-column type="selection" width="40px">
                    </el-table-column>
                    <el-table-column type="index" width="80px" label="本页序号">
                    </el-table-column>
                    <el-table-column prop="studentId" sortable label="学号">
                    </el-table-column>
                    <el-table-column prop="name" width="100px" label="姓名">
                    </el-table-column>
                    <el-table-column prop="gender" width="50px" label="性别">
                    </el-table-column>
                    <el-table-column prop="major" label="专业">
                    </el-table-column>
                    <el-table-column prop="grade" width="80px" sortable label="年级">
                    </el-table-column>
                    <el-table-column prop="username" label="账号">
                    </el-table-column>
                    <el-table-column prop="" label="密码" :formatter="fillNone">
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
    </div>
</template>
<script>
import { getDeptUserBySearch, getStandInfo, editGraduateByList } from '../api'
export default {
    data() {
        return {
            dept: {
                deptName: ''
            },
            // 初始账密表单
            accountForm: {
                username: '',
                password: '111111'
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
            // 筛选后的院系列表
            departmentList: [],
            tableInfo: {
                tableData: '',
                total: ''
            },
            tableData: [],
            total: 0,// 总用户数
            // 分页
            pageData: {
                pageNum: 1,
                pageSize: 20,
            },
            // 查找关键词
            userForm: {
                keyword: ''
            }
        }
    },
    methods: {
        // username对应password默认填充
        fillNone(row) {
            let show = null
            row.username ? show = '******' : show = ''
            return show
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
        // 获取当前院系总人数
        getAllGraduateByPageList() {
            if (this.dept.deptName == '') {
                this.$message.error('请选择院系');
                return;
            }
            getDeptUserBySearch({ params: this.dept }).then(({ data }) => {
                this.tableInfo.tableData = this.tableData = data.data;
                this.tableInfo.total = this.total = data.total;
                this.pageData.pageSize = this.total;
            })
        },
        // 返回
        backList() {
            this.getAllGraduateByPageList()
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
        // 显示无账密用户
        showNullAccount() {
            if (this.tableInfo.tableData == '') {
                this.$message.error('列表为空，请先选择院系');
                return;
            }
            this.tableData = this.tableInfo.tableData;
            this.tableData = this.tableData.filter(item => {
                return item.username == '' || item.username == null;
            })
            this.total = this.tableData.length;
            this.pageData.pageSize = this.total;
            this.$message.success('已在本页显示无账密用户');
        },
        // 显示全部
        showAll() {
            if (this.tableInfo.tableData == '') {
                this.$message.error('列表为空，请先选择院系');
                return;
            }
            this.getAllGraduateByPageList();
            this.$message.success('已在本页显示当前院系全部');
        },
        // 选择页码
        handlePage(val) {
            this.pageData.pageNum = val;
            this.getAllGraduateByPageList();
        },
        // 院系选择确认
        deptConfirm() {
            if (this.dept.deptName == '') {
                this.$message.error('请选择院系');
                return;
            }
            this.getAllGraduateByPageList();
            this.$message.success('已在本页显示全部' + this.dept.deptName + '信息');
        },
        // 查找按钮
        onSubmit() {
            if (this.userForm.keyword == '') {
                this.$message.error('请输入关键字');
                return;
            } else if (this.tableInfo.tableData == '') {
                this.$message.error('列表为空，请先选择院系');
                return;
            }
            this.tableData = this.tableInfo.tableData;
            this.tableData = this.tableData.filter(item => {
                if (item.studentId.includes(this.userForm.keyword)) {
                    return item;
                } else if (item.name.includes(this.userForm.keyword)) {
                    return item;
                } else {
                    return null;
                }
            })
            this.total = this.tableData.length;
            this.pageData.pageSize = this.total;    // 结果显示在一页
            this.$message.success('共搜索到' + this.total + '条结果');
        },
        // 初始账密提交
        onSubmitInit() {
            // 获取被选中的项
            let selectedRows = this.$refs.multipleTable.selection;
            if (selectedRows.length === 0) {
                this.$message.warning('请先选择要分配的项');
                return;
            }
            // 弹出确认框
            this.$confirm('确定要分配初始账号密码给选中的' + selectedRows.length + '个吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 构造要分配的用户ID数组
                let editIds = selectedRows.map(row => row.studentId);
                // 发送分配请求
                editGraduateByList(editIds, this.accountForm.password).then(() => {
                    this.$message.success('初始账号密码批量分配成功');
                    // 重新加载数据
                    this.getAllGraduateByPageList();
                }).catch(() => {
                    this.$message.error('批量分配失败');
                });
            }).catch(() => {
                this.$message.info('已取消批量分配');
            });
        }
    },
    mounted() {
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

    .common-container {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        width: 100%;
        height: calc(100% - 62px);

        .common-operate {
            background-color: #fff;
            border-radius: 8px;
            width: 26%;
            padding-left: 20px;

            span {
                font-size: 12px;
            }
        }

        .common-table {
            background-color: #fff;
            border-radius: 8px;
            width: 72%;
            position: relative;

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
}
</style>