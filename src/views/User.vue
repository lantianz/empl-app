<template>
    <el-row style="height: 98%;">
        <el-col :span="8" style="padding-right: 10px; height: 100%;">
            <el-card class="box-card" style="height: 100%;">
                <div class="admin-info">
                    <img src="../assets/images/avatar.png" alt="">
                    <div style="text-align: center;">
                        <p class="role-name">{{ adminInfo.role.roleName }}</p>
                        <p class="role-desc">{{ adminInfo.role.roleDesc }}</p>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="admin-introduce">
                    <h3>权限介绍：</h3>
                    <p>总管理员可以对各院系毕业生进行相关汇总与统计，以及对院系工作负责人进行管理。</p>
                    <p>各院系就业工作负责人只能对所在院系的毕业生进行相关汇总与统计。</p>
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
                        {{ adminInfo.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            手机号
                        </template>
                        {{ adminInfo.phone }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-message"></i>
                            邮箱
                        </template>
                        {{ adminInfo.email }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-bank-card"></i>
                            账号
                        </template>
                        {{ adminInfo.username }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-suitcase"></i>
                            工号
                        </template>
                        {{ adminInfo.jobId }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            权限
                        </template>
                        <el-tag type="success">{{ adminInfo.role.roleDesc }}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <el-card class="box-card" style="margin-top: 10px; height: 64%;">
                <div slot="header" class="clearfix">
                    <h4 style="color:#666666;"><i class="el-icon-star-on"></i>链接</h4>
                </div>
                <div class="link" v-for="(item, index) in linkList.name" :key="item.name">
                    <span>{{ item }}：</span>
                    <el-link :href=linkList.link[index] target="_blank" type="success">{{ linkList.link[index]
                        }}</el-link><br>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            linkList: {
                link: ['https://www.baidu.com',
                    'https://www.bilibili.com',
                    'https://sso-443.webvpn.gxnu.edu.cn',
                    'http://www.dean.gxnu.edu.cn/',
                    'https://co2.cnki.net/'],
                name: ['百度',
                    '哔哩哔哩',
                    '广西师大WebVPN',
                    '广西师大教务处',
                    '广西师大本科毕业论文管理']
            }
        }
    },
    computed: {
        adminInfo() {
            return this.$store.state.admin.info || JSON.parse(localStorage.getItem('info'));
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

.admin-introduce {
    h3 {
        color: #666666;
    }

    p {
        margin-top: 10px;
        color: #999999;
        text-indent: 2em;
    }
}

.link {
    span {
        font-size: 14px;
        color: #666666;
    }
}
</style>