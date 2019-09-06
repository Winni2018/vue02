<template>
	<div class="flight">
		<div style="line-height: 60px;border-bottom: 2px solid #89A0B7;display: flex;align-items: center;">
	         <el-header style="margin-left:45%;">
	                          航班信息 
	         </el-header>
             <el-button  type="primary" @click="handleadd()" style="margin-left:400px;"> 添加 </el-button>
        </div>
        <el-table
		      :data="tableData"
		       stripe
               style="width: 98%;margin:20px auto 10px auto;"
               border
               :index="indexMethod"    
               >
		      <el-table-column
		        type="index"
                label="序号"
                align="center"
                width="180"     
                >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="出发城市"
		        prop="startAddress"
		        >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="endAddress"
		        label="落地城市">
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="操作"
		       >
		       <template slot-scope="scope">
		       		<el-button
			          size="mini"
			          type="info" plain
			          @click="handlelook(scope.$index, scope.row)">查看</el-button>
			        <el-button
			          size="mini"
			          @click="handlemodify(scope.$index, scope.row)">修改</el-button>
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
       <el-dialog title="修改航班" :visible.sync="dialogEadd"
                       :center="true" :before-close="handleClose"
                       width="600px">
                <div v-if="dialogEadd">
                    <flightModify ref="modifysure" :info="info" @handleClose="handleClose" :infoA="infoA"></flightModify>                                         
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="appealBtn">确认</el-button>
                    <el-button @click="handleClose">取消</el-button>    
                </span>
      </el-dialog>  
      
      <el-dialog title="新增航线" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose1"
                       width="600px">
                <div v-if="dialogEadd1">
                    <flightAdd ref="modifysure1" @handleClose1="handleClose1"></flightAdd>                                         
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="appealBtn1">确认</el-button>
                    <el-button @click="handleClose1">取消</el-button>    
                </span>
      </el-dialog> 
      
       <el-dialog title="航班日期" :visible.sync="dialogEadd2"
                       :center="true" :before-close="handleClose2"
                       width="800px">
                <div v-if="dialogEadd2">
                    <flightLook ref="modifysure2" :daylist="daylist"></flightLook>                                         
                </div>
                <span slot="footer" class="dialog-footer">
                    
                    <el-button @click="handleClose2">取消</el-button>    
                </span>
      </el-dialog>  
	</div>
</template>

<script>
  //细节
	import flightLook from './flightLook'
  //修改
	import flightModify from './flightModify';
	//新增
	import flightAdd from './flightAdd'
	export default{
		data(){
			return{
				 tableData: [],
	 			 total: 0,
	             page: 1,
	             pageSize: 10,
	             currentPage1: 1,
	             dialogEadd:false,
	             dialogEadd1:false,
	             dialogEadd2:false,
	             info:{},
	             infoA:{},
	             daylist:{}
			}
		},
		components:{
			flightModify,
			flightAdd,
			flightLook
		},
		filters:{
				filters1: function (arg) {
		                if (arg == 1) {
		                    return "结束"
		                } else if (arg == 0) {
		                    return "开始"
		            }
		        }
		},
		created(){
			this.getList()
		},
		methods:{
			//查看
			handlelook(val,val1){
				this.daylist=val1
				this.dialogEadd2=true;
			},
			//删除
      handleDelete(val,val1){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectFightAddress', {
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

      //新增
			handleadd(val,val1){
				this.dialogEadd1=true
			},
			appealBtn () {
                this.$refs.modifysure.add();
            },
            appealBtn1 () {
                this.$refs.modifysure1.add();
            },
            appealBtn2 () {
                this.$refs.modifysure2.add();
            },
			handleClose(){
				this.dialogEadd=false;
				this.getList()
			},
			handleClose1(){
				this.dialogEadd1=false;
				this.getList()
			},
			handleClose2(){
				this.dialogEadd2=false;
				this.getList()
			},
			//修改
			handlemodify(val,val1){
				this._getData('admin/selectFightAddressByID', {
		                id:val1.id
					}, data => {
					  this.info=data
					  this.infoA=val1
					  this.dialogEadd=true;
				})
				
			},
			
			//停止开始
			handlelower(val,val1){
				if(val1.status==1){
					val1.status=0
				}else if(val1.status==0){
					val1.status=1
				}
				this._getData('admin/onInFightAddress', {
						id:val1.id,
						flag:val1.status
	            }, data => {
	            	if(val1.status==1){
	            		this.$message({
		                  message: '已开始',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}else if(val1.status==0){
	            		this.$message({
		                  message: '已结束',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}
	            	
				 })
				
			},
			getList(){
					this._getData('admin/selectFightAddressList', {
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

<style scoped="scoped">
	.flight{
		width: 100%;
	}
	
</style>
