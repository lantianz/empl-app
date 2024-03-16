<template>
    <div class="manage">
        <div class="manage-header">
            <h1 style="font-size: 18px; color: #666666;">就业信息统计表（签约单位省市）</h1>
        </div>
        <!-- 主体表格 -->
        <div class="common-main">
            <el-row>
                <el-col :span="4" style="padding-right: 10px;">
                    <div class="l-content">
                        <span>1、请先选择院系<br>2、年级为可选项<br>3、再点击确定查看数据<br></span>
                        <el-form ref="form" :rules="rules" :model="dept">
                            <el-form-item prop="department">
                                <el-select v-model="dept.department" placeholder="请选择院系">
                                    <el-option v-for="item in departmentList" :key="item.id" :label="item"
                                        :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="grade">
                                <el-select style="width: 80px;" v-model="dept.grade" placeholder="年级">
                                    <el-option v-for="item in standInfos.standInfo.grade" :key="item.id" :label="item"
                                        :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div class="operate">
                            <el-button type="primary" @click="Confirm">确认</el-button>
                            <el-button type="primary" @click="showAllGrade">全部年级</el-button>
                        </div>
                        <el-form :model="dept">
                            <el-form-item prop="companyProvince">
                                <el-select v-model="dept.companyProvince" placeholder="请选择省">
                                    <el-option v-for="item in provinceList" :key="item.id" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div class="operate">
                            <el-button type="primary" @click="provinceConfirm">按省份筛选</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="r-content">
                        <el-table stripe border height="90%" :data="tableData" style="width: 100%;"
                            :default-sort="{ prop: 'companyProvince' }">
                            <el-table-column type="index" width="80px" label="本页序号">
                            </el-table-column>
                            <el-table-column prop="companyProvince" width="145px" sortable label="就业单位所在省">
                            </el-table-column>
                            <el-table-column prop="companyCity" width="145px" sortable label="就业单位所在市">
                            </el-table-column>
                            <el-table-column prop="countOfThisPositionEmpl" sortable label="该市本院系就业人数">
                            </el-table-column>
                            <el-table-column prop="allInDeptRate" sortable label="占全市百分比(本院)">
                            </el-table-column>
                            <el-table-column prop="countOfAllPositionEmpl" sortable label="该市全院系合计人数">
                            </el-table-column>
                            <el-table-column prop="allInAllDeptRate" sortable label="占全市百分比(全院)">
                            </el-table-column>
                        </el-table>
                        <div class="pager">
                            <span v-if="tip">当前显示的是 {{ tip }} 就业信息</span>
                            <el-button @click="showAll" type="primary" size="mini"
                                style="margin-right: 20px;">显示全部</el-button>
                            <el-pagination @current-change="handlePage" background :page-size="pageData.pageSize"
                                layout="total, prev, pager, next" :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>

        </div>
    </div>
</template>
<script>
import { getByPositionTable, getTotalTableByPage, getStandInfo } from '../api'
export default {
    data() {
        return {
            dept: {
                companyProvince: '',
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
                        grade: ''
                    }
                ]
            },
            rules: {
                department: [
                    { required: true, message: '请选择院系' }
                ]
            },
            // 筛选后的院系列表
            departmentList: [],
            provinceList: [],
            tableData: [],
            total: 0,// 总用户数
            // 分页
            pageData: {
                pageNum: 1,
                pageSize: 10,
                sign: 'byPosition',
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

                // 年级排序(大到小)
                this.standInfos.standInfo.grade = this.standInfos.standInfo.grade.sort((a, b) => {
                    return b - a;
                })

                // 过滤学院重复
                const length1 = this.standInfos.standInfo.department.length
                for (var i = 0; i < length1; i++) {
                    if (this.standInfos.standInfo.department[i] != this.standInfos.standInfo.department[i + 1]) {
                        this.departmentList.splice(1, 0, this.standInfos.standInfo.department[i])
                    }
                }

                // 过滤省份重复
                const length2 = this.standInfos.standInfo.province.length
                for (var i = 0; i < length2; i++) {
                    if (this.standInfos.standInfo.province[i] != this.standInfos.standInfo.province[i + 1]) {
                        this.provinceList.splice(1, 0, this.standInfos.standInfo.province[i])
                    }
                }
            })
        },
        // 获取当前院系总人数
        getAllByPositionTable() {
            getByPositionTable({ params: this.dept }).then(({ data }) => {
                this.tableData = data;
                this.total = this.tableData.length;
                this.pageData.pageSize = this.total;
                // 小数转百分数
                this.tableData.forEach(item => {
                    item.allInDeptRate = Number(item.allInDeptRate * 100).toFixed(1) + '%';
                    item.allInAllDeptRate = Number(item.allInAllDeptRate * 100).toFixed(1) + '%';
                })
            })
        },
        // 分页显示
        getAllTotalTableBypageList() {
            this.pageData.department = this.dept.department;
            this.pageData.grade = this.dept.grade;
            this.pageData.pageSize = 10;    // 恢复默认页面大小
            getTotalTableByPage({ params: this.pageData }).then(({ data }) => {
                this.tableData = data.data1;
                // 小数转百分数
                this.tableData.forEach(item => {
                    item.allInDeptRate = Number(item.allInDeptRate * 100).toFixed(1) + '%';
                    item.allInAllDeptRate = Number(item.allInAllDeptRate * 100).toFixed(1) + '%';
                })
                this.total = data.total;
            })
        },
        // 显示全部年级
        showAllGrade() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.dept.grade = ''
                    this.getAllTotalTableBypageList();
                    this.tip = this.dept.department + '全部年级';
                    this.$message.success('已显示全部年级就业信息');
                }
            })
        },
        // 本页显示全部
        showAll() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.getAllByPositionTable();
                    this.tip = this.dept.department + '全部省、年级';
                    this.$message.success('已在本页显示全部就业信息');
                }
            })
        },
        // 选择页码
        handlePage(val) {
            this.pageData.pageNum = val;
            this.getAllTotalTableBypageList();
        },
        // 单位类型院系选择确认
        Confirm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.getAllTotalTableBypageList();
                    this.tip = this.dept.department;
                    if (this.dept.grade != '') {
                        this.gradeConfirm();
                    }
                    this.$message.success('已在本页显示' + this.tip + '就业信息');
                }
            })

        },
        // 确定年级
        gradeConfirm() {
            this.getAllTotalTableBypageList();
            this.tip = this.tip + this.dept.grade + '级';
        },
        provinceConfirm() {
            if (this.tableData.length != 0 && this.dept.companyProvince != '') {
                this.tableData = this.tableData.filter(item => {
                    return item.companyProvince == this.dept.companyProvince;
                })
                this.tip = '按省份筛选后';
                this.$message.success('已在本页显示按省份筛选后的结果');
            } else {
                this.$message.error('表中数据为空或未选择省份');
            }
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


.manage {
    height: 93%;

    .manage-header {
        background-color: #fff;
        border-radius: 8px;
        text-align: center;
        padding: 10px;
    }

    .common-main {
        height: calc(100% - 62px);
        margin-top: 20px;

        .el-row {
            height: 100%;

            .el-col {
                height: 100%;
            }
        }

        .l-content {
            background-color: #fff;
            height: 100%;
            border-radius: 8px;
            display: flex;
            align-items: center;
            flex-direction: column;

            span {
                font-size: 12px;
                color: #bb6666;
                margin-top: 20px;
            }

            .el-form {
                margin: 20px 10px 0;

                ::v-deep .el-form-item__content {
                    display: flex;
                    flex-direction: column;
                }
            }

            .operate {
                display: flex;
                flex-direction: column;

                .el-button {
                    margin-left: 0;
                }
            }
        }

        .r-content {
            background-color: #fff;
            height: 100%;
            border-radius: 8px;
            position: relative;

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
}
</style>