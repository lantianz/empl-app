<template>
    <div class="manage">
        <el-dialog style="color: #aadd99;" title="新增" :visible.sync="dialogVisible" width="750px"
            :before-close="handleClose">
            <!-- 用户表单信息 -->
            <el-form class="form-user" ref="form" :rules="rules" :inline="true" :model="form" label-width="140px">
                <el-form-item label="学号：" prop="studentId">
                    <el-input placeholder="请输入学号" v-model="form.studentId" :disabled="modalType === 1"
                        id="studentId"></el-input>
                </el-form-item>
                <el-form-item label="读研：" prop="postgraduate">
                    <el-radio-group v-model="form.postgraduate">
                        <el-radio v-for="item in ['是', '否']" :key="item" :label="item"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="按时就业：" prop="emplOntime">
                    <el-radio-group v-model="form.emplOntime">
                        <el-radio v-for="item in ['是', '否']" :key="item" :label="item"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-left: 95px" label="毕业两年内就业：" prop="emplWithintwo">
                    <el-radio-group v-model="form.emplWithintwo">
                        <el-radio v-for="item in ['是', '否']" :key="item" :label="item"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="签约单位全称：" prop="companyName">
                    <el-input placeholder="请输入签约单位全称" v-model="form.companyName" id="companyName"></el-input>
                </el-form-item>
                <el-form-item label="签约单位类别：" prop="companyType">
                    <el-select v-model="form.companyType" placeholder="请选择签约单位类别" id="companyType">
                        <el-option v-for="item in standInfos.standInfo.company_type" :key="item.id" :label="item"
                            :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签约单位所在省：" prop="companyProvince">
                    <el-select v-model="form.companyProvince" placeholder="请选择签约单位所在省" @change="select_check"
                        id="companyProvince">
                        <el-option v-for="item in provinceList" :key="item.id" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签约单位所在市：" prop="companyCity">
                    <el-select v-model="form.companyCity"
                        :placeholder="form.companyProvince ? '请选择签约单位所在市' : '请先选择签约单位所在省'"
                        :disabled="form.companyProvince ? false : true" id="companyCity">
                        <el-option v-for="item in cityList" :key="item.id" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="签约日期：" prop="signDate">
                    <el-date-picker v-model="form.signDate" type="date" placeholder="请选择签约日期" id="signDate">
                    </el-date-picker>
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
            <el-button type="primary" @click="handleAdd()" icon="el-icon-plus">新增</el-button>
            <h1 style="font-size: 18px; color: #666666;">毕业生就业信息表</h1>
            <!-- 搜索 -->
            <el-form style="margin-top: 20px;" :inline="true" :model="userForm">
                <el-form-item label="模糊搜索：">
                    <el-input v-model="userForm.keyword" placeholder="请输入学号或单位名称查找" id="search"></el-input>
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
                :default-sort="{ prop: 'studentId' }">
                <el-table-column type="selection" width="40px">
                </el-table-column>
                <el-table-column type="index" width="80px" label="本页序号">
                </el-table-column>
                <el-table-column prop="studentId" sortable label="学号">
                </el-table-column>
                <el-table-column prop="companyName" label="签约单位全称">
                </el-table-column>
                <el-table-column prop="companyType" label="签约单位类别">
                </el-table-column>
                <el-table-column prop="companyProvince" width="120px" label="签约单位所在省">
                </el-table-column>
                <el-table-column prop="companyCity" width="120px" label="签约单位所在市">
                </el-table-column>
                <el-table-column prop="signDate" width="105px" sortable label="签约日期">
                </el-table-column>
                <el-table-column prop="postgraduate" width="50px" label="读研">
                </el-table-column>
                <el-table-column prop="emplOntime" width="80px" label="按时就业">
                </el-table-column>
                <el-table-column prop="emplWithintwo" width="120px" label="毕业两年内就业">
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
                <el-button @click="showAll" type="primary" size="mini" style="margin-right: 10px;">显示全部</el-button>
                <el-pagination @current-change="handlePage" background :page-size="pageData.pageSize"
                    layout="total, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllEmplInfoByPage, getEmplInfoBySearch, getStandInfo, addEmplInfo, editEmplInfo, deleteEmplInfo, deleteAllEmplInfo } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            // 用户表单信息
            form: {
                studentId: '',
                companyName: '',
                companyType: '',
                companyProvince: '',
                companyCity: '',
                signDate: '',
                postgraduate: '',
                emplOntime: '',
                emplWithintwo: ''
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
                        department_major: '',
                        province_city: ''
                    }
                ]
            },
            // 筛选后的省市列表
            provinceList: [],
            cityList: [],
            // 表单验证规则
            rules: {
                studentId: [
                    { required: true, message: '请输入学号' },
                    { pattern: /^[a-zA-Z0-9]+$/, message: '学号限制大小写字母数字'},
                    { min: 6, message: '学号至少6位'}
                ],
                companyName: [
                    { required: true, message: '请输入单位全称' }
                ],
                companyType: [
                    { required: true, message: '请选择单位类别' }
                ],
                companyProvince: [
                    { required: true, message: '请选择单位所在省份' }
                ],
                companyCity: [
                    { required: true, message: '请选择单位所在市' }
                ],
                signDate: [
                    { required: true, message: '请选择签约日期' }
                ],
                postgraduate: [
                    { required: true, message: '请选择是否读研' }
                ],
                emplOntime: [
                    { required: true, message: '请选择是否就业' }
                ],
                emplWithintwo: [
                    { required: true, message: '请选择是否两年内就业' }
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
        // 重置表单
        resetForm() {
            this.form = {
                studentId: '',
                companyName: '',
                companyType: '',
                companyProvince: '',
                companyCity: '',
                signDate: '',
                postgraduate: '',
                emplOntime: '',
                emplWithintwo: ''
            }
            this.$message.success('已清空表单');
        },
        // 提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 提交表单的逻辑
                    if (this.modalType === 0) {
                        // 添加操作
                        addEmplInfo(this.form).then((response) => {
                            if (response.data.code === 20000) {
                                this.getAllEmplInfoByPageList();
                                this.$message.success('添加成功');
                                this.$refs.form.resetFields();
                                this.dialogVisible = false;
                            } else {
                                this.$message.warning('添加失败，不存在该毕业生或已添加过');
                            }

                        })
                    } else {
                        // 编辑操作
                        editEmplInfo(this.form).then(() => {
                            this.getAllEmplInfoByPageList();
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
        select_check() {
            if (this.form.companyProvince) {
                // 用户选择了省
                // 省对应市（每触发一次清空一次）
                this.form.companyCity = ''
                this.cityList = []

                const length = this.standInfos.standInfo.province_city.length
                for (var i = 0; i < length; i++) {
                    if (this.form.companyProvince == this.standInfos.standInfo.province_city[i]) {
                        this.cityList.splice(1, 0, this.standInfos.standInfo.city[i])
                    }
                }
            }
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
            this.$confirm('确定要删除该用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delData.deleteId = row.studentId;
                deleteEmplInfo(row.studentId).then(() => {
                    this.$message.success('删除成功');
                    this.getAllEmplInfoByPageList();
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
            this.select_check();
            this.form = JSON.parse(JSON.stringify(row));
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
                this.standInfos.standInfo.province_city = this.standInfos.standInfo.province

                // 过滤省份重复
                const length = this.standInfos.standInfo.province.length
                for (var i = 0; i < length; i++) {
                    if (this.standInfos.standInfo.province[i] != this.standInfos.standInfo.province[i + 1]) {
                        this.provinceList.splice(1, 0, this.standInfos.standInfo.province[i])
                    }
                }
            })
        },
        // 获取当前页用户数据和总人数
        getAllEmplInfoByPageList() {
            this.pageData.pageSize = 20;    // 恢复默认页面大小
            getAllEmplInfoByPage({ params: this.pageData }).then(({ data }) => {
                this.tableData = data.data1;    // 分页才是data1
                this.total = data.total;
            })
        },
        // 查找
        getSearchList() {
            if (this.userForm.keyword == '') {
                this.$message.error('请输入关键字');
                return;
            }
            getEmplInfoBySearch({ params: this.userForm }).then(({ data }) => {
                this.tableData = data.data;
                this.total = data.total;
                this.pageData.pageSize = this.total;    // 结果显示在一页
                this.$message.success('共搜索到' + data.total + '条结果');
            })
        },
        // 返回
        backList() {
            this.getAllEmplInfoByPageList()
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
        // 显示全部
        showAll() {
            this.userForm.keyword = '';
            getEmplInfoBySearch({ params: this.userForm }).then(({ data }) => {
                this.tableData = data.data;
                this.total = data.total;
                this.pageData.pageNum = 1;  // 结果显示在一页
                this.pageData.pageSize = this.total;
            })
            this.$message.success('已在本页显示全部数据');
        },
        // 选择页码
        handlePage(val) {
            this.pageData.pageNum = val;
            this.getAllEmplInfoByPageList();
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
                let deleteIds = selectedRows.map(row => row.studentId);
                // 发送删除请求
                deleteAllEmplInfo(deleteIds).then(() => {
                    this.$message.success('批量删除成功');
                    // 重新加载数据
                    this.getAllEmplInfoByPageList();
                }).catch(() => {
                    this.$message.error('批量删除失败');
                });
            }).catch(() => {
                this.$message.info('已取消批量删除');
            });
        }
    },
    mounted() {
        this.getAllEmplInfoByPageList();
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

            ::v-deep li:not(.disabled).active {
                background-color: #aadd99;
            }

        }
    }
}
</style>