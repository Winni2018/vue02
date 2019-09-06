<template>
	<div>
		  <el-table
		      :data="tableData"
		       stripe
               style="width: 98%;margin:20px auto 10px auto;"
               border 
               >
		      <el-table-column
		        type="index"
                label="序号"
                align="center"
                :index="indexMethod"  
                width="60px"
                >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="时间" 
		        prop="creationTime"
		      >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="payMoeny"
		        label="消费金额">
		      </el-table-column>
		       <el-table-column
		      	align="center"
		        prop="merchantName"
		        label="消费商家">
		      </el-table-column>
		   </el-table>   
		    <div class="block pageBox">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage1"
                :page-sizes="[10,20,50]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				 tableData: [],
			     total: 0,
			     page: 1,
			     pageSize: 10,
			     currentPage1: 1,
			}
		},
		props:['costinfo'],
		created(){
			console.log(this.costinfo)
			this.getList()
		},
		methods:{
		  handleSizeChange(val) {
	        //每页数量
	        this.pageSize = val;
	        this.getList();
	      },
	      handleCurrentChange(val) {
	        //分页
	        this.page = val;
	        this.getList();
	      },
	      //序号
	      indexMethod(index) {
	        return index + 1 + (this.page - 1) * this.pageSize;
      	  },
      	  getList(){
      	  	this._getData('admin/selectUserConsumptionList', {
	            uuid:this.costinfo.uuid,
	            page:this.page,
	            pageSize:this.pageSize
	          }, data => {
	           	 this.tableData = data.PageInfo.list
          		 this.total = data.PageInfo.total
	            
	          })
	      	}
		}
	}
</script>

<style>
</style>