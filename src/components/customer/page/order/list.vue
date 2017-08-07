<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>运单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()" icon="plus">创建新运单</el-button>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-col :span="10">
                                <el-form-item label="订单号">
                                    <span>{{ props.row.orderCustomer.order_number }}</span>
                                </el-form-item>
                                <el-form-item label="下单时间">
                                    <span>{{ props.row.orderCustomer.time | time }}</span>
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
                                <el-form-item label="发货时间">
                                    <span>{{ props.row.orderCustomer.send_time |time }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="收货人">
                                    <span>{{ props.row.orderCustomer.recive_name }}</span>
                                </el-form-item>
                                <el-form-item label="收货人手机号">
                                    <span>{{ props.row.orderCustomer.recive_phone }}</span>
                                </el-form-item>
                                <el-form-item label="收货人地址">
                                    <span>{{ props.row.orderCustomer.recive_addr }}</span>
                                </el-form-item>
                                <el-form-item label="收货人详细地址">
                                    <span>{{ props.row.orderCustomer.recive_addr_info }}</span>
                                </el-form-item>
                                <el-form-item label="到达时间">
                                    <span>{{ props.row.orderCustomer.recive_time |time }}</span>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="订单号" width="180">
                    <template scope="scope">
                        <el-button type="text" @click="onOrder(scope.row.orderCustomer.id)">{{ scope.row.orderCustomer.order_number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="发货人" width="200">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.orderCustomer.send_name}}</p>
                            <p>手机：{{scope.row.orderCustomer.send_phone}}</p>
                            <p>地址：{{scope.row.orderCustomer.send_addr}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收货人" width="200">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.orderCustomer.recive_name}}</p>
                            <p>手机：{{scope.row.orderCustomer.recive_phone}}</p>
                            <p>地址：{{scope.row.orderCustomer.recive_addr}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="费用">
                    <template scope="scope"  width="100">
                        <p>运费：{{scope.row.orderCustomer.freight}} 元</p>
                        <p>保险：{{scope.row.orderCustomer.safes}} 元</p>
                        <p>合计：{{scope.row.orderCustomer.total}} 元</p>
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

                <el-table-column
                    label="合同" width="80">
                    <template scope="scope">
                        <el-row v-if="scope.row.orderCustomer.status =='ORDER_TAKING' || scope.row.orderCustomer.status =='ORDER_SIGN'"  type="flex" justify="space-around">
                            <el-button type="info" icon="plus" size="small" @click="contract(scope.row.orderCustomer.id)">查看</el-button>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-row v-if="scope.row.orderCustomer.status ==='ORDER_PLACE'"  type="flex" justify="space-around">
                            <el-button-group>
                                <el-button type="info" icon="plus" size="small" @click="taking(scope.row.orderCustomer.id)">派车</el-button>
                                <el-button type="warning" icon="delete" size="small" @click="refuse(scope.row.orderCustomer.id)">拒绝 </el-button>
                            </el-button-group>
                        </el-row>
                        <el-row v-if="scope.row.orderCustomer.status ==='ORDER_TAKING'"  type="flex" justify="space-around">
                            <el-button type="success" size="small" icon="circle-check" @click="sign(scope.row.orderCustomer.id)">签收</el-button>
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


        <el-dialog title="签收订单" :visible.sync="dialogFormVisible">
            <p>请上传单据照片：</p>
            <el-row type="flex" justify="center">
                <el-upload
                    class="avatar-uploader"
                    action="http://upload-z2.qiniu.com"
                    :data="uploadToken"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-progress="progressUpload">
                    <img v-if="signForm.order_img" :src="signForm.order_img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-row>
            <el-row type="flex" justify="center" style="margin-top: 10px">
                <el-col :span="12">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="imagePercente"></el-progress>

                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="signSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import { getOrderList,refuseCustomerOrder,addSignOrder } from '@/api/order';
    import { getUploadToken } from '@/api/util.js';
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
                    token:localStorage.getItem('customer_token')
                },
                refuseForm:{
                    token:localStorage.getItem('customer_token'),
                    fk_order_customer_id:''
                },
                signForm:{
                    token:localStorage.getItem('customer_token'),
                    fk_order_customer_id:'',
                    order_img:''
                },
                dialogFormVisible:false,
                imagePercente: 0,
                uploadToken: {
                    token:''
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getOrderList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
                getUploadToken().then(response => {
                    this.uploadToken.token = response.data;
                });
            },
            createData(){
                this.$router.push('/customer/home/order/add');
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
                    path:'/customer/home/order/info',
                    query:{
                        id: id
                    },
                });
            },
            taking(id){
                this.$router.push({
                    path:'/customer/home/order/taking',
                    query:{
                        id: id
                    },
                });
            },
            contract(id){
                this.$router.push({
                    path:'/customer/home/order/contract',
                    query:{
                        id: id
                    },
                });
            },
            refuse(id) {
                this.$confirm('此操作将拒绝该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.refuseForm.fk_order_customer_id = id;
                    refuseCustomerOrder(this.refuseForm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '已经拒绝!'
                        });
                        this.fetchData();
                    });
                });
            },
            sign(id){
                this.signForm.fk_order_customer_id = id;
                this.dialogFormVisible = true;
                this.signForm.order_img = '';
                this.imagePercente = 0;
            },
            signSubmit(){
                this.dialogFormVisible = false;
                addSignOrder(this.signForm).then(response => {
                    this.$message({
                        type: 'success',
                        message: '签收成功!'
                    });
                    this.fetchData();
                });
            },
            handleAvatarSuccess(res, file) {
                this.signForm.order_img = 'http://otj3hc8no.bkt.clouddn.com/'+ res.key;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            progressUpload(event, file, fileList){
                console.log(event);
                console.log(file);
                this.imagePercente = event.percent;
            }

        },
        filters: {
            time: function (value) {
                return parseTime(value,"{y}年{m}月{d}日 {hh}:{mm}:{ss}");
            }
        }
    };
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 400px;
        width: 400px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 400px;
        height: 400px;
        display: block;
    }
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
