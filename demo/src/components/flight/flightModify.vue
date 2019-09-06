<template>
	<div>
		<div style="display: flex;align-items: center;justify-content: center;margin-bottom: 10px;">
			<span>出发城市</span>
			<el-input v-model="input" placeholder="请输入内容" style="width: 150px;margin-left: 5px;"></el-input>
		</div>
		<div style="display: flex;align-items: center;justify-content: center;">
			<span>落地城市</span>
			<el-input v-model="input1" placeholder="请输入内容" style="width: 150px;margin-left: 5px;"></el-input>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				input:"",
				input1:""
			}
		},
		props:['info','infoA'],
		created(){
			this.input=this.info.startAddress;
			this.input1=this.info.endAddress;
		},
		methods:{
			add(){
				this._getData('admin/updateFightAddress', {
		                id:this.infoA.id,
		                startAddress:this.input,
		                endAddress:this.input1
					}, data => {
					 this.$message({
		                  message: '修改成功',
		                  type: 'success'
	                  });
	                  this.$emit("handleClose")
				})
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>