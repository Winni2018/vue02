<template>
  <div style="width: 100%">
    <div style="line-height: 60px;border-bottom: 2px solid #89A0B7;display: flex;align-items: center;">
      <el-header style="margin-left:45%;">
        管理员列表
      </el-header>
      <el-button type="primary"  @click="opened1=true;handleadd()" style="margin-left:400px;">新增</el-button>

    </div>
    <!--<div id="InfoTab" >-->
      <!--<div style="display: flex;justify-content: space-around;align-items: center">-->

        <!--<div >-->
          <!--<div style="display: flex;align-items: center;">-->
            <!--<span style="font-size: 14px;margin-left: 4px;">日期:</span>-->
            <!--<el-date-picker-->
              <!--size="mini"-->
              <!--v-model="topData.day"-->
              <!--type="daterange"-->
              <!--range-separator="至"-->
              <!--value-format="yyyy-MM-dd"-->
              <!--start-placeholder="开始日期"-->
              <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
            <!--<span style="font-size: 14px;margin-left: 4px;">手机号:</span>-->
            <!--<el-input v-model="phone" placeholder="请输入手机号" size="mini" style="width: 160px;margin-left: 5px;"></el-input>-->
            <!--<el-button size="mini" style="margin-left: 10px;" @click="getlist()">查询</el-button>-->
          <!--</div>-->
        <!--</div>-->

    <template>
        <el-dialog  :visible.sync="opened1"  :center="true"  width="400px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"class="demo-ruleForm">
            <el-form-item label="角色" prop="job">
              <el-select v-model="value" placeholder="请选择"  @change="change" style="width: 300px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="city" v-if="showif">
              <el-select v-model="value1" placeholder="请选择"  @change="change1" style="width: 300px" >
                <el-option
                  v-for="item in options1"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" prop="type" v-if="showif">
              <el-select v-model="value2" placeholder="请选择"  @change="change2" style="width: 300px" >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="account" v-if="showac">
              <el-input type="account" placeholder="请输入账号" style="width: 300px"v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
              <el-input type="password"placeholder="请输入密码"  style="width: 300px"v-model="ruleForm.password"autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名"style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入电话"style="width: 300px;"></el-input>
            </el-form-item>
						 <el-form-item label=" ">
		           <div style="font-size: 12px;color: #909399;margin-left: 70px;">*新密码请设置为字母与数字混合,8-20位。</div>
		        </el-form-item>
            <el-button  style="margin-left: 150px"@click= add()>确认</el-button>

          </el-form>
        </el-dialog>

      </template>
      <el-table
        :data="tableData"
        style="width: 98%;margin:20px auto 10px auto;"
      	border
      	:index="indexMethod"    
      	stripe>
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          align="center"
          width="100px">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="adminName"
          align="center">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="adminPhone"
          align="center">
        </el-table-column>
        <el-table-column
          label="账号"
          prop="adminAccount"
          align="center">
        </el-table-column>
        <el-table-column
          label="密码"
          prop="adminPassword"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="handle"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleopen(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handledelete(scope.$index, scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <template>
        <el-dialog  :visible.sync="opened"  style="width: 800px;margin-left: 300px" >
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input type="account"  style="width: 300px"v-model="ruleForm.account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password"  style="width: 300px"v-model="ruleForm.password"autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="ruleForm.phone" style="width: 300px"></el-input>
            </el-form-item>
						 <el-form-item label=" ">
		           <div style="font-size: 12px;color: #909399;margin-left: 70px;">*新密码请设置为字母与数字混合,8-20位。</div>
		        </el-form-item>
              <el-button  style="margin-left: 135px"  @click="opened=true;confirm()">确认修改</el-button>

          </el-form>
        </el-dialog>

      </template>
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

  export  default {

    data() {
      return {
        outerVisible: false,
        model: {
          id: '',
          phone: '',
          name: '',
          password: '',
          dataTotal: 0,
        },
        phone:'',
        topData: {},
        options: [{
          value: '1',
          label: '管理员'
        }, {
          value: '0',
          label: '客服'
        }, {
            value: '2',
            label: '商家'
          },
        ],
        value: '',
        userInfo: {},
        ruleForm: {
          phone: '',
          name: '',
          password: '',
          account: ''
        },
        rules: {},
        search: '',
        tableData: [],
        contents1: '',
        opened: false,
        opened1: false,

        total: 0,
        page: 1,
        pageSize: 10,
        currentPage1: 1,
        val2:'',
        password:[{

        }],
        options1:[],
        showif:false,
        showac:true,
        city:'',
        val:"",
        value1:'',
        type:"",
        value2:"",
        options2: [{
          value: '0',
          label: '餐饮'
        }, {
          value: '1',
          label: '酒店'
        }, {
          value: '2',
          label: '其它'
        },
          {
            value: '3',
            label: '交通'
          },
        ],

      }


    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.getlist();
       this.getCity()
    },

    methods: {
      //查询
      getlist() {
        this._getData('admin/selectAdmin', {
         pageSize: this.pageSize,
         page:this.page,
         flag:1
        }, data => {
          this.tableData=data.PageInfo.list
          this.total=data.PageInfo.total
        })
      },
       change1(val){
      	this.city=val
      },
      change2(val){

        this.type=val
        console.log(this.type)
      },
      handleSizeChange (val) {
        //每页数量
        this.pageSize = val;
        this.getlist();
      },
      handleCurrentChange (val) {
        //分页
        this.page = val;
        this.getlist();
      },
      //序号
      indexMethod (index) {
        return index + 1 + (this.page - 1) * this.pageSize;
      },


      //删除
      handledelete(val,val1){
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectAdmin', {
            id:val1.id
          }, data => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getlist()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //确认修改
      confirm() {
      	let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      	if(!reg.test(this.ruleForm.password)){
             this.$message({
                  message: '密码格式错误',
                  type: 'warning'
             });
         return
       	}
        this._getData('admin/updateAdmin', {
          id: this.ruleForm.val2,
          password: this.ruleForm.password,
          name: this.ruleForm.name,
          phone: this.ruleForm.phone
        },    data => {
          this.opened= false
          this.$message({
            message: '修改成功',
            type: 'success'

          })
          this.getlist()
        })
      },





      //修改
      handleopen(val,val1){
        console.log(val,val1)
        this.opened = true;
        this.ruleForm.account = val1.adminAccount;
        this.ruleForm.password =val1.adminPassword
        this.ruleForm.name= val1.adminName
        this.ruleForm.phone = val1.adminPhone
        this.ruleForm.val2=val1.id



      },
      //新增
      handleadd(){
        this.opened1=true;
        this.value1=""
       	this.showif=false;
        this.value='';
        this.ruleForm={}
        this.value=''
        this.value1=''
        this.value2="";
      },

      add(){
      	let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
					if(this.val==2){

				if(this.ruleForm.password==undefined||this.ruleForm.name==undefined||this.ruleForm.phone==undefined||this.city==""||this.type==""){
					this.$message({
            message: '请填写完整',
            type: 'warning'
          });
          return
				}
				}
      	if(this.val==""||this.val==1||this.val==0){

					if(this.ruleForm.account==undefined||this.ruleForm.password==undefined||this.ruleForm.name==undefined||this.ruleForm.phone==undefined){
					this.$message({
            message: '请填写完整',
            type: 'warning'
          });
          return
				}
					}
				if(!reg.test(this.ruleForm.password)){
             this.$message({
                  message: '密码格式错误',
                  type: 'warning'
             });
         return
       	}
        this._getData('admin/addAdmin',{
          job:this.val,
          account:this.ruleForm.account,
          password:this.ruleForm.password,
          name:this.ruleForm.name,
          phone:this.ruleForm.phone,
          city:this.city,
          type:this.type
        },data=>  {
           this.opened1=false
          this.$message({
            message: '添加成功',
            type: 'success'
          });

          this.ruleForm.account = ""
          this.ruleForm.password = ""
          this.ruleForm.name = ""
          this.ruleForm.phone=""
          this.show = false
          this.getlist()

        })
      },
      change(val){
        console.log(val)
        this.val=val
        if(val==2){
        	this.showif=true;
        	this.showac=false
        }else{
        	this.showif=false;
        	this.showac=true
        }
      },
      getCity(){
				this._getData('common/getTaiWanCity', {
          }, data => {
            this.options1=data
          })
			},
    }


    }

</script>

<style>
</style>
