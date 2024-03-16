<template>
    <div class="manage">
        <div class="manage-header">
            <!-- 选择栏 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="dept">
                <el-form-item>
                    <el-select v-model="dept.grade" placeholder="请选择年级">
                        <el-option v-for="item in standInfos.standInfo.grade" :key="item.id" :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="gradeConfirm">确认</el-button>
                    <el-button type="primary" @click="showAllGrade">全部年级</el-button>
                </el-form-item>
            </el-form>
            <h1 style="font-size: 18px; color: #666666; margin-left: 100px;">就业信息一览表（按院系）</h1>
        </div>
        <!-- 主体表格 -->
        <div class="common-table">
            <el-table stripe border height="90%" :data="tableData" style="width: 100%;"
                :default-sort="{ prop: 'departments' }">
                <el-table-column type="index" width="80px" label="本页序号">
                </el-table-column>
                <el-table-column prop="departments" sortable label="院系名称">
                </el-table-column>
                <el-table-column prop="countOfGraduate" sortable label="毕业生总数">
                </el-table-column>
                <el-table-column prop="countOfEmployed" sortable label="已就业人数">
                </el-table-column>
                <el-table-column prop="employmentRate" sortable label="就业率">
                </el-table-column>
            </el-table>
            <div class="pager">
                <span>当前显示的是 {{ tip }}级 信息</span>
                <el-button @click="showAll" type="primary" size="mini" style="margin-right: 20px;">显示全部</el-button>
                <el-pagination @current-change="handlePage" background :page-size="pageData.pageSize"
                    layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getByDeptTable, getTotalTableByPage, getStandInfo } from '../api'
export default {
    data() {
        return {
            dept: {
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
            tableData: [],
            total: 0,// 总用户数
            // 分页
            pageData: {
                pageNum: 1,
                pageSize: 10,
                sign: 'byDept',
                department: '',
                grade: ''   // 用来传参
            },
            tip: '全部年'
        }
    },
    methods: {
        // 获取标准信息
        getStandardInfo() {
            getStandInfo().then(({ data }) => {
                this.standInfos = data.data;
                // 年级排序(大到小)
                this.standInfos.standInfo.grade = this.standInfos.standInfo.grade.sort((a, b) => {
                    return b - a;
                })
            })
        },
        // 获取当前年级总人数
        getAllByDeptTable() {
            getByDeptTable({ params: this.dept }).then(({ data }) => {
                this.tableData = data;
                this.total = this.tableData.length;
                this.pageData.pageSize = this.total;
                // 就业率小数转百分数
                this.tableData.forEach(item => {
                    item.employmentRate = Number(item.employmentRate * 100).toFixed(1) + '%';
                })
            })
        },
        // 分页显示
        getAllByDeptTableBypageList() {
            this.pageData.grade = this.dept.grade;
            this.pageData.pageSize = 10;    // 恢复默认页面大小
            getTotalTableByPage({ params: this.pageData }).then(({ data }) => {
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
            this.dept.grade = ''
            this.getAllByDeptTableBypageList();
            this.tip = '全部年';
            this.$message.success('已显示全部年级就业信息');
        },
        // 本页显示全部
        showAll() {
            this.getAllByDeptTable();
            this.tip = '全部年';
            this.$message.success('已在本页显示全部就业信息');
        },
        // 选择页码
        handlePage(val) {
            this.pageData.pageNum = val;
            this.getAllByDeptTableBypageList();
        },
        // 确定年级
        gradeConfirm() {
            if (this.dept.grade == '') {
                this.$message.error('请选择年级');
                return;
            }
            this.getAllByDeptTableBypageList();
            this.tip = this.dept.grade;
            this.$message.success('已在本页显示' + this.dept.grade + '级就业信息');
        }
    },
    mounted() {
        this.getStandardInfo();
        this.getAllByDeptTableBypageList();
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