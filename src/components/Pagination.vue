<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="totalPage"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRow"
      :hide-on-single-page="show"
    ></el-pagination>
</template>

<script>

export default {
  name: 'Pagination',
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      // this.pageSize = val ;
      // this.$parent.getData();
      this.$emit('sizeChange', val);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      // this.pageIndex = val ;
      // this.$parent.'${this.getData}';
      this.$emit('currentChange', val);
    }
  },
  props: {
    show:{
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: ()=>{}
    },
    pageIndex: {
      type: Number,
      default: ()=>{}
    },
    totalRow: {
      type: Number,
      default: ()=>{}
    },
    totalPage: {
      type: Number,
      default: ()=>{}
    }
  }
}
</script>

<style scoped>

</style>
