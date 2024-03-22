<template>
    <div class="news-detail">
        <el-card class="box-card">
            <h1 class="title">{{ news.title }}</h1>
        </el-card>
        <el-card class="box-card">
            <p class="author">作者: {{ news.author }}</p>
            <p class="time">最后更新时间: {{ news.sendTime }}</p>
        </el-card>
        <el-card class="box-card">
            <div v-html="news.content" class="w-e-text"></div>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        newsData: Object
    },
    data() {
        return {
            news: this.newsData
        };
    },
    methods: {
    },
    watch: {
        newsData(val) {
            this.news = val
        }
    }
};
</script>

<style lang="less" scoped>
.news-detail {
    padding: 10px;

    .title {
        font-size: 24px;
        color: #050505;
        margin: 0;
    }

    .author {
        font-size: 16px;
        color: #333333;
        margin-bottom: 10px;
    }

    .time {
        font-size: 12px;
        color: #a6a6a6;
        margin-bottom: 20px;
    }
}
</style>