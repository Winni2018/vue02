<template>
    <div class="login">
        <div class="disf">
            <div>
                <h3 class="titi">后台登录</h3>
            </div>
            <div>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <div>
                        <el-form-item label="账号">
                            <el-input v-model="form.email" placeholder="请输入账号"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="form.passWord" placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </div>
                    <!-- <h5 @click="$router.push({path:'/forgetPassword',name:'forgetPassword'})">修改密码</h5> -->
                    <el-form-item>
                        <el-button class="loginbtn" type="primary" @click="onSubmit">
                            <i class="el-icon-loading" v-if="loading"></i>  
                        登录</el-button>
                        <!-- <el-button class="loginbtn" type="primary" @click="$router.push({name: 'index'})">登录</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
        	
            return {
                loading: false,
                form: {
                    email: '',
                    passWord: '',
                    check: ''
                },
                // 关于验证码
               
                rules: {}
            }
        },
        methods: {
            onSubmit(){
            	 if ((!this.form.email) || (!this.form.passWord)) {
                    this.$message.error('请填写完整!');
                    this.loading = true;
                    return;
                }
            	 this._getData('admin/adminLogin', {
                    account: this.form.email,
                    password: this.form.passWord,
                }, data => {
                   this.$message({
                        message: '登录成功',
                        type: 'success'
                   });                   
                   sessionStorage.setItem('userInfo', JSON.stringify(data));
                   sessionStorage.setItem('account', JSON.stringify(this.form.email));
                   sessionStorage.setItem('id', data.adminJob)
                   if(JSON.parse(sessionStorage.getItem('userInfo')).adminJob==0){
                   	 this.$router.push({name:'ordermanagement'})
                   }else{
                   	 this.$router.push({name:'index'})
                   }
                   
                })	
                	
            }
              
        },
        created () {
			
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title {
        text-align: center;
        margin-bottom: 30px;
    }

    .title img {
        margin-right: 20px;
    }

    h5 {
        text-align: right;
        margin-bottom: 20px;
    }

    .login {
        width: 1200px;
        height: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -700px;
    }

    .loginbtn {
        width: 300px;
        background-color: #01419b;
        border-color: #01419b;
    }

    .titi {
        color: #01419b;
        font-size: 26px;
        font-weight: bold;
        margin-top: 30px;
    }

    .disf {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;

    }
</style>
