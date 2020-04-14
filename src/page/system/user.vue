<template>
    <!--店铺管理-->
        <div class="ces-main" >
            <!-- 面包屑导航 -->
            <Breadcrumb :breadcrumb="breadcrumb"></Breadcrumb>
            <search-form name="searchForm"
                    size='mini'
                    labelWidth = '80px'
                    :searchData = "searchData"
                    :searchForm = "searchForm"
                    :searchHandle="searchHandle"></search-form>
            <drag-box dragCfg="dragCfg">
                <Pagination :show="show"
                            :pageSize="pagination.pageSize"
                            :pageIndex="pagination.pageIndex"
                            :totalRow="pagination.totalRow"
                            :totalPage="pagination.totalPage"
                            @sizeChange="sizeChange"
                            @currentChange="currentChange"></Pagination>
            </drag-box>
            <ces-table
                    size='mini'
                    :isSelection='true'
                    :loading='true'
                    :isIndex='true'
                    :isPagination='true'
                    :isHandle='true'
                    :tableData='tableData'
                    :tableCols='tableCols'
                    :tableHandles='tableHandles'>

            </ces-table>


            <!-- 弹窗 -->
            <!--<ces-modal width='60%' style="background-color: #969896;opacity:0.7;"-->
                       <!--:that='that' :modalCfg='modalCfg'  >-->
                <ces-edit ref='cesEdit' :editCfg='editCfg' ></ces-edit>
            <!--</ces-modal>-->
            <!--<backToTop >回到顶部</backToTop>-->
        </div>
</template>
<script>
import SearchForm from '../../components/searchForm'
import cesTable from '../../components/Table'
import cesModal from '../../components/modal'
import cesEdit from '../../components/editForm'
import Pagination  from "../../components/Pagination.vue";
import backToTop  from "../../components/backToTop/backToTop.vue";
import Breadcrumb  from "../../components/breadcrumb.vue";
import DragBox from "../../components/dragBox";
export default {
    components:{
        cesTable,
        SearchForm,
        cesModal,
        cesEdit,
        Pagination,
        backToTop,
        Breadcrumb,
        DragBox
    },
    data(){
        let isActive=[{label:'未禁用',value:'0'},{label:'已禁用',value:'1'}]
        let activeProps={label:'label',value:'value'}
        return {
            breadcrumb:[
                {path:'/home',name:"首页"},
                {path:'',name:"菜单"},
                {path:'',name:"店铺管理"}
            ],
            //搜索
            searchData:{
                userName:null,
                isActive:null
            },
            searchForm:[
                {type:'Input',label:'用户名',prop:'userName',width:'180px',placeholder:'请输入用户名...'},
                {type:'Select',label:'状态',prop:'active',width:'180px',options:isActive,props:activeProps,change:row=>'',placeholder:'请选择状态...'}
            ],
            searchHandle:[
                {label:'查询',type:'primary',handle:()=> this.getData()},
                {label:'重置',type:'primary',handle:()=>this.resetForm("searchForm")}
            ],
            // 表格
            tableData:[],
            tableCols:[
                {label:'用户名',prop:'userName'},
                {label:'角色',prop:'roleId'},
                {label:'密码',prop:'password'},
                {label:'是否禁用',prop:'active'},
                {label:'地址',prop:'address'},
                {label: '操作', type:'Button',btnList:[
                        {type:'primary',label:'编辑',handle:row=>this.openEdit(row)},
                        {type:'danger',label:'删除',handle:row=>''}
                    ]}
            ],
            tableHandles:[
                {label:'新增',type:'primary',handle:row=>this.openEdit()}
            ],
            dragCfg:{
                left:'100px',top:'0px'
            },
            pagination:{
                pageSize:10,pageIndex:1,totalRow:0,totalPage:0
            },
            that:this,
            editCfg: {
                show: false,
                size: 'mini',
                labelWidth: '100px',
                columns: [
                    {type: "input", label: "用户名", prop: "userName", disabled: false, width: "180px"},
                    {type: "input", label: "角色", prop: "roleId", disabled: false, width: "180px"},
                    {type: "input", label: "密码", prop: "password", disabled: false, width: "180px"},
                    {type: "select", label: "是否禁用", prop: "active", disabled: false, width: "180px",
                        options:[
                            {label:'是',value:'1'},{label:'否',value:'0'}
                            ]},
                    {type: "input", label: "地址", prop: "address", disabled: false, width: "180px"}
                ],
                editData:{},
                editRules:{},
                close:()=>this.close(),
                button:[
                    {type:"primary",label:'提交',width:'100px',handle:row=>this.update(row)},
                    {type:"primary",label:'取消',width:'100px',handle:row=>this.close()}
                ]
            },
            show: false,
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            let that = this;
            // console.log("访问前："+JSON.stringify(this.pagination))
            // let url = 'pageIndex='+this.pagination.pageIndex+'&pageSize='+this.pagination.pageSize+'&userName='+this.searchData.userName+'&isActive='+this.searchData.isActive;
            // this.tableData.clear();
            this.$get('/api/wqy/user/page/'+this.pagination.pageIndex+'/'+this.pagination.pageSize).then(data=>{
                // console.log("获取值："+JSON.stringify(data));
                this.pagination.pageSize = data.pageSize;
                this.pagination.pageIndex = data.pageIndex;
                this.pagination.totalRow = data.totalRow;
                this.pagination.totalPage = data.totalPage;
                data.data.forEach(item=>{
                    if(item.active===true){
                        item.active = '是'
                    }else{
                        item.active = '否'
                    }
                })
                this.tableData =data.data;
                this.show = false;
            })
        },
        //编辑
        openEdit(row) {
            console.log("触发开始:"+JSON.stringify(row))
            if(null===row){
                this.editCfg.editData = {
                    userName:"",roleId:"",password:'',active:"",address:""
                }
                this.editCfg.button.forEach(item=>{
                    if("提交"===item.label){
                        item.handle =this.insert(row);
                    }
                })
            }else{
                this.editCfg.editData = row;
                this.editCfg.button.forEach(item=>{
                    if("提交"===item.label){
                        item.handle =this.update(row);
                    }
                })
            }
            this.editCfg.show= true;
        },
        close(){
            // console.log("触发关闭")
            this.editCfg.show= false;
        },
        update(row){
            this.$put('/api/wqy/user',row).then(data=>{
                this.$notify({ message: '提交成功',duration:1500});
            })
            this.getData();
            this.editCfg.show= false;
        },
        disabled(object){
            return object!==null
        },
        insert(row){
            this.$post('/api/wqy/user',row).then(data=>{
                this.$notify({ message: '提交成功',duration:1500});
            })
            this.getData();
            this.editCfg.show= false;
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        sizeChange (val) {
            this.pagination.pageSize = val;
            // console.log("改变页面大小")
            this.getData();
        },
        currentChange (val) {
            this.pagination.pageIndex = val;
            // console.log("改变页面索引")
            this.getData();
        },
    },
}
</script>
<style lang="scss" scoped>

</style>
