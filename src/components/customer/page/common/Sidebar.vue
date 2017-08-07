<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: '/customer/home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '车队管理',
                        subs: [
                            {
                                index: '/customer/home/driver',
                                title: '司机管理'
                            },
                            {
                                index: '/customer/home/car',
                                title: '车辆管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '/customer/home/order/add',
                        title: '创建运单',
                    },
                    {
                        icon: 'el-icon-document',
                        index: '/customer/home/order',
                        title: '运单处理',
                    },
                    {
                        icon: 'el-icon-picture',
                        index: '/customer/home/profit',
                        title: '财务管理'
                    },
                    {
                        icon: 'el-icon-date',
                        title: '账户管理',
                        subs: [
                            {
                                icon: 'el-icon-star-on',
                                index: '/customer/home/account',
                                title: '个人中心'
                            },
                            {
                                icon: 'el-icon-plus',
                                index: '/customer/home/recharge',
                                title: '账户充值'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-plus',
                        index: '/customer/home/system/config',
                        title: '系统设置'
                    }
                ]
            }
        },
        computed:{
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
