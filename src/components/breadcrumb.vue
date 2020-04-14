<template>
    <!--面包屑-->
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
            <el-breadcrumb-item v-for="item in breadcrumb " :to="{ path: item.path }" :key="item.name">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "breadcrumb",
        props: {
            breadcrumb: {
                type: Array,
                default: ()=>[
                    {path: '/home', name: "首页"}
                    ]
            }
        }

    }
</script>

<style lang="scss" scoped>
    .breadcrumb{
        margin-top:10px;
        line-height: 20px;
    }
</style>