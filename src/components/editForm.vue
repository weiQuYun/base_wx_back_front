<template>
    <el-dialog title="用户信息" :visible.sync="editCfg.show" :append-to-body="true" @before-close="editCfg.close()">
    <el-form ref='editForm' :size="editCfg.size" inline :label-width="editCfg.labelWidth" :model="editCfg.editData" :rules="editCfg.editRules">
        <el-form-item v-for='item in editCfg.columns' :label="item.label" :prop='item.prop' :key="item.label"  >
            <!-- 输入框 -->
            <el-input v-if="item.type==='input'" v-model="editCfg.editData[item.prop]"
                      @change="item.change && item.change(editCfg.editData[item.prop])"
                      :disabled="item.disabled"
                      :style="{width:item.width}"></el-input>
            <!-- 文本域 -->
            <el-input v-if="item.type==='textarea'" type="textarea"
                      :disabled="item.disabled "
                      @change="item.change && item.change(editCfg.editData[item.prop])"
                      v-model="editCfg.editData[item.prop]"  :style="{width:item.width}"></el-input>
            <!-- 下拉框 -->
            <el-select v-if="item.type==='select'" v-model="editCfg.editData[item.prop]"
                       @change="item.change && item.change(editCfg.editData[item.prop])"
                       :disabled="item.disabled ">
                <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
            </el-select>
            <!-- 单选 -->
            <el-radio-group v-if="item.type==='radio'" v-model="editCfg.editData[item.prop]"
                            @change="item.change && item.change(editCfg.editData[item.prop])"
                            :disabled="item.disabled ">
                <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
            </el-radio-group>
            <!-- 单选按钮 -->
            <el-radio-group v-if="item.type==='radioButton'" v-model="editCfg.editData[item.prop]"
                            @change="item.change && item.change(editCfg.editData[item.prop])"
                            :disabled="item.disabled ">
                <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group v-if="item.type==='checkbox'" v-model="editCfg.editData[item.prop]"
                               @change="item.change && item.change(editCfg.editData[item.prop])"
                               :disabled="item.disabled ">
                <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key='ch.value'>{{ch.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- 日期 -->
            <el-date-picker v-if="item.type==='date'" v-model="editCfg.editData[item.prop]"
                            @change="item.change && item.change(editCfg.editData[item.prop])"
                            :disabled="item.disabled "></el-date-picker>
            <!-- 时间 -->
            <el-time-select v-if="item.type==='time'" v-model="editCfg.editData[item.prop]" type=''
                            @change="item.change && item.change(editCfg.editData[item.prop])"
                            :disabled="item.disabled "></el-time-select>
            <!-- 日期时间 -->
            <el-date-picker v-if="item.type==='dateTime'" type='datetime' v-model="editCfg.editData[item.prop]"
                            @change="item.change && item.change(editCfg.editData[item.prop])"
                            :disabled="item.disabled "></el-date-picker>
            <!-- 滑块 -->
            <!-- <el-slider v-if="item.type==='Slider'" v-model="editCfg.editData[item.prop]"></el-slider> -->
            <!-- 开关 -->
            <el-switch v-if="item.type==='switch'" v-model="editCfg.editData[item.prop]"
                       @change="item.change && item.change(editCfg.editData[item.prop])"
                       :disabled="item.disabled "></el-switch>
        </el-form-item>
    </el-form>
        <center>
        <el-button v-for="(item,index) in editCfg.button" :key="item.name" @click="item.handle()" :type="item.type" size="small" :style="{marginLeft:index>0?item.width:'0px' }">{{item.label}}</el-button>
        </center>
    </el-dialog>
</template>

<script>
    export default {
        name: "editForm",
        props:{
            editCfg:{
                type:Object,
                default:()=>{}
            }
        },
        data () {
            return {
                that:this
            };
        },
        methods:{
            // getThat(){
            //     this.$emit('that',this)
            // }
        }
    }
</script>

<style scoped>

</style>