<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order_my' }">我的下单</el-breadcrumb-item>
            <el-breadcrumb-item>新建订单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

                <el-row>
                    <el-col :span="20">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="寄件人姓名" prop="send_name">
                                    <el-input v-model="ruleForm.send_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="寄件人手机号" prop="send_phone">
                                    <el-input v-model="ruleForm.send_phone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="寄件人地址" prop="send_addr_ex">
                                    <el-cascader :options="options" v-model="ruleForm.send_addr_ex"
                                                 style="width: 100%;"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="寄件人详细地址" prop="send_addr_info">
                                    <el-input type="textarea" v-model="ruleForm.send_addr_info"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收件人姓名" prop="recive_name">
                                    <el-input v-model="ruleForm.recive_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="收件人手机号" prop="recive_phone">
                                    <el-input v-model="ruleForm.recive_phone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收件人地址" prop="recive_addr_ex">
                                    <el-cascader :options="options" v-model="ruleForm.recive_addr_ex"
                                                 style="width: 100%;"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="收件人详细地址" prop="recive_addr_info">
                                    <el-input type="textarea" v-model="ruleForm.recive_addr_info"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="配送方式" prop="dispatching_type">
                            <el-radio-group v-model="ruleForm.dispatching_type">
                                <el-radio class="radio" label="配送"></el-radio>
                                <el-radio class="radio" label="自提"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="预计发货日期" prop="send_time_ex">
                                    <el-date-picker type="date" placeholder="选择日期"
                                                    v-model="ruleForm.send_time_ex"
                                                    format="yyyy年MM月dd日"
                                                    :editable="false"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="限时到达日期" prop="recive_time_ex">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.recive_time_ex" format="yyyy年MM月dd日" :editable="false"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-card class="box-card" style="margin: 50px">
                    <div slot="header">
                        <span style="line-height: 36px;">货物清单</span>
                        <el-button @click="dialogFormVisible = true" icon="plus" type="info" style="float: right;">
                            新增货物
                        </el-button>
                    </div>
                    <el-table
                        :data="ruleForm.goods"
                        border
                        :summary-method="getSummaries"
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
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button
                                    type="danger"
                                    @click="removeGoods(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

                <el-form-item label="运费总计（元）" prop="freight">
                    <el-input-number  v-model="ruleForm.freight"></el-input-number>
                </el-form-item>

                <el-form-item label="保险费用（元）" prop="safes">
                    <el-input-number  v-model="ruleForm.safes"></el-input-number>
                </el-form-item>

                <el-form-item label="合计金额">
                    <p style="font-size:25px">{{ruleForm.safes + ruleForm.freight}} 元</p>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" icon="upload">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form label-width="100px" :model="goodForm" :rules="goodRules" ref="goodForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="货物名称" prop="name">
                            <el-input v-model="goodForm.name" placeholder="货物名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="货物尺寸">
                            <el-input-number v-model="goodForm.size" placeholder="尺寸"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="货物重量">
                            <el-input-number v-model="goodForm.weight" placeholder="重量（吨）"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="数量" prop="number">
                            <el-input-number v-model="goodForm.number"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="运费（元）" prop="freight">
                            <el-input-number v-model="goodForm.freight" placeholder="运费"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="goodForm.remark" placeholder="备注" rows="5"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGoods('goodForm')">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
    import {regionData, CodeToText} from 'element-china-area-data'
    import {addCustomerOrder} from '@/api/order.js'
    import { parseTime } from '@/utils/time'

    export default {
        data() {
            return {
                CodeToText: CodeToText,
                options: regionData,
                dialogFormVisible: false,
                listLoading: false,
                goodForm:{
                    name: '',
                    size: 0,
                    weight: 0,
                    number: 0,
                    freight: 0,
                    remark: ''
                },
                goodRules:{
                    name: [
                        {required: true, message: '请输入货物名称'},
                    ],
                    number: [
                        {required: true, message: '数量不能为空'},
                    ],
                    freight: [
                        {required: true, message: '运费不能为空'},
                    ]
                },
                ruleForm: {
                    send_name: '',
                    send_phone: '',
                    send_addr: '',
                    send_addr_ex: [],
                    send_addr_info: '',
                    recive_name: '',
                    recive_phone: '',
                    recive_addr: '',
                    recive_addr_ex: [],
                    recive_addr_info: '',
                    dispatching_type: '',
                    send_time_ex: null,
                    recive_time_ex: null,
                    send_time: '',
                    recive_time: '',
                    freight: 0,
                    safes: 0,
                    total: 0,
                    goods: [],
                    token: localStorage.getItem('token'),
                },
                rules: {
                    send_name: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    send_phone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    send_time_ex: [
                        {type: 'date', required: true, message: '请选择日期'}
                    ],
                    send_addr_ex: [
                        {required: true, message: '请输入地址'}
                    ],
                    send_addr_info: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    recive_name: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    recive_phone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    recive_time_ex: [
                        {type: 'date', required: true, message: '请选择日期'}
                    ],
                    recive_addr_ex: [
                        {required: true, message: '请输入地址'}
                    ],
                    recive_addr_info: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    freight: [
                        {required: true, message: '运费不能为空'}
                    ],
                    safes: [
                        {required: true, message: '保险费用不能为空'}
                    ],
                    dispatching_type:[
                        {required: true, message: '请选择配送方式'}

                    ]
                }
            };
        },
        methods: {
            //删除货物
            removeGoods(index) {
                if (index !== -1) {
                    this.ruleForm.goods.splice(index, 1)
                }
            },
            //添加货物
            addGoods(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        this.ruleForm.goods.push(this.goodForm);
                        this.goodForm = {
                            name: "",
                            size: 0,
                            weight: 0,
                            number: 0,
                            freight: 0,
                            remark: ""
                        };
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        this.submitConfig();
                        addCustomerOrder(this.ruleForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$router.push('/order_my');
                            },
                            error =>{
                                this.listLoading = false;
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.goods = [];
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0)
                        sums[0] = '合计';
                    if (index === 4) {
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            sums[index] += ' 元';
                        } else {
                            sums[index] = '';
                        }
                    }
                });
                return sums;
            },
            submitConfig(){
                //地址转换
                this.ruleForm.recive_addr = '';
                this.ruleForm.send_addr = '';
                for(var i=0; i<3; i++){
                    this.ruleForm.recive_addr += CodeToText[this.ruleForm.recive_addr_ex[i]];
                    this.ruleForm.send_addr += CodeToText[this.ruleForm.send_addr_ex[i]];
                    if(i!=2){
                        this.ruleForm.send_addr +='/';
                        this.ruleForm.recive_addr +='/';
                    }
                }
                //时间转换
                this.ruleForm.send_time = parseTime(this.ruleForm.send_time_ex,"{y}/{m}/{d}");
                this.ruleForm.recive_time = parseTime(this.ruleForm.recive_time_ex,"{y}/{m}/{d}");
            }
        }
    }
</script>


