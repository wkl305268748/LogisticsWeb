<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在查询，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="url_from">返回</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 30px" >
            <el-row type="flex" justify="center">
            <el-steps :space="300" :active="steps.active" >
                <el-step title="下单" :description="steps.time1 | time"></el-step>
                <el-step title="接单运输" :description="steps.time2 | time"></el-step>
                <el-step title="签收" :description="steps.time3 | time"></el-step>
            </el-steps>
            </el-row>

            <el-card class="box-card" style="margin-top: 30px">
                <h4>订单信息：{{order.orderCustomer.order_number}}</h4>
                <el-form :model="order" label-width="150px" style="margin-top: 30px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="寄件人姓名">
                                <p>{{order.orderCustomer.send_name}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="寄件人手机号">
                                <p>{{order.orderCustomer.send_phone}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="寄件人地址" >
                                <p>{{order.orderCustomer.send_addr}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="寄件人详细地址">
                                <p>{{order.orderCustomer.send_addr_info}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="收件人姓名">
                                <p>{{order.orderCustomer.recive_name}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="收件人手机号">
                                <p>{{order.orderCustomer.recive_phone}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="收件人地址">
                                <p>{{order.orderCustomer.recive_addr}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收件人详细地址" >
                                <p>{{order.orderCustomer.recive_addr_info}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="预计发货日期" >
                                <p>{{order.orderCustomer.send_time | day}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="限时到达日期">
                                <p>{{order.orderCustomer.recive_time | day}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="配送方式" >
                                <p>{{order.orderCustomer.dispatching_type}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="下单时间" >
                                <p>{{order.orderCustomer.time | time}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="下单用户" >
                                <p v-if="order.user.type ==='admin'">{{order.user.username}}</p>
                                <p v-if="order.user.type ==='customer'">{{order.user.phone}}</p>
                                <p v-if="order.user.type ==='driver'">{{order.user.phone}}</p>
                                <el-tag type="warning" v-if="order.user.type ==='admin'">管理员</el-tag>
                                <el-tag type="primary" v-if="order.user.type ==='customer'">客户</el-tag>
                                <el-tag type="success" v-if="order.user.type ==='driver'">司机</el-tag>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="运费" >
                                <p>{{order.orderCustomer.freight}} 元</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保险" >
                                <p>{{order.orderCustomer.safes}} 元</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="合计" >
                        <p>{{order.orderCustomer.total}} 元</p>
                    </el-form-item>
                    <el-row>
                    <el-table
                        :data="order.orderGoods"
                        border
                        show-summary
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="货物名称">
                        </el-table-column>
                        <el-table-column
                            prop="weight"
                            label="货物重量(吨)">
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="货物尺寸">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            sortable
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="freight"
                            sortable
                            label="运费">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注">
                        </el-table-column>
                    </el-table>

                    </el-row>

                </el-form>
            </el-card>

            <el-card class="box-card" style="margin-top: 30px" v-if="order.orderCustomer.status == 'ORDER_TAKING' || order.orderCustomer.status == 'ORDER_SIGN'">
                <h4>派车信息</h4>
                <el-form :model="order" label-width="150px"  style="margin-top: 20px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="派车时间" >
                                <p>{{order.orderTaking.time | time}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="司机" >
                                <p>{{order.fleetDriver.name}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号" >
                                <p>{{order.fleetDriver.phone}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="车牌" >
                                <p>{{order.fleetCar.plate}}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="车辆类型" >
                                <p>{{order.fleetCar.type}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="合同" >
                        <el-button type="info" icon="plus" size="small" @click="contract(order.orderCustomer.id)">查看合同</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-card>

            <el-card class="box-card" style="margin-top: 30px" v-if="order.orderCustomer.status == 'ORDER_SIGN'">
                <h4>签收信息</h4>
                <el-form :model="order" label-width="150px"  style="margin-top: 20px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="签收时间" >
                                <p>{{order.orderSign.time | time}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="签收照片" >
                            <img :src="order.orderSign.order_img" width="500px"/>
                        </el-form-item>

                    </el-row>

                </el-form>
            </el-card>
        </el-row>

    </el-row>
</template>
<script>
    import {getOrder} from '@/api/order';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                listLoading: false,
                order_id: "",
                order: {},
                steps:{
                    active: 1,
                    time1:"",
                    time2:"",
                    time3:"",
                },
                url_from: {
                    path: localStorage.getItem('url_from')
                }
            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                this.order_id = this.$route.query.id;
                getOrder(this.order_id).then(response => {
                    this.order = response.data;
                    this.listLoading = false;


                    console.log(this.order.orderCustomer);
                    //步骤
                    if(this.order.orderCustomer.status == "ORDER_PLACE"){
                        this.steps.active = 1;
                        this.steps.time1 = this.order.orderCustomer.time;
                    }
                    if(this.order.orderCustomer.status == "ORDER_TAKING"){
                        this.steps.active = 2;
                        this.steps.time1 = this.order.orderCustomer.time;
                        this.steps.time2 = this.order.orderTaking.time;
                    }
                    if(this.order.orderCustomer.status == "ORDER_SIGN"){
                        this.steps.active = 3;
                        this.steps.time1 = this.order.orderCustomer.time;
                        this.steps.time2 = this.order.orderTaking.time;
                        this.steps.time3 = this.order.orderSign.time;
                    }
                });
            },
            contract(id){
                this.$router.push({
                    path:'/admin/home/order/contract/info',
                    query:{
                        id: id
                    },
                });
            },
        },
        filters: {
            time: function (value) {
                return parseTime(value);
            },
            day: function (value) {
                return parseTime(value,"{y}年{m}月{d}日");
            }
        }
    }
</script>


