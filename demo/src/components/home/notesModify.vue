<template>
	<div style="margin: auto;width: 100%;text-align: center;">
		<div style="display: flex;align-items: center;justify-content: center;">
			<span>游记编号</span>
			<!--<el-input v-model="input" placeholder="请输入内容" style="width: 150px;margin-left: 5px;"></el-input>-->
			<el-input
			  type="textarea"
			  autosize
			  placeholder="请输入内容"
			  v-model="input"
			  style="width: 150px;margin-left: 3px;">
			</el-input>
		</div>
		<div style="display: flex;align-items: center;justify-content: center;margin-top: 20px;margin-left: 25px;">
			<span>顺序</span>
			 <el-select v-model="value" placeholder="请选择" style="width: 150px;margin-left: 5px;" @change="change">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
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
		        },{
		          value: '5',
		          label: '5'
		        },{
		          value: '6',
		          label: '6'
		        },{
		          value: '7',
		          label: '7'
		        },{
		          value: '8',
		          label: '8'
		        },{
		          value: '9',
		          label: '9'
		        },{
		          value: '10',
		          label: '10'
		        },{
		          value: '11',
		          label: '11'
		        },{
		          value: '12',
		          label: '12'
		        },{
		          value: '13',
		          label: '13'
		        },{
		          value: '14',
		          label: '14'
		        },{
		          value: '15',
		          label: '15'
		        },{
		          value: '16',
		          label: '16'
		        }],
		        value: '',
		      
			}
	    },
		props:['info','info1'],
		created(){
			this.input=this.info.userTravelDiaryNumber;
			this.value=this.info.number;
		},
		methods:{
			change(val){
				this.value=val;
				console.log(this.value)
			},
			add(){
				this._getData('admin/updateUserGoodTravelDiary', {
					 	id:this.info1.id,
					 	travelDiaryNumber:this.input,
					 	number:this.value
	               }, data => {
	                   this.$message({
	                      message: '修改成功',
	                      type: 'success'
	                    })
	                   this.$emit("handleClose")
	           })
			},
		}
	}
</script>

<style>
</style>