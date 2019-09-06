<template>
  <div style="width: 100%">
    <el-header style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;">
      平台条款
    </el-header>
    <div style="display: flex;justify-content: center;align-items: center;position: relative;height: 50px;">
    	<el-input v-model="name" placeholder="请输入名称" size="mini" style="width: 160px;"></el-input>
    	<el-button size="mini" style="margin-left: 10px;" @click="getList()">查询</el-button>
    	<el-button type="primary"  @click="handleadd()" style="position: absolute;right: 30px;top: 10px;">新增</el-button>
    </div>
      <el-table
       :data="tableData"
		   stripe
       style="width: 98%;margin:10px auto 10px auto;"
       border
       >  
       <el-table-column
		        type="index"
            label="序号"
            align="center"
            :index="indexMethod"  
            width="100px"
        >
		    </el-table-column>
        <el-table-column
          label="名称"
          prop="title"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="内容"
          prop="content"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="顺序"
          prop="number"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="handle"
          align="center"
        >
        <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handlemodify(scope.$index, scope.row)">修改</el-button>
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
    
    <el-dialog title="新增条款" :visible.sync="dialogEadd2"
                       :center="true" :before-close="handleClose4"
                       width="400px">
                <div v-if="dialogEadd2">
                    <platformAdd ref="zizhiadd" @closeUsermsg="closeUsermsg"></platformAdd>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	<el-button type="primary" @click="appealBtn">确认</el-button>
                    <el-button @click="handleClose4">取消</el-button>      
                </span>
     </el-dialog>
     
      <el-dialog title="修改条款" :visible.sync="dialogEadd3"
                       :center="true" :before-close="handleClose5"
                       width="400px">
                <div v-if="dialogEadd3">
                    <platformModify ref="zizhiadd1" :modifyInfo="modifyInfo" @closeUsermsg1="closeUsermsg1"></platformModify>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	<el-button type="primary" @click="appealBtn1">确认</el-button>
                    <el-button @click="handleClose5">取消</el-button>      
                </span>
     </el-dialog>
  </div>

</template>

<script>
  //新增
	import platformAdd from './platformadd'
  //修改
	import platformModify from './platformmodify'
  export  default {
    data() {
      return {
        tableData: [],
        opended: false,
        userInfo:{},
        total: 0,
        page: 1,
        pageSize: 10,
        currentPage1: 1,
        dialogEadd2:false,
        dialogEadd3:false,
        name:'',
        modifyInfo:{},
        
      }
    },
		components:{
			platformAdd,
			platformModify
		},
    methods:{
			getList(){
					 this._getData('admin/selectClause', {
							 page:this.page,
							 pageSize:this.pageSize,
							 name:this.name
             }, data => {
             	this.tableData=data.PageInfo.list
             	this.total=data.PageInfo.total
              
           })
			},
			appealBtn () {
        this.$refs.zizhiadd.add();
      },
      appealBtn1(){
      	this.$refs.zizhiadd1.add();
      },
      closeUsermsg1(){
      	this.dialogEadd3=false;
      	this.getList()
      },
      //删除
      handleDelete(val,val1){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectClause', {
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
      closeUsermsg(){
      	this.dialogEadd2=false;
      	this.getList()
      },
      handleClose5(){
      	this.dialogEadd3=false;
      },
      //修改
      handlemodify(val,val1){
      	
      	this._getData('admin/selectClauseByID', {
							 id:val1.id
             }, data => {
             	 this.modifyInfo=data
				     	 this.dialogEadd3=true;
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
        handleClose4(){
        	this.dialogEadd2=false
        },
        handleadd(){
        	this.dialogEadd2=true
        }
    },
    created(){
    	this.getList()
    	this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    	
    }
  }
</script>

<style>
</style>
