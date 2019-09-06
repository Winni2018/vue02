<template>
	<div>
		<div style="display: flex;justify-content: center;align-items: center;">
			<span style="margin-right: 4px;">姓名:</span>
			<el-input v-model="input" placeholder="请输入姓名" style="width: 200px;" ></el-input>
			<el-button style="margin-left: 10px;" @click="getList()" type="primary">查询</el-button>
		</div>
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
		        label="用户名称" 
		        prop="name"
		      >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="phone"
		        label="电话">
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
				tableData:[],
				total: 0,
                page: 1,
                pageSize: 10,
                currentPage1:1,
				peerslist:{},
				input:''
			}
		},
		
		props:["peerinfo"],
		created(){

			this.getList()
		},
		methods:{
			getList(){
				 this._getData('admin/userFamily', {
				 	uuid:this.peerinfo.uuid,
				 	page:this.page,
				 	pageSize:this.pageSize,
				 	name:this.input
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
		}
	}
</script>

<style>
</style>
