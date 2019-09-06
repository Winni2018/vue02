<template>
	<div>
		<div class="aa5">
			<span class="aa6">日期</span>
			  <el-date-picker
		      v-model="value"
		      type="date"
		      value-format="yyyy-MM-dd"
		      style="width: 160px;"
		      placeholder="选择日期">
		    </el-date-picker>	
		</div>
		<div class="aa5">
			<span class="aa6">出发时间</span>
			  <el-date-picker
		      v-model="value1"
		      value-format="yyyy-MM-dd"
		      type="date"
		      style="width: 160px;"
		      placeholder="选择日期">
		    </el-date-picker>	
		</div>
		<div class="aa5">
			<span class="aa6">出发机场:</span>
            <el-input v-model="ariS" placeholder="请输入出发机场" style="width: 160px;"></el-input>
		</div>
		<div class="aa5">
			<span class="aa6">中转到达时间</span>
			  <el-date-picker
		      v-model="value2"
		       value-format="yyyy-MM-dd"
		      type="date"
		      style="width: 160px;"
		      placeholder="选择日期">
		    </el-date-picker>	
		</div>
		<div class="aa5">
			<span class="aa6">中转开始时间</span>
			  <el-date-picker
		      v-model="value3"
		      value-format="yyyy-MM-dd"
		      type="date"
		      style="width: 160px;"
		      placeholder="选择日期">
		    </el-date-picker>	
		</div>
		<div class="aa5">
			<span class="aa6">中转机场:</span>
            <el-input v-model="airE" placeholder="请输入中转机场" style="width: 160px;"></el-input>
		</div>
		<div class="aa5">
			<span class="aa6">落地时间</span>
			  <el-date-picker
		      v-model="value4"
		      type="date"
		      value-format="yyyy-MM-dd"
		      style="width: 160px;"
		      placeholder="选择日期">
		    </el-date-picker>	
		</div>
		<div class="aa5">
			<span class="aa6">落地机场:</span>
            <el-input v-model="airO" placeholder="请输入落地机场" style="width: 160px;"></el-input>
		</div>
		<div class="aa5">
			<span class="aa6">航空公司:</span>
            <el-input v-model="airC" placeholder="请输入航空公司" style="width: 160px;"></el-input>
		</div>
		<div class="aa5">
			<span class="aa6">中转航空公司:</span>
            <el-input v-model="airCE" placeholder="请输入中转航空公司" style="width: 160px;"></el-input>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				value:"",
				value1:"",
				value2:"",
				value3:"",
				value4:"",
				ariS:"",
				airE:"",
				airO:"",
				airC:"",
				airCE:""
				
			}
		},
		props:['info1'],
		created(){
			console.log(this.info1)
		},
		methods:{
			add(){
				if(this.value==""||this.value1==""||this.ariS==""||this.value4==""||
				this.airO==""||this.airC==""){
					this.$message({
				        message: '请填写完整',
				        type: 'warning'
				    }); 
				    return 
				}
				this._getData('admin/addFightTime', {
		                id:this.info1.id,
		                day:this.value,
		                startTime:this.value1,
		                startAirport:this.ariS,
		                transferStartTime:this.value2,
		                transferEndTime:this.value3,
		                transferAirport:this.airE,
		                overTime:this.value4,
		                overAirport:this.airO,
		                airlineAirway:this.airC,
		                transferAirlineAirway:this.airCE
				}, data => {
					  this.$message({
				        message: '添加成功',
				        type: 'success'
				    	}); 
				    this.$emit('handleClose1');
					 
				})
			}
		}
	}
</script>

<style>
	.aa5{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}
	.aa6{
		width: 100px;
		text-align: right;
		margin-right: 5px;
	}
</style>