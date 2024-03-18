<template>
    <div>
        <el-header>
            <h1>院系就业工作负责人审核</h1>
        </el-header>
        <el-main>
            <el-table stripe border :data="tableData" style="width: 100%">
                <el-table-column type="index" width="30px" label="">
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
                        <el-tag v-if="scope.row.status === 'pending'" type="info">待审核</el-tag>
                        <el-tag v-else-if="scope.row.status === 'approved'" type="success">已通过</el-tag>
                        <el-tag v-else-if="scope.row.status === 'rejected'" type="warning">已拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="150px" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="audit(scope.row, 'approve')" type="success" size="mini">通过</el-button>
                        <el-button @click="audit(scope.row, 'reject')" type="danger" size="mini">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 审核意见表单 -->
            <el-dialog :visible.sync="auditDialogVisible" width="50%">
                <el-form :model="auditForm" ref="auditForm" label-width="120px">
                    <el-form-item label="审核意见">
                        <el-input v-model="auditForm.auditComment"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="auditDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAudit">确 定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            auditDialogVisible: false,
            auditForm: {
                auditComment: '',
            },
        };
    },
    methods: {
        audit(item, action) {
            this.auditDialogVisible = true;
            this.auditForm.tableDataId = item.id; // 假设每个毕业生信息有一个唯一的id  
            this.auditForm.auditAction = action; // 记录操作是通过还是拒绝  
        },
        submitAudit() {
        },
    },
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
</style>