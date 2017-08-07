<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在操作，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order_manager' }">运单管理</el-breadcrumb-item>
            <el-breadcrumb-item>派车</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 30px" >
            <el-row type="flex" justify="center">
            <el-steps :space="300" :active="2" >
                <el-step title="下单" ></el-step>
                <el-step title="接单运输" ></el-step>
                <el-step title="签收" ></el-step>
            </el-steps>
            </el-row>

            <el-card class="box-card" style="margin-top: 30px">
                <el-form label-width="150px" >
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
                            <el-form-item label="配送方式" >
                                <p>{{order.orderCustomer.dispatching_type}}</p>
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

                </el-form>
            </el-card>

            <el-card class="box-card" style="margin-top: 30px">
                <el-form :model="taking" :rules="rules" ref="taking" label-width="150px" >
                    <el-input v-model="taking.fk_driver_id" type="hidden"></el-input>
                    <el-input v-model="taking.fk_car_id" type="hidden"></el-input>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="选择司机" prop="driver">
                                <el-input v-model="taking.driver" @focus="onSelectDriver"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="选择车辆" prop="car">
                                <el-input v-model="taking.car" @focus="onSelectCar"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="应收账款" prop="recive">
                                <el-input v-model="taking.recive" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="应付账款" prop="pay">
                                <el-input-number v-model="taking.pay"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('taking')" icon="upload">立即派车</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
        <my-car-choise @onselect="onSelectCarSubmit" :mtoken="mtoken" ref="myCarChoise"></my-car-choise>
        <my-driver-choise @onselect="onSelectDriverSubmit" :mtoken="mtoken" ref="myDriverChoise"></my-driver-choise>

    </el-row>
</template>
<script>
    import { getOrder, addTakingOrder } from '@/api/order';
    import { parseTime } from '@/utils/time';
    import MyCarChoise from "../../../../component/fleet/CarChoiseDialog.vue";
    import MyDriverChoise from "../../../../component/fleet/DriverChoiseDialog.vue";

    export default {
        components: {
            MyCarChoise,MyDriverChoise
        },
        data() {
            return {
                mtoken: localStorage.getItem('customer_token'),
                listLoading: false,
                order_id: this.$route.query.id,
                order: {},
                taking:{
                    token: localStorage.getItem('customer_token'),
                    fk_order_customer_id: this.$route.query.id,
                    fk_car_id:'',
                    fk_driver_id:'',
                    car:'',
                    driver:'',
                    recive:'',
                    pay:''
                },
                rules: {
                    car: [
                        {required: true, message: '请选择车辆'}
                    ],
                    driver: [
                        {required: true, message: '请选择司机'}
                    ],
                    recive: [
                        {required: true, message: '请填写应收款'}
                    ],
                    pay: [
                        {required: true, message: '请填写应付款'}
                    ]
                }
            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getOrder(this.order_id).then(response => {
                    this.order = response.data;
                    this.taking.recive = this.order.orderCustomer.total;
                    this.listLoading = false;
                });
            },
            onSelectDriver(){
                this.$refs.myDriverChoise.show();
            },
            onSelectCar(){
                this.$refs.myCarChoise.show();
            },
            onSelectDriverSubmit(row){
                this.taking.fk_driver_id = row.fleetDriver.id;
                this.taking.driver = row.fleetDriver.name +'('+row.fleetDriver.phone+')';
            },
            onSelectCarSubmit(row){
                this.taking.fk_car_id = row.fleetCar.id;
                this.taking.car = row.fleetCar.plate;
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addTakingOrder(this.taking).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '派车成功!'
                                });
                                this.$router.push('/customer/home/order');
                            },
                            error =>{
                                this.listLoading = false;
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
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


