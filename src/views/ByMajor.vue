<template>
    <div class="manage">
        <div class="manage-header">
            <!-- 选择栏 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="dept">
                <el-form-item>
                    <el-select v-model="dept.department" placeholder="请选择院系">
                        <el-option v-for="item in departmentList" :key="item.id" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <el-select style="width: 80px;" v-model="dept.grade" placeholder="年级">
                        <el-option v-for="item in standInfos.standInfo.grade" :key="item.id" :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="deptConfirm">确认</el-button>
                    <el-button type="primary" @click="showAllGrade">全部年级</el-button>
                </el-form-item>
            </el-form>
            <h1 style="font-size: 18px; color: #666666; margin-left: 50px;">就业信息一览表（按专业）</h1>
        </div>
        <!-- 主体表格 -->
        <div class="common-table">
            <el-table stripe border height="90%" :data="tableData" style="width: 100%;"
                :default-sort="{ prop: 'majors' }">
                <el-table-column type="index" width="80px" label="本页序号">
                </el-table-column>
                <el-table-column prop="majors" sortable label="专业名称">
                </el-table-column>
                <el-table-column prop="countOfGraduate" sortable label="毕业生总数">
                </el-table-column>
                <el-table-column prop="countOfEmployed" sortable label="已就业人数">
                </el-table-column>
                <el-table-column prop="employmentRate" sortable label="就业率">
                </el-table-column>
            </el-table>
            <div class="pager">
                <span v-if="tip">当前显示的是 {{ tip }} 就业信息</span>
                <el-button @click="showAll" type="primary" size="mini" style="margin-right: 20px;">显示全部</el-button>
                <el-pagination @current-change="handlePage" background :page-size="pageData.pageSize"
                    layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getbyMajorTable, getByDeptTableByPage, getStandInfo } from '../api'
export default {
    data() {
        return {
            dept: {
                department: '',
                grade: ''
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
            tableData: [],
            total: 0,// 总用户数
            // 分页
            pageData: {
                pageNum: 1,
                pageSize: 10,
                department: '',
                grade: ''    // 用来传参
            },
            tip: ''
        }
    },
    methods: {
        // 获取标准信息
        getStandardInfo() {
            getStandInfo().then(({ data }) => {
                this.standInfos = data.data;
                this.standInfos.standInfo.department_major = this.standInfos.standInfo.department

                // 年级排序(大到小)
                this.standInfos.standInfo.grade = this.standInfos.standInfo.grade.sort((a, b) => {
                    return b - a;
                })

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
        getAllByMajorTable() {
            getbyMajorTable({ params: this.dept }).then(({ data }) => {
                this.tableData = data;
                // 就业率小数转百分数
                this.tableData.forEach(item => {
                    item.employmentRate = Number(item.employmentRate * 100).toFixed(1) + '%';
                })
            })
        },
        // 分页显示
        getAllByDeptTableBypageList() {
            this.pageData.department = this.dept.department;
            this.pageData.grade = this.dept.grade;
            this.pageData.pageSize = 10;    // 恢复默认页面大小
            getByDeptTableByPage({ params: this.pageData }).then(({ data }) => {
                this.tableData = data.data1;
                // 就业率小数转百分数
                this.tableData.forEach(item => {
                    item.employmentRate = Number(item.employmentRate * 100).toFixed(1) + '%';
                })
                this.total = data.total;
            })
        },
        // 显示全部年级
        showAllGrade() {
            if (this.dept.department == '') {
                this.$message.error('请先选择院系');
                return;
            }
            this.dept.grade = ''
            this.getAllByDeptTableBypageList();
            this.tip = this.dept.department + '全部年级';
            this.$message.success('已显示全部年级就业信息');
        },
        // 本页显示全部
        showAll() {
            if (this.dept.department == '') {
                this.$message.error('请先选择院系');
                return;
            }
            this.getAllByMajorTable();
            this.total = this.tableData.length;
            this.pageData.pageSize = this.total;
            this.tip = this.dept.department + '全部年级';
            this.$message.success('已在本页显示全部就业信息');
        },
        // 选择页码
        handlePage(val) {
            this.pageData.pageNum = val;
            this.getAllByDeptTableBypageList();
        },
        // 院系选择确认
        deptConfirm() {
            if (this.dept.department == '') {
                this.$message.error('请先选择院系');
                return;
            }
            this.getAllByDeptTableBypageList();
            this.tip = this.dept.department;
            if (this.dept.grade != '') {
                this.gradeConfirm();
            }
            this.$message.success('已在本页显示' + this.tip + '就业信息');
        },
        // 确定年级
        gradeConfirm() {
            this.getAllByDeptTableBypageList();
            this.tip = this.dept.department + this.dept.grade + '级';
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
        align-items: center;
    }

    .common-table {
        background-color: #fff;
        border-radius: 8px;
        margin-top: 20px;
        position: relative;
        height: calc(100% - 62px);

        .pager {
            span {
                margin: auto;
                font-size: 14px;
                color: #999999;
            }

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