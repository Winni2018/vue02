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
		methods:{
			add(){
				if(this.input==""||this.input1==""){
					this.$message({
		                  message: '请填写完整',
		                  type: 'warning'
	                  });
	                  return
				}
				this._getData('admin/addFightAddress', {
		                startAddress:this.input,
		                endAddress:this.input1
					}, data => {
					 this.$message({
		                  message: '新增成功',
		                  type: 'success'
	                  });
	                  this.$emit("handleClose1")
				})
			}
		}
	}
</script>

<style>
</style>