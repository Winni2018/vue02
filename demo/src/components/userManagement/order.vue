<template>
	<div>
		<div style="display: flex;align-items: center;justify-content: center;">
		<el-date-picker
                size="mini"
                v-model="topData.day"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
         <el-button size="mini" style="margin-left: 10px;" @click="getList()">查询</el-button>
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
		        label="时间" 
		        prop="creationTime"
		      >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="orderPath"
		        label="订单路线">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		      	prop="orderNumber"
		        label="人数">
		      </el-table-column>
		      <el-table-column
	          label="消费详情"
	          align="center">
	           <template slot-scope="scope">
	            <el-button
	              size="mini"
	              @click="handlehouse(scope.$index, scope.row)">查看</el-button>
	
	          </template>
        	</el-table-column>
		      <el-table-column
		       align="center"
		       label="预付款"
		       prop="orderMoney"
		       > 
		    </el-table-column>
		   	<el-table-column
		       align="center"
		       label="出发时间"
		       prop="startTime"
		       > 
		    </el-table-column>
		    <el-table-column
		       align="center"
		       label="结束时间"
		       prop="endTime"
		       > 
		    </el-table-column>
		      <el-table-column
		       align="center"
		       label="状态"
		       >
		       <template slot-scope="scope">
			        {{scope.row.orderStatus|filters1}}
              </template>
		    </el-table-column>
		    <el-table-column
	          label="备注"
	          align="center">
	           <template slot-scope="scope">
	            <el-button
	              size="mini"
	              @click="handleremark(scope.$index, scope.row)">查看</el-button>
	
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
        <el-dialog title="消费详情" :visible.sync="dialogEadd4"
               :center="true" :before-close="handleClose4" append-to-body
               width="500px">
      <div v-if="dialogEadd4">
        <lookhouse :details="details"></lookhouse>
      </div>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose4">取消</el-button>
                </span>
    </el-dialog>
    <el-dialog title="查看备注" :visible.sync="dialogEadd6"
               :center="true" :before-close="handleClose6" append-to-body
               width="500px">
      <div v-if="dialogEadd6">
        <lookremark :remark="remark"></lookremark>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="handleClose6">取消</el-button>
       </span>
    </el-dialog>
	</div>
</template>

<script>
	import lookhouse from './lookhouse'
	import lookremark from './lookremark'
	export default{
		data(){
			return{
				dialogEadd3:false,
		      	dialogEadd4:false,
		      	dialogEadd6:false,
		      	details:{},
		      	remark:{},
				tableData:[],
				total: 0,
                page: 1,
                pageSize: 10,
                currentPage1: 1,
                info:{},
                topData: {}
			}
		},
		props:["orderinfo"],
		created(){
			console.log(this.orderinfo)
			this.getList()
		},
		components:{
      		lookhouse,
      		lookremark
      	},
		filters:{
			 filters1: function (arg) {
                if (arg == 0) {
                    return "已预订"
                } else if (arg == 1) {
                    return "待出行"
                } else if (arg==2){
                	return "旅行中"
                } else if (arg==3){
                	return "已完成"
                }
            }
		},
		methods:{
			handlehouse(val,val1){
				console.log(val1)
      			this.details=val1
      			this.dialogEadd4=true
	      	},
	      	handleremark(val,val1){
	      		this.remark=val1
	      		this.dialogEadd6=true
	      	},
	      	
	      	handleClose4(){
	      		this.dialogEadd4=false
	      	},
	      	handleClose6(){
	      		this.dialogEadd6=false
	      	},
			getList(){
				let day1 = '';
                let day2 = '';
                if(this.topData.day == undefined || this.topData.day == ''){
                	day1 = '';
                    day2 = '';     
                }else{
                	day1 = this.topData.day[0];
                    day2 = this.topData.day[1];   
                }
				 this._getData('admin/selectUserOrderList', {
				 	uuid:this.orderinfo.uuid,
				 	page:this.page,
				 	pageSize:this.pageSize,
				 	beginTime:day1,
				 	endTime:day2
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