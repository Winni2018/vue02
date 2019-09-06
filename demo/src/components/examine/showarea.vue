<template>
	<div>
		<div style="display: flex;justify-content: flex-end;align-items: center;">
			<span style="font-size: 14px;margin-left: 4px;">地区:</span>
			<el-select v-model="value" placeholder="请选择" @change="change" size="mini" style="width: 120px;">
		    <el-option
		      v-for="item in options"
		      :key="item.name"
		      :label="item.name"
		      :value="item.name">
		    </el-option>
		  </el-select>
         <el-button size="mini" style="margin-left: 10px;" @click="handleadd()">添加</el-button>
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
                width="180"
                :index="indexMethod"  
                >
		      </el-table-column>
		      
		      <el-table-column
		      	align="center"
		        prop="cityName"
		        label="地区">
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="操作"
		       >
		       <template slot-scope="scope">
			        
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
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
				value:"",
				options:[],
				area:"",
				tableData:[],
				total: 0,
                pageNum: 1,
                pageSize: 10,
                currentPage1: 1,
			}
		},
		created(){
			this.getList();
			this.getcity()
		},
		methods:{
			change(val){
				
			},
			getcity(){
				this._getData('common/getTaiWanCity', {
				     
                 }, data => {
                	this.options=data
	                console.log(data)
                })
			},
			handleDelete(val,val1){
				 this.$confirm('确定删除?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
				this._getData('appUserTravelDiary/deleteTravelCityById', {
				     id:val1.id
                 }, data => {
                	this.$message({
		                  message: '删除成功',
		                  type: 'success'
	                  });
	                  this.getList()
	                  
                })
				}).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });
        });
			},
			handleadd(){
				if(this.value==""){
					this.$message({
		            type: 'warning',
		            message: '请先选择地区'
		          });
		          return
				}
				this._getData('appUserTravelDiary/insertTravelCity', {
				     cityName:this.value
                }, data => {
                	  this.currentPage1=1
                	  this.handleCurrentChange(1)
                	 
                	  
	                  this.value=""
	                  
                })
			},
			getList(){
				 this._getData('appUserTravelDiary/selectTravelCity', {
				 	pageNum:this.pageNum,
				 	pageSize:this.pageSize
                 }, data => {
                	this.tableData=data.list;
                	this.total=data.total
                })
			},
			handleSizeChange (val) {
                //每页数量
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange (val) {
                //分页
                console.log(val)
                this.pageNum = val;
                this.getList();
            },
            //序号
            indexMethod (index) {
                return index + 1 + (this.pageNum - 1) * this.pageSize;
            },
		}
	}
</script>

<style>
</style>