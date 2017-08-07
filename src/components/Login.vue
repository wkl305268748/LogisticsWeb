<template>
    <div class="login-wrap" >
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login"  v-loading.body="listLoading" element-loading-text="正在登录中">

            <template>
                <el-radio class="radio" v-model="type" label="admin">管理员</el-radio>
                <el-radio class="radio" v-model="type" label="customer">物流公司</el-radio>
            </template>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" style="margin-top: 30px">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { AdminLogin } from '@/api/user/admin';
    import { CustomerLogin } from '@/api/user/customer';

    export default {
        data: function(){
            return {
                type:'admin',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                listLoading: false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        if(this.type == 'admin') {
                            AdminLogin(this.ruleForm).then(response => {
                                    this.listLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功!'
                                    });
                                    localStorage.setItem('ms_username', this.ruleForm.username);
                                    localStorage.setItem('token', response.data.token);
                                    localStorage.setItem('type', 'admin');
                                    this.$router.push('/admin/home');
                                },
                                error => {
                                    this.listLoading = false;
                                });
                        }else{
                            CustomerLogin(this.ruleForm).then(response => {
                                    this.listLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功!'
                                    });
                                    localStorage.setItem('customer_username', this.ruleForm.username);
                                    localStorage.setItem('customer_token', response.data.token);
                                    localStorage.setItem('type', 'customer');
                                    this.$router.push('/customer/home');
                                },
                                error => {
                                    this.listLoading = false;
                                });
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:200px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
