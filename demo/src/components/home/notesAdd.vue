<template>
	<div style="margin: auto;text-align: center;">
		 <span>游记编号</span>
		 <el-input v-model="input" placeholder="请输入内容" @keyup.native = "clickEnter(input)" style="width: 200px;"></el-input>
		 <el-table
	      :data="restaurants"
	      style="width: 200px;margin-left: 206px;height: 120px;overflow-y: auto;"
	      v-if="show"
	      @current-change="handleCurrentChange"
	      >
	      <el-table-column
	        prop="number"
	        width="180">
	      </el-table-column>
	      </el-table>
	      <div style="display: flex;align-items: center;justify-content: center;margin-top: 20px;margin-left: 25px;">
			<span>顺序</span>
			 <el-select v-model="value" placeholder="请选择" style="width: 200px;margin-left: 5px;" @change="change">
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
		data() {
		      return {
		        restaurants: [],
		        input: '',
		        show:false,
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
	    methods: {
	    	change(val){
	    		this.value=val
	    	},
	    	clickEnter(val){
	    		console.log(val)
	    		if(val==""){
	    			this.show=false
	    		}else{
	    			this.show=true
	    		}
	    		 this._getData('admin/selectUserTravelDiaryByNumber', {
	    		 	number:val
                }, data => {
                 	this.restaurants=data
                 	console.log(this.restaurants)
                })
	    	},
	    	handleCurrentChange(val){
	    		this.input=val.number;
	    		this.show=false
	    	},
	    	add(){
	    		if(this.input==""||this.value==""){
	    			this.$message({
	                      message: '请填写完整',
	                      type: 'warning'
	                })
	    			return
	    		} 	    		                
	    		 this._getData('admin/selectUserTravelDiaryByNumber', {
	    		 	number:this.input
                 }, data => {
                 	
                 	if(data.length==0){
                 		this.$message({
	                      message: '请添加正确的游记编号',
	                      type: 'warning'
	                    })
                 		return
                 	}else{
                 		
                 	}
                 	data.map((item,index)=>{
                 		if(item.number==this.input){
                 			this._getData('admin/addUserGoodTravelDiary', {
			    			travelDiaryNumber:this.input,
			    		 	number:this.value
		                 }, data => {
		                 	this.$message({
			                      message: '添加成功',
			                      type: 'success'
			                    })
			                   this.$emit("handleClose1")
		                 	
		                })
                 		}else{
                 			this.$message({
	                      message: '请添加正确的游记编号',
	                      type: 'warning'
	                    })
                 		}
                 	})
                 	
                })
	    		
	    		
	    	}
      
    	}
   
      }	     
</script>

<style>
	
</style>