<template>
	<div>
		<div style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px;">
			<span style="margin-right: 5px;">名称</span><el-input v-model="input" placeholder="请输入名称" style="width: 200px;"></el-input>
		</div>
		<div style="display: flex;justify-content: center;align-items: center;">
		<span style="margin-right: 5px;">内容</span>
		<el-input
		  type="textarea"
		  autosize
		  placeholder="请输入内容"
		  v-model="input1"
		  style="width: 200px;">
		</el-input>
		</div>
		<div style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
			<span style="margin-right: 5px;">排序</span>
			<el-select v-model="value" placeholder="请选择" style="width: 200px;" @change="change">
			  <el-option
			   v-for="item in options"
			   :key="item.value"
			   :label="item.label"
			   :value="item.value"
			   >
			  </el-option>
			</el-select>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				input:"",
				input1:"",
				options: [{
		          value: '1',
		          label: '1'
		        }, {
		          value: '2',
		          label: '2'
		        }, {
		          value: '3',
		          label: '3'
		        }, {
		          value: '4',
		          label: '4'
		        }, {
		          value: '5',
		          label: '5'
		        },{
		          value: '6',
		          label: '6'
		        }],
		        value: '',
		        access:{
		       
		        }
				
			}
		},
		props:["modifyInfo"],
		created(){
			this.access=this.modifyInfo;
			this.input=this.access.title;
			this.input1=this.access.content;
			this.value=this.access.number
		},
		methods:{
			change(val){
				this.value=val
			},
			add(){
				this._getData('admin/updateClause', {
				     id:this.access.id,
				     number:this.value,
				     title:this.input,
				     content:this.input1
		        }, data =>{
		           this.$message({
				     message:'修改成功',
				     type: 'success'
				   });
				   this.$emit("closeUsermsg1")
		        })
      	
			}
		}
	}
</script>

<style>
</style>