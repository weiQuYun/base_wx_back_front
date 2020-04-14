<template >
    <drag-box dragCfg="dragCfg" style="border: #409EFF 1px solid">
            name<el-button size="small">NAME</el-button>

    </drag-box>
</template>

<script>
import DragBox from "../components/dragBox";
export default {
    name:"welcome",
    components: {Pagination, DragBox},
    data(){
        return {
            dragCfg:{
                left:'500px',top:'500px'
            }
        }
    }
}
</script>
