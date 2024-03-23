<template>
    <div>
        <el-header>
            <h1>院系就业工作负责人审核</h1>
        </el-header>
        <el-main>
            <el-table stripe border :data="tableData" style="width: 100%"
                :default-sort="{ prop: 'status', order: 'descending' }">
                <el-table-column type="index" width="30px" label="">
                </el-table-column>
                <el-table-column prop="studentId" width="120px" sortable label="学号">
                </el-table-column>
                <el-table-column prop="companyName" label="签约单位全称">
                </el-table-column>
                <el-table-column prop="companyType" label="签约单位类别">
                </el-table-column>
                <el-table-column prop="companyProvince" label="签约单位所在省">
                </el-table-column>
                <el-table-column prop="companyCity" label="签约单位所在市">
                </el-table-column>
                <el-table-column prop="signDate" width="105px" label="签约日期">
                </el-table-column>
                <el-table-column prop="postgraduate" width="50px" label="读研">
                </el-table-column>
                <el-table-column prop="emplOntime" width="80px" label="按时就业">
                </el-table-column>
                <el-table-column prop="emplWithintwo" width="120px" label="毕业两年内就业">
                </el-table-column>
                <el-table-column prop="status" label="审核状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 'waiting'" type="info">待审核</el-tag>
                        <el-tag v-else-if="scope.row.status === 'rejected'" type="warning">已拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="150px" label="操作">
                    <template v-if="scope.row.status === 'waiting'" slot-scope="scope">
                        <el-button @click="idea(scope.row, 'approve')" type="success" size="mini">通过</el-button>
                        <el-button @click="idea(scope.row, 'reject')" type="danger" size="mini">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 审核意见表单 -->
            <el-dialog title="意见确认" :visible.sync="ideaDialogVisible" width="300px">
                <el-form v-if="modalType === 0" :model="ideaForm" ref="ideaForm" label-width="120px">
                    <el-input v-model="ideaForm.ideaComment" type="textarea" placeholder="请输入拒绝意见"></el-input>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="ideaDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
import { getCheck, addCheck, deleteCheck, editCheck, addEmplInfo } from '../api';
export default {
    data() {
        return {
            tableData: [],
            info: '',
            ideaDialogVisible: false,
            modalType: 0, // 0表示拒绝，1表示通过
            ideaForm: {
                ideaComment: '',
            },
        };
    },
    methods: {
        getData() {
            getCheck().then(({ data }) => {
                this.tableData = data.data;
            })
        },
        idea(item, action) {
            this.info = item;
            if (action === 'approve') {
                this.modalType = 1;
            } else {
                this.modalType = 0;
            }
            this.ideaDialogVisible = true;
        },
        submit() {
            if (this.modalType === 0) {
                if (this.ideaForm.ideaComment) {
                    this.info.ideaComment = "已拒绝，未说明原因";
                } else {
                    this.info.ideaComment = this.ideaForm.ideaComment;
                }
                this.info.status = 'rejected';
                editCheck(this.info).then(res => {
                    this.$message.success('已拒绝');
                    this.getData();
                })
            } else {
                let { status, ideaComment, ...obj } = this.info;
                addEmplInfo(obj).then(res => {
                    deleteCheck(obj.studentId).then(res => {
                        this.$message.success('已通过');
                        this.getData();
                    })
                })
            }
            this.ideaDialogVisible = false;
        }
    },
    mounted() {
        this.getData();
    }
};
</script>

<style lang="less" scoped>
.el-header {
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;

    h1 {
        color: #666666;
        font-size: 18px;
    }
}

.el-main {
    background-color: #fff;
    border-radius: 8px;
}

.dialog-footer {
    text-align: right;
}

.el-textarea {
    height: 200px;

    ::v-deep .el-textarea__inner {
        height: 100%;
    }
}
</style>