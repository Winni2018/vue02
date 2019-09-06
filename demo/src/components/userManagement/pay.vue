<template>
	<div>
		<div style="display: flex;justify-content: center;">
		<el-input v-model="phonenum" placeholder="请输入手机号" style="width: 140px;"></el-input>
		<el-button size="mini" @click="payinfo()">查询</el-button>
		</div>
		<div style="margin-top: 10px;font-size: 14px;color: #333;display: flex;margin-left: 80px;" v-if="payshow">
			<span>用户名:</span><p>{{payvalue.userNickName}}</p>
		</div>
		<div style="display: flex;justify-content: center;margin-top: 10px;">
			<el-input v-model="paymoney" placeholder="请输入充值金额" style="width: 200px;"></el-input>	
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				phonenum:'',
				payshow:false,
				payvalue:{},
				paymoney:''
			}
		},
		methods:{
			   payinfo(){ 
			   	 this._getData('admin/selectUserByPhone', {
				 	  phone:this.phonenum
                 }, data => {
                 	if(data!=null){
	                 	console.log(data)
	                 	this.payvalue=data
	                 	console.log(this.payvalue)
	                 	this.payshow=true
                 	}else if(data==null){
                 		this.$message({
				          message: '此用户不存在',
				          type: 'warning'
				        });
				        return
                 	}
                })
		        	},
			add(){
				 if(this.payvalue.id==undefined){
				 	console.log(11)
				 	this.$message({
			          message: '请输入正确的手机号',
			          type: 'warning'
			        });
			        return
				 }
				 if(this.paymoney==''){
				 	this.$message({
			          message: '请输入充值金额',
			          type: 'warning'
			        });
			        return
				 }
				 this._getData('admin/addMoney', {
				 	uuid:this.payvalue.uuid,
				 	money:this.paymoney
                 }, data => {
                 	 this.$message({
				          message: '充值成功',
				          type: 'success'
				    });
				     this.$emit('closeUsermsg1');
				 })
			}
		}	   
	}
</script>

<style>
</style>
