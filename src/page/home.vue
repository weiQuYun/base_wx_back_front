<template>
<el-container class="home-container">
    <!-- 头部 -->
    <el-header>
            <div>
                <img src="../assets/desk.png" alt="成都微趣云网络科技有限公司">
                <span>后台管理系统</span>
            </div>
            <el-button type="primary" class="el-icon-switch-button" @click="logOut" size="small"></el-button>
    </el-header>
  <el-container>
        <el-aside :width="isCollapse? '60px':'200px'">
           <!-- 自定伸缩功能 -->
           <div  width="100%" style="background-color: #ccc;border-bottom: white solid 1px ">
               <el-button  v-if="isCollapse" class="el-icon-s-unfold"   @click="toggleCollapse" style="background-color:#ccc;border: #ccc "/>
               <el-button  v-if="!isCollapse" class="el-icon-s-fold"   @click="toggleCollapse" style="background-color:#ccc;border: #ccc "/>
           </div>
           <el-menu  :default-active="activePath" :router="true" :collapse-transition="false" :collapse="isCollapse" :unique-opened="true" background-color="#ccc" text-color="#fff" active-text-color="#409EFF">
                <!-- 第一级菜单 -->
                            <!-- ↓1.点击展开所有都会展开,绑定唯一值 2.是string类型 -->
                <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
                      <!-- template包裹的是整个一级标题 -->
                      <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                      </template>
                      <!-- submenu里面加submenu一直添加级数 -->
                      <!-- menu-item只是选项,可以是submenu同级别,也可是它的子级 -->
                      <el-menu-item
                        v-for="subItem in item.children"
                            :index="'/' + subItem.path"
                            :key="subItem.id"
                            @click=" handleNavState('/' + subItem.path) " v-if="userType===subItem.role" >
                              <i :class="iconsObj[subItem.id]"></i>
                              <span>{{subItem.authName}}</span>
                      </el-menu-item>
                </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="padding: 10px">
          <router-view style="height:100%"></router-view>
        </el-main>
  </el-container>

</el-container>
</template>

<script>
export default {
  data(){
    return{
        menulist:[{"id":1,"authName":"菜单","path":"","children":[
                {"id":2,"authName":"商品管理","path":"shop","order":1,"role":'2'},
                {"id":3,"authName":"订单管理","path":"orders","order":2,"role":'2'},
                {"id":4,"authName":"会员管理","path":"menbers","order":3,"role":'1'},
                {"id":5,"authName":"商品分类管理","path":"cates","order":3,"role":'1'},
                {"id":6,"authName":"店铺管理","path":"users","order":3,"role":'1'},
                {"id":7,"authName":"测试页面","path":"test","order":3,"role":'1'}],
                "order":2}],
        iconsObj:{
          '1':"el-icon-menu",
          '2':"el-icon-s-goods",
          '3':"el-icon-s-order",
          '5':"el-icon-user-solid",
          '4':"el-icon-s-grid",
          '6':"el-icon-s-shop",
        },
        isCollapse:false, //伸缩
        activePath:'',
        userType: JSON.parse(sessionStorage.getItem("userType"))
    }
  },
  created(){
    //this.getMenuList();
    this.activePath = sessionStorage.getItem('activePath')||'/users';
  },
  methods: {
    logOut() {
      // sessionStorage.clear("/token");
      let req = this.$store.getters.getReq;
      this.$axios.post('/api/wqy/logout',{params:{'userId':JSON.parse(sessionStorage.getItem("userId"))}}).then(data=>{
          if(data.code==="200"){
              this.$router.push("/login");
              return this.$notify({ message: '退出成功',duration:1500});
          }
      }).catch(error=>{
          return this.$notify({ message: '退出失败',duration:1500});
      });

    },
    getMenuList(){
      this.$axios.get('menus').then(res=>{
           console.log(res);
           if(res.data.meta.status !==200){
                 return this.$notify({ message: 'menulist请求失败'});
           }
           this.menulist = res.data.data;
           console.log(this.menulist);
      })
    },
    toggleCollapse(){
        this.isCollapse = !this.isCollapse;
    },
    handleNavState(activePath){
        this.activePath = activePath;
        sessionStorage.setItem('activePath',activePath);
    }

  }
};
</script>
<style lang="scss" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background: #eee;
    display: flex;
    justify-content: space-between;
    img{
        width: 70px;
        height: 70px;
        vertical-align: middle;
    }
    button{
        width: 50px;
        height: 50px;
        line-height: 20px;
    }
}
.el-aside{
    div{
        width: 200px;
    }
    background: #eeeeee69;
    .el-menu{
        border-right: none;
    }
}
.iconfont{
  margin-right: 10px;
}

.toggle-button{
  background-color: #FFF;
  font-size: 10px;
  line-height: 24px;
  color: blue;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
