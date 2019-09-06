<template>
	<div class="route">
		<el-header style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;">
           	路线管理   	
        </el-header>
         <el-button type="primary" @click="handleaddd()" style="float: right;margin: 11px;">新增</el-button>
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
		        label="起点" 
		        prop="startCity"
		      >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="city1"
		        label="城市">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="scenic1"
		        label="推荐景点">
		      </el-table-column>
		       <el-table-column
		      	align="center"
		        prop="city2"
		        label="城市">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="scenic2"
		        label="推荐景点">
		      </el-table-column>
		       <el-table-column
		      	align="center"
		        prop="city3"
		        label="城市">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="scenic3"
		        label="推荐景点">
		      </el-table-column>
		       <el-table-column
		      	align="center"
		        prop="city4"
		        label="城市">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="scenic4"
		        label="推荐景点">
		      </el-table-column>
		       <el-table-column
		      	align="center"
		        prop="endCity"
		        label="终点">
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="操作"
		       width="240"
		       >
		       <template slot-scope="scope">
		       	<el-button
			          size="mini"
			          @click="handlemodify(scope.$index, scope.row)">修改</el-button>
			          <!--<el-button-->
			          <!--size="mini"-->
			          <!--@click="handlelower(scope.$index, scope.row)">{{scope.row.status|filters1}}</el-button>-->

             <el-button
               size="mini"
               @click="handlelower(scope.$index, scope.row)">
               {{scope.row.status|filters1}}</el-button>
            
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleblack(scope.$index, scope.row)">删除</el-button>
			       
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
         <el-dialog title="修改路线" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose1"
                       width="500px">
                <div v-if="dialogEadd1">
                    <modifyRou ref="zizhiadd" :info="info" :info1="info1" @handleClose1="handleClose1" ></modifyRou>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	<el-button type="primary" @click="appealBtn">确认</el-button>
                    <el-button @click="handleClose1">取消</el-button>      
                </span>
        </el-dialog>
        
         <el-dialog title="新增路线" :visible.sync="dialogEadd2"
                       :center="true" :before-close="handleClose2"
                       width="500px">
                <div v-if="dialogEadd2">
                    <addRou ref="zizhiadd" @handleClose2="handleClose2"></addRou>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	<el-button type="primary" @click="appealBtn1">确认</el-button>
                    <el-button @click="handleClose2">取消</el-button>      
                </span>
        </el-dialog>
        
	</div>
</template>

<script>
  //修改
	import modifyRou from './modifyRou';
	//新增
	import addRou from './addRou'
	export default{
		data(){
			return{
				tableData:[],
				total: 0,
                page: 1,
                pageSize: 10,
                currentPage1: 1,
                info:{},
                info1:{},
                dialogEadd1:false,
                dialogEadd2:false
			}
		},
		filters:{
			 filters1: function (arg) {
                if (arg == 0) {
                    return "开始"
                } else if (arg == 2) {
                    return "未开始"
                }
            }
		},
		components:{
			modifyRou,
			addRou
		},
		created(){
			this.getList()
		},
		methods:{
			//新增
			handleaddd(){
				this.dialogEadd2=true
			},
			handleClose1(){
				this.dialogEadd1=false;
				this.getList()
			},
			handleClose2(){
				this.dialogEadd2=false;
				this.getList()
			},
			appealBtn(){
				this.$refs.zizhiadd.add();
			},
			appealBtn1(){
				this.$refs.zizhiadd.add();
			},
			handlemodify(val,val1){
				this._getData('admin/selectPathByID', {
				 	id:val1.id
                 }, data => {
                 	this.info=data
                 	this.info1=val1
                 	this.dialogEadd1=true
                })
			},
			getList(){
				 this._getData('admin/selectPathList', {
				 	page:this.page,
				 	pageSize:this.pageSize,
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
            //删除
      handleblack(val,val1){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectPath', {
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

      //停止开始
      handlelower(val,val1){
         if(val1.status==2){
					val1.status=0
			}else if(val1.status==0){
					val1.status=2
			}
        this._getData('admin/startEndPath', {
          id:val1.id,
          flag:val1.status
        }, data => {
          if(val1.status==0){
            this.$message({
              message: '已更加成为未开始的状态',
              type: 'success'
            });
            this.getList()
          }else if(val1.status==2){
            this.$message({
              message: '已更改成开始的状态',
              type: 'success'
            });
            this.getList()
          }

        })

      },
		}
	}
</script>

<style scoped="scoped">
	.route{
		width: 100%;
	}
</style>
