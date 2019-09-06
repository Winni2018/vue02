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
                width="100"
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
		        prop="userMoney"
		        label="充值金额">
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
			  total: 0,
        page: 1,
        pageSize: 10,
        currentPage1: 1,
        tableData:[],
        showlist:{}
			}
		},
		props:["info"],
		methods:{
			getList(){
				 this._getData('admin/selectMoneyList', {
				 	uuid:this.showlist.uuid,
				 	page:this.page,
				 	pageSize:this.pageSize
                 }, data => {
                 	console.log(data)
                 	this.tableData=data.PageInfo.list
                 	this.total=data.PageInfo.total
                 	
                })
			},
			
			handleSizeChange (val) {
                //每页数量
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange (val) {
                //分页
                this.page = val;
                this.getList();
            },
            //序号
            indexMethod (index) {
                return index + 1 + (this.page - 1) * this.pageSize;
            },
		},
		created(){
			
			this.showlist=this.info
			this.getList()
		}
	}
</script>
<style>
</style>
