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
                width="100"     
                >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        prop="startAirport"
		        label="出发机场"
		       
		        >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        prop="overAirport"
		        label="落地机场"
		        >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        prop="airlineAirway"
		        label="航空公司"
		        >
		      </el-table-column>
		       <el-table-column
		        align="center"
		        prop="startTime"
		        label="出发时间"
		        >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        prop="overTime"
		        label="落地时间"
		        >
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="操作"
		       width="240"     
		       >
		       <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handlelook(scope.$index, scope.row)">查看</el-button>
			        <el-button
			          size="mini"
			          @click="handlelower(scope.$index, scope.row)">{{scope.row.status|filters1}}</el-button>
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
        
        <el-dialog title="航班详情" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose1" append-to-body
                       width="500px">
                <div v-if="dialogEadd1" >
                    <fliDetail :info2="info2"></fliDetail>
                   
                </div>
                 <span slot="footer"  class="dialog-footer">
	                    
	                    <el-button @click="handleClose1">取消</el-button>    
               	</span>
        </el-dialog>
	</div>
</template>

<script>
	import fliDetail from './flidetail'
	export default{
		data(){
			return{
				tableData:[],
				total: 0,
                page: 1,
                pageSize: 10,
                currentPage1: 1,
                info2:{},
                dialogEadd1:false
			}
		},
		components:{
			fliDetail
		},
		props:['info','info1'],
		created(){
			this.getList()
			console.log(this.info)
		},
		filters:{
			 filters1: function (arg) {
                if (arg == 0) {
                    return "结束"
                } else if (arg == 1) {
                    return "开始"
                }
            }
		},
		methods:{
			handleClose1(){
				this.dialogEadd1=false;
				this.getList()
			},
			handlelook(val,val1){
				this._getData('admin/selectFightTimeByID', {
						id:val1.id,
	            }, data => {
	            	this.info2=data;
	            	console.log(this.info)
	            	this.dialogEadd1=true
	            	
				 })
			},
			handlelower(val,val1){
				if(val1.status==1){
					val1.status=0
				}else if(val1.status==0){
					val1.status=1
				}
				this._getData('admin/startEndFightTime', {
						id:val1.id,
						flag:val1.status
	            }, data => {
	            	if(val1.status==1){
	            		this.$message({
		                  message: '已结束',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}else if(val1.status==0){
	            		this.$message({
		                  message: '已开始',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}
	            	
				 })
			},
      handleDelete(val,val1){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectFightTime', {
            id:val1.id
          }, data => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
			
			getList(){
				this._getData('admin/selectFightTime', {
		                id:this.info1.id,
		                creationTime:this.info.creationTime,
		        		page:this.page,
		        		pageSize:this.pageSize
					}, data => {
					  
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
