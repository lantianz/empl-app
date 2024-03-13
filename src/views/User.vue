<template>
    <el-row style="height: 98%;">
        <el-col :span="8" style="padding-right: 10px; height: 100%;">
            <el-card class="box-card" style="height: 100%;">
                <div class="admin-info">
                    <img src="../assets/images/avatar.png" alt="">
                    <div style="text-align: center;">
                        <p class="role-name">admin</p>
                        <p class="role-desc">超级管理员</p>
                    </div>
                </div>
                <el-divider></el-divider>
                <div>
                    
                </div>
            </el-card>
        </el-col>
        <el-col :span="16" style="height: 100%;">
            <el-card class="box-card" style="height: 34%; max-height: 49%;">
                <el-descriptions class="margin-top" title="个人信息" :column="3" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            姓名
                        </template>
                        lantianzhi
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            手机号
                        </template>
                        18100000000
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            邮箱
                        </template>
                        325325ewtwe@zzi.cn
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            权限
                        </template>
                        <el-tag type="success">超级管理员</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            联系地址
                        </template>
                        广西桂林市雁山区雁中路1号广西师范大学
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="box-card" style="margin-top: 10px; height: 64%;">

            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
<style lang="less" scoped>
.admin-info {
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
        width: 250px;
        height: 250px;
        border-radius: 50%;
    }

    .role-name {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .role-desc {
        color: #999999;
    }
}
</style>