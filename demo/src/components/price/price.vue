<template>
  <div style="width: 100%">

    <div style="line-height: 60px;border-bottom: 2px solid #89A0B7;display: flex;align-items: center;">
      <el-header style="margin-left:45%;">
        价格管理
      </el-header>

    </div>
    <div style="padding-top: 20px;padding-left: 8px">
      状态
      <template>
        <el-select v-model="value"  placeholder="请选择" style="width: 100px;padding-left: 10px;" @change="change">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <el-button  type="primary"  @click="opened1=true;handleadd()" style="margin-left:900px;"> 新增 </el-button>
    </div>

    <div id="InfoTab" style="margin-top: 20px">
      <template>
        <el-dialog  :visible.sync="opened1"  style="width: 1000px;margin-left: 300px" >
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"class="demo-ruleForm" style="padding-left: 70px">
            <el-form-item label="类型" prop="type">
              <el-select v-model="value1" placeholder="请选择"  @change="change1" style="width: 300px">
                <el-option
                  v-for="item in options1"
                  :key="item.value1"
                  :label="item.label"
                  :value="item.value1"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input type="name"  style="width: 300px" placeholder="请输入名称"v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="checkPass">
              <el-input type="num" placeholder="请输入单位" style="width: 300px"v-model="ruleForm.num"></el-input>
            </el-form-item>
            <span style="text-align:left;width: 500px">
            <el-form-item label="预付款" prop="money" style="margin-left: -13px;">

              <el-input v-model="ruleForm.money" placeholder="请输入预付款"style="width: 300px"></el-input>

            </el-form-item>
              </span>


            <el-button  style="margin-left: 150px"@click= add()>确认</el-button>

          </el-form>
        </el-dialog>

      </template>
      <el-table
        :data="tableData"
        stripe
        style="width: 98%;margin:20px auto 10px auto;"
        border
        :index="indexMethod"    
      >
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          align="center"
          width="100px">
        </el-table-column>

        <el-table-column
          label="类型"
          align="center">
          <template slot-scope="scope">
          {{scope.row.type|filters1}}
          </template>
        </el-table-column>

        <el-table-column
          label="名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="单位"
          prop="num"
          align="center">
        </el-table-column>
        <el-table-column
          label="预付款"
          prop="money"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="handle"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handlemodify(scope.$index, scope.row)">修改</el-button>
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
    <el-dialog title="修改价格" :visible.sync="dialogEadd3"
               :center="true" :before-close="handleClose5"
               width="500px">
      <div v-if="dialogEadd3">
        <pricemodfiy ref="zizhiadd1" :modifyInfo="modifyInfo" :info="info" @closeUsermsg1="closeUsermsg1"></pricemodfiy>
      </div>
      <span slot="footer" class="dialog-footer">
                   	<el-button type="primary" @click="appealBtn1">确认</el-button>
                    <el-button @click="handleClose5">取消</el-button>
                </span>
    </el-dialog>
  </div>

</template>
<script>
  //修改
  import pricemodfiy from './pricemodfiy'
      export  default {

        data() {
          return {
            options: [{
              value: '1',
              label: '酒店'
            }, {
              value: '3',
              label: '交通'
            }],
            options1: [
             {
              value1: '1',
              label: '酒店'
            },{
              value1: '3',
              label: '交通'
            },
            ],
            ruleForm: {
              num: '',
              name: '',
              money: '',
              type: ''
            },
            value1: '',
            value: '',
            dialogEadd3:false,
            total: 0,
            page: 1,
            pageSize: 10,
            currentPage1: 1,
            opened1: false,
            rules: {},
            tableData: [],
            modifyInfo:{},
            info:{},
            sel:""
          }
        },
        filters: {
          filters1: function (arg) {
            if (arg == 0) {
              return "餐饮"
            } else if (arg == 1) {
              return "酒店"
            } else if (arg == 2) {
              return "其它"
            } else if (arg == 3) {
              return "交通"
            }
          }
        },
        components:{
          pricemodfiy
        },
        created() {
          this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
           this.getlist()
        },

        methods: {
          change(val) {
          	this.page=1
          	this.sel=val
            this.getlist()
          },
          //分页
          handleSizeChange(val) {
            //每页数量
            this.pageSize = val;
            this.getlist();
          },
          handleCurrentChange(val) {
            //分页
            this.page = val;
            this.getlist();
          },
          //序号
          indexMethod(index) {
            return index + 1 + (this.page - 1) * this.pageSize;
          },
          // 通过id查询
          getlist() {
            this._getData('admin/selectTravelMoney', {
              pageSize: this.pageSize,
              page: this.page,
							type:this.sel
            }, data => {
              this.tableData = data.PageInfo.list
              this.total = data.PageInfo.total

            })

          },
          handleClose5() {
            this.dialogEadd3 = false
          },
          appealBtn1() {
            this.$refs.zizhiadd1.add();
          },
          closeUsermsg1() {
            this.dialogEadd3 = false;
            this._getData('admin/selectTravelMoney', {
              pageSize: this.pageSize,
              page: this.page,
              type: this.sel
            }, data => {
              this.tableData = data.PageInfo.list
              this.total = data.PageInfo.total

            })
          },
          change1(val) {
            console.log(val)
            this.val1 = val
          },
          //新增
          handleadd() {
            this.opened1 = true
            this.ruleForm = {}
          },
          add() {
          	var reg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
          	
        	if(this.val1==""||this.val1==undefined||this.ruleForm.name==""||this.ruleForm.name==undefined||this.ruleForm.num==""||this.ruleForm.num==undefined||this.ruleForm.money==""||this.ruleForm.money==undefined){
        		this.$message({
              message: '请填写完整',
              type: 'warning'
            });
            return
        	}
        	if(!reg.test(this.ruleForm.money)){
          		this.$message({
                message: '预付款请设置成正整数或者精确到小数点后两位',
                type: 'warning'
              });
              return
          	}
          	console.log(this.val1,this.ruleForm.money)
            this._getData('admin/addTravelMoney', {
              type: this.val1,
              name: this.ruleForm.name,
              num: this.ruleForm.num,
              money: this.ruleForm.money

            }, data => {
              this.opened1 = false
              this.$message({
                message: '添加成功',
                type: 'success'
              });

              this.ruleForm.name = ""
              this.ruleForm.num = ""
              this.value1 = ""
              this.ruleForm.money = ""
              this.show = false
           		 this._getData('admin/selectTravelMoney', {
              pageSize: this.pageSize,
              page: this.page,
              type: this.sel
            }, data => {
              this.tableData = data.PageInfo.list
              this.total = data.PageInfo.total

            })

            })
          },
          // 删除
          handledelete(val,val1){
            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._getData('admin/delectTravelMoneyByID', {
                id:val1.id
              }, data => {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this._getData('admin/selectTravelMoney', {
              pageSize: this.pageSize,
              page: this.page,
              type: this.sel
            }, data => {
              this.tableData = data.PageInfo.list
              this.total = data.PageInfo.total

            })
              })
            }).catch(() => {
              this.$message({
               
                type: 'info',
                message: '已取消删除'
              });
               
            })
          },

          //修改
          handlemodify(val, val1) {
            this._getData('admin/selectTravelMoneyByID', {
              id: val1.id
            }, data => {
              this.info = val1
              this.modifyInfo = data
              this.dialogEadd3 = true;
            })
          }

        }
      }
      </script>

      <style>
      </style>
