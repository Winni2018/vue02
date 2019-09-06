<template>
	<div>
		<span style="font-size: 14px;margin-left: 240px;">日期:</span>
         <el-date-picker
		      v-model="value"
		      type="date"
		      value-format="yyyy-MM-dd"
		      style="width: 160px;"
		      placeholder="选择日期">
		    </el-date-picker>	
         <el-button style="margin-left: 10px;" @click="getList()">查询</el-button>
		<el-button  type="primary"  @click="handleadd()" style="float: right;margin-bottom: 10px;"> 添加 </el-button> 
		<div style="clear: both;"></div>
		<div class="showday">
			<ul>
				<li v-for="(item,index) in tableData"  @click="handleC(item)">{{item.creationTime}}</li>
			</ul>
		</div>
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
        <el-dialog title="航班列表" :visible.sync="dialogEadd4"
                       :center="true" :before-close="handleClose" append-to-body
                       width="1100px">
                <div v-if="dialogEadd4" >
                    <flightList :info="info" :info1="info1"></flightList>                                         
                </div>      
        </el-dialog>  
        
        <el-dialog title="添加航班" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose1" append-to-body
                       width="500px">
                <div v-if="dialogEadd1" >
                    <flightAdd1 ref="modifysure" :info1="info1"  @handleClose1="handleClose1"></flightAdd1>      
                </div>
                 <span slot="footer"  class="dialog-footer">
	                    <el-button type="primary" @click="appealBtn" >确认</el-button>
	                    <el-button @click="handleClose1">取消</el-button>    
               	</span>
        </el-dialog> 
	</div>
</template>

<script>
	import flightAdd1 from './flightAdd1'
	import flightList from './flightList'
	export default{
		data(){
			return{
				 tableData: [],
	 		     total: 0,
	             page: 1,
	             pageSize: 10,
	             currentPage1: 1,
				 list:[],
				 dialogEadd4:false,
				 dialogEadd1:false,
				 info:{},
				 info1:{},
				 value:""
			}
		},
		components:{
			flightList,
			flightAdd1
		},
		props:['daylist'],
		methods:{
			appealBtn(){
				 this.$refs.modifysure.add();
			},
			handleadd(){
				this.dialogEadd1=true
			},
			handleC(val){
				this.info=val
				console.log(this.info)
				this.dialogEadd4=true
			},
			handleClose(){
				this.dialogEadd4=false;
				this.getList()
			},
			handleClose1(){
				this.dialogEadd1=false;
				this.getList()
			},
			getList(){
				this._getData('admin/selectFightTimeByDay', {
		                id:this.daylist.id,
		                page:this.page,
		                pageSize:this.pageSize,
		                day:this.value
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
		},
		created(){
			this.info1=this.daylist
			console.log(this.info1)
			this.getList()
			console.log(this.daylist)
		}
	}
</script>

<style scoped="scoped">
	.showday ul {
		width: 750px;
		display: flex;
		flex-wrap:wrap;
		margin-left: 8%;
	}
	.showday ul li{	
		color: #F56C6C;
		font-size: 14px;
		cursor: pointer;
		line-height: 120px;
		text-align: center;
		width: 120px;
		height:120px;
		border: 1px solid #ccc;
		margin-right: 10px;
		margin-top: 10px;
	}
</style>
