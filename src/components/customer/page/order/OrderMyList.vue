<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>我的下单</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">创建订单</el-button>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-col :span="10">
                                <el-form-item label="订单号">
                                    <span>{{ props.row.orderCustomer.send_name }}</span>
                                </el-form-item>
                                <el-form-item label="发货人">
                                    <span>{{ props.row.orderCustomer.send_name }}</span>
                                </el-form-item>
                                <el-form-item label="发货人手机号">
                                    <span>{{ props.row.orderCustomer.send_phone }}</span>
                                </el-form-item>
                                <el-form-item label="发货人地址">
                                    <span>{{ props.row.orderCustomer.send_addr }}</span>
                                </el-form-item>
                                <el-form-item label="发货人详细地址">
                                    <span>{{ props.row.orderCustomer.send_addr_info }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="发货人">
                                    <span>{{ props.row.orderCustomer.recive_name }}</span>
                                </el-form-item>
                                <el-form-item label="发货人手机号">
                                    <span>{{ props.row.orderCustomer.recive_phone }}</span>
                                </el-form-item>
                                <el-form-item label="发货人地址">
                                    <span>{{ props.row.orderCustomer.recive_addr }}</span>
                                </el-form-item>
                                <el-form-item label="发货人详细地址">
                                    <span>{{ props.row.orderCustomer.recive_addr_info }}</span>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="订单号">
                    <template scope="scope">
                        <el-button type="text" @click="onOrder(scope.row.orderCustomer.id)">{{ scope.row.orderCustomer.order_number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="发货人" min-width="100">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.orderCustomer.send_name}}</p>
                            <p>手机：{{scope.row.orderCustomer.send_phone}}</p>
                            <p>地址：{{scope.row.orderCustomer.send_addr}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收货人" min-width="100">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.orderCustomer.recive_name}}</p>
                            <p>手机：{{scope.row.orderCustomer.recive_phone}}</p>
                            <p>地址：{{scope.row.orderCustomer.recive_addr}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="下单时间">
                    <template scope="scope">
                        <p>{{scope.row.orderCustomer.time | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="订单状态" width="100">
                    <template scope="scope">
                        <el-tag type="gray" v-show="scope.row.orderCustomer.status ==='ORDER_PLACE'">未处理</el-tag>
                        <el-tag type="primary" v-show="scope.row.orderCustomer.status ==='ORDER_TAKING'">运输中</el-tag>
                        <el-tag type="success" v-show="scope.row.orderCustomer.status ==='ORDER_SIGN'">已签收</el-tag>
                        <el-tag type="danger" v-show="scope.row.orderCustomer.status ==='ORDER_REFUSE'">已拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-row v-if="scope.row.orderCustomer.status ==='ORDER_PLACE' || scope.row.orderCustomer.status ==='ORDER_CANEL'"  type="flex" justify="space-around">
                            <!--<el-button>编辑</el-button>-->
                            <el-button type="danger" @click="deleteData(scope.row.orderCustomer.id)">删除 </el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row type="flex" justify="space-around" style="margin-top: 30px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-row>
    </el-row>
</template>

<script>
    import { getOrderListByToken,deleteCustomerOrder } from '@/api/order';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token: localStorage.getItem('customer_token')
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getOrderListByToken(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            deleteData(id) {
                this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCustomerOrder(id).then(response=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                });
            },
            createData(){
                this.$router.push('/customer/home/order_my/order_add');
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            },
            onOrder(id){
                this.$router.push({
                    path:'/customer/home/order_info',
                    query:{
                        id: id
                    },
                });
            }
        },
        filters: {
            time: function (value) {
                return parseTime(value);
            }
        }
    };
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 150px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
