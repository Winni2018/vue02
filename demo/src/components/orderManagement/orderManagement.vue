<template>
  <div style="width: 100%">
    <el-header style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;">
      订单管理
    </el-header>

    <div style="padding-top: 20px;padding-left: 8px">
      状态
      <template>
        <el-select v-model="value1"  placeholder="请选择" style="width: 100px;padding-left: 10px;" @change="change">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>

        <el-input v-model="phone" placeholder="请输入手机号查询" size="mini" style="width: 160px;padding-left: 680px"></el-input>
        <el-button size="mini" style="margin-left: 10px;" @click="getlist()">查询</el-button>

    </div>


    <div id="InfoTab" style="margin-top: 20px">
      <el-table
        :data="tableData"
        stripe
        style="width: 98%;margin:5px auto 10px auto;"
        border
       
        >
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="时间"
          prop="creationTime"
          align="center">
        </el-table-column>

        <el-table-column
          label="姓名"
          prop="userName"
          align="center">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="userPhone"
          align="center">
        </el-table-column>
        <el-table-column
          label="订单路线"
          prop="orderPath"
          align="center">
        </el-table-column>
        <el-table-column
          label="人数"
          prop="orderNumber"
          align="center">
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
          label="备注"
          align="center">
           <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleremark(scope.$index, scope.row)">查看</el-button>

          </template>
        </el-table-column>
        
        <el-table-column
          label="预付款"
          prop="orderMoney"
          align="center">
        </el-table-column>
        <el-table-column
          label="出发时间"
          prop="startTime"
          align="center">
        </el-table-column>
        <el-table-column
          label="结束时间"
          prop="endTime"
          align="center">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center">
          <template slot-scope="scope">
          {{scope.row.orderStatus|filters2}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope" style="flex-direction: column;">
            <el-button
              size="mini"
              @click="handleblack(scope.$index, scope.row)">{{scope.row.flag1|filters1}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handledelete(scope.$index, scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
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
		
    <el-dialog title="消费详情" :visible.sync="dialogEadd4"
               :center="true" :before-close="handleClose4"
               width="500px">
      <div v-if="dialogEadd4">
        <lookhouse :details="details"></lookhouse>
      </div>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose4">取消</el-button>
                </span>
    </el-dialog>
    <el-dialog title="查看备注" :visible.sync="dialogEadd6"
               :center="true" :before-close="handleClose6"
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
	export  default {
		data() {
      return {
      	dialogEadd3:false,
      	dialogEadd4:false,
      	dialogEadd6:false,
      	details:{},
      	remark:{},
        options: [{
          value: '0',
          label: '已预定'
        }, {
          value: '1',
          label: '待出行'
        }, {
          value: '2',
          label: '旅行中'
        }, {
          value: '3',
          label: '已完成'
        },],
        total: 0,
        page: 1,
        pageSize: 10,
        currentPage1: 1,
        tableData: [],
        dataTotal: 0,
        value1:'',
        phone:'',
        sel:""
       }
      },
      components:{
      	
      	lookhouse,
      	lookremark
      },
    filters:{
      filters1: function (arg) {
        if (arg == 0) {
          return "上架"
        } else if (arg == 1) {
          return "下架"
        }
      },
      filters2:function (arg) {
        if(arg==0){
          return "已预定"
        } else if (arg == 1) {
          return "待出行"
        }else if (arg == 2) {
          return "旅行中"
        }else if (arg == 3) {
          return "已完成"
        }
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.getlist()


    },
      methods:{
      	
      	handlehouse(val,val1){
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
		    change(val){
		    	this.page=1
		    	this.sel=val
          this.getlist()


      },
        //分页
        handleSizeChange(val) {
          //每页数量
          this.pageSize = val;
          this.getlist()

        },
        handleCurrentChange(val) {
          //分页
          this.page = val;
          this.getlist()

        },
        //序号
        indexMethod(index) {
          return index + 1 + (this.page - 1) * this.pageSize;
        },
        //查询
        getlist(){
          this._getData('admin/selectOrderListOver',{
            pageSize:this.pageSize,
            page:this.page,
            phone:this.phone,
            flag:this.sel
          },data=>{
            this.tableData=data.PageInfo.list
            this.total=data.PageInfo.total
          })
        },
        //上下架
        handleblack(val,val1){
          if(val1.flag1==1){
            val1.flag1=0
          }else if(val1.flag1==0){
            val1.flag1=1
          }
          this._getData('admin/upDownOrder', {
            id:val1.id,
            flag:val1.flag1
          }, data => {
            if(val1.flag1==1){
              this.$message({
                message: '已上架',
                type: 'success'
              });
              this.getlist()
            }else if(val1.flag1==0){
              this.$message({
                message: '已下架',
                type: 'success'
              });
              this.getlist()
            }

          })
        },
        //删除
        handledelete(val,val1){
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._getData('admin/delectOrder', {
              id:val1.id
            }, data => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
               this._getData('admin/selectOrderListOver',{
		            pageSize:this.pageSize,
		            page:this.page,
		            phone:this.phone,
		            flag:this.sel
		          },data=>{
		            this.tableData=data.PageInfo.list
		            this.total=data.PageInfo.total
		          })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },


      }
	}
	
</script>

<style>
</style>
