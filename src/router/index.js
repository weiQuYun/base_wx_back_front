import Vue from 'vue'
import VueRouter from 'vue-router'
const Login   = () => import( '@/page/login.vue');
const Home    = () => import( '@/page/home.vue');
const welcome = () => import( '@/page/welcome.vue');
const User   = () => import( '@/page/system/user.vue');
const Menber = () => import( '@/page/system/menber.vue');
const Cates  = () => import('@/page/shop/cates.vue');
// const Cate   = () => import('@/page/system/cate.vue');
// const Params   = () => import( '@/page/system/params.vue');
// const List   = () => import( '@/page/system/list.vue');
const Test   = () => import( '../page/test.vue');
const Order   = () => import( '@/page/shop/order.vue');
// const Report   = () => import( '@/page/system/report.vue');


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect:"/welcome",
    children:[
      {
        path:'/welcome',
        component:welcome
      },
      {
        path:'/users',
        component:User
      },
      {
        path:'/menbers',
        component:Menber
      },
      {
        path:'/test',
        component:Test
      },
      // {
      //   path:'/categories',
      //   component:Cate
      // }
      // {
      //   path:'/params',
      //   component:Params
      // },
      // {
      //   path:'/goods',
      //   component:List
      // },
      // {
      //   path:'/goods/add',
      //   component:Add
      // },
      {
        path:'/orders',
        component:Order
      },
      {
        path:'/cates',
        component:Cates
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//挂在路由导航守卫
//1.将登录成功之后的token,保存到客户端的sessionStorage中
//2.项目中除了登录之外的其他有权限的接口，通过token来身份验证访问；
//3.token值应该只在当前网站打开期间生效，所以保存在sessionStorage(会话期间)中合适.localStorage(持久性的)
router.beforeEach((to,from,next)=>{
//   //to 将要访问的路径,from 从哪个路劲跳转过来,next()放行 next('/login') 强制跳转
  if(to.path === '/login') return next();
  const token = sessionStorage.getItem('token');
  if(!token) return next('/login');
  next();
})

export default router
