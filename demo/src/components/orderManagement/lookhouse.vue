<template>
	<div>
		<div id="InfoTab">
      	<el-table
        :data="tableData"
        stripe
        style="width: 98%;margin:5px auto 10px auto;"
        border
        >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width=100
          >
        </el-table-column>
        <el-table-column
          label="消费详情"
          prop="car"
          align="center">
        </el-table-column>
       <!-- <el-table-column
          label="房型消费"
          prop="house"
          align="center">
        </el-table-column>-->
        <el-table-column
          label="消费数量"
          align="center"
          prop="carnum">
        </el-table-column>
        <!--<el-table-column
          label="房型消费数量"
          align="center"
          prop="housenum">
        </el-table-column>-->
        </el-table>
  		</div>
  		
        <div style="float: right;margin-right: 10px 20px;">
        	总计：{{total}}
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				info:{},
				tableData:[],
				total:"",
				house:[],
				num:[]
			}
		},
		props:['details'],
		created(){
			this.info=this.details
			this.getList()
		},
		methods:{
			
			getList(){
			  var obj={}
	          this._getData('admin/selectOrderBuyLits',{
	            id:this.info.id
	          },data=>{
	          	console.log(data)
	           	data.map((item,index)=>{
	           		this.total+=item.orderMoney
	           		if(item.orderFacilityNumber.indexOf(",") != -1 ){
	           			this.num=item.orderFacilityNumber.split(",")
	      				this.num.pop()
	      				item.carnum=this.num[0]
	           		}else{
	           			item.carnum=item.orderFacilityNumber
	           		}
	           		if(item.orderFacility.indexOf(",") != -1 ){
	           			this.house=item.orderFacility.split(",")
	      				this.house.pop()
	      				item.car=this.house[0]
	           		}else{
	           			item.car=item.orderFacility
	           		}
	      			console.log(this.house)
	      			console.log(item.orderFacility.split(',').length)
	      			//item.house=this.house[1]
	      			//item.carnum=this.num[0]
	      			//item.housenum=this.num[1]
	      			for(var i=0;i<=item.orderFacility.split(',').length-3;i++){
	      				if(item.orderFacility.split(',').length>=3 ){
	      					console.log(this.house[i+1])
		      				obj.car=this.house[i+1]
		      				obj.carnum=this.num[i+1]
		      				data.push(obj)
		      				obj={}
	      				}
	      			}
	      			
	      			
	           	})
	           		this.tableData=data
	          		console.log(data)
	          })
        	}	
		}
	}
</script>

<style>
</style>