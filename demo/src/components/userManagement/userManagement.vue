<template>
	<div class="usermanagerment">
		<el-header style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;">
           	用户列表   	
        </el-header>
        <el-container style='display: flex;justify-content: space-between;align-items: center;'>
        	<el-button type="primary"style='margin: 10px;' @click="handlepay()">充值</el-button>
        	<div style="display: flex;align-items: center;">
            <span style="font-size: 14px;margin-left: 4px;">日期:</span>
            <el-date-picker
                size="mini"
                v-model="topData.day"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <span style="font-size: 14px;margin-left: 4px;">姓名:</span>
            <el-input v-model="name" placeholder="请输入姓名" size="mini" style="width: 160px;margin-left: 5px;"></el-input>
            <span style="font-size: 14px;margin-left: 4px;">手机号:</span>
            <el-input v-model="phone" placeholder="请输入手机号" size="mini" style="width: 160px;margin-left: 5px;"></el-input>
            <el-button size="mini" style="margin-left: 10px;" @click="getList()">查询</el-button>
           </div> 
            <el-button style="margin: 10px;" @click="exportFunc('dayin','用户列表')">导出</el-button>
        </el-container>
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
		        label="用户名称" 
		        prop="userNickName"
		      >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="userPhone"
		        label="电话">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="integral"
		        label="积分">
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="消费记录"
		       >
		       <template slot-scope="scope">
			        <el-button
			         @click="handlecost(scope.$index, scope.row)" size="mini"
			          >查看</el-button>
			        
              </template>
		    </el-table-column>
		    <el-table-column
		       align="center"
		       label="充值记录"
		       >
		       <template slot-scope="scope">
			        <el-button
			        @click="handlerecharge(scope.$index, scope.row)"  size="mini"
			        >查看</el-button>	        
              </template>
		    </el-table-column>
		    <el-table-column
		       align="center"
		       label="游记管理"
		       >
		       <template slot-scope="scope">
			        <el-button
			        @click="handletravel(scope.$index, scope.row)"
			          size="mini"
			          >查看</el-button>       
             </template> 
		    </el-table-column>
		    <el-table-column
		       align="center"
		       label="订单管理"
		       >
		       <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleorder(scope.$index, scope.row)"
			          >查看</el-button>       
             </template> 
		    </el-table-column>
		    <el-table-column
		       align="center" 
		       size="mini" label="同行人信息"
		       >
		       <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handlepeers(scope.$index, scope.row)">查看</el-button>       
             </template> 
		    </el-table-column>
		      <el-table-column
		       align="center"
		       label="操作"
		       >
		       <template slot-scope="scope">
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleblack(scope.$index, scope.row)">加入黑名单</el-button>
			       
              </template>
		    </el-table-column>
		     
		</el-table>
		<div id="dayin" style="height: 0;overflow: hidden;">
			 <el-table
		      :data="tableData"
		       stripe
               style="width: 98%;margin:20px auto 10px auto;"
               border
               >
		      <el-table-column
		        align="center"
		        label="用户名称" 
		        prop="userNickName"
		      >
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="userPhone"
		        label="电话">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="integral"
		        label="积分">
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
        <el-dialog title="充值记录" :visible.sync="dialogEadd"
                       :center="true" :before-close="handleClose2"
                       width="800px">
                <div v-if="dialogEadd">
                    <eCharge ref="zizhiadd" :info="info"></eCharge>
                                                    
                </div>

                <span slot="footer" class="dialog-footer">
                   
                    <el-button @click="handleClose2">取消</el-button>      
                </span>
        </el-dialog>
        <el-dialog title="充值" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose3"
                       width="400px">
                <div v-if="dialogEadd1">
                    <pay ref="zizhiadd" @closeUsermsg1="closeUsermsg1"></pay>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	<el-button type="primary" @click="appealBtn">确认</el-button>
                    <el-button @click="handleClose3">取消</el-button>      
                </span>
        </el-dialog>
        
        <el-dialog title="同行人信息" :visible.sync="dialogEadd2"
                       :center="true" :before-close="handleClose4"
                       width="800px">
                <div v-if="dialogEadd2">
                    <peers :peerinfo="peerinfo"></peers>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	
                    <el-button @click="handleClose4">取消</el-button>      
                </span>
        </el-dialog>
        
        <el-dialog title="游记管理" :visible.sync="dialogEadd3"
                       :center="true" :before-close="handleClose5"
                       width="900px">
                <div v-if="dialogEadd3">
                    <travel :travelinfo="travelinfo" ></travel>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	
                    <el-button @click="handleClose5">取消</el-button>      
                </span>
        </el-dialog>
        
         <el-dialog title="订单管理" :visible.sync="dialogEadd4"
                       :center="true" :before-close="handleClose6"
                       width="900px">
                <div v-if="dialogEadd4">
                    <order :orderinfo="orderinfo" ></order>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	
                    <el-button @click="handleClose6">取消</el-button>      
                </span>
        </el-dialog>
        
         <el-dialog title="消费记录" :visible.sync="dialogEadd5"
                       :center="true" :before-close="handleClose7"
                       width="900px">
                <div v-if="dialogEadd5">
                    <cost :costinfo="costinfo"></cost>                                 
                </div>
                <span slot="footer" class="dialog-footer">
                   	
                    <el-button @click="handleClose7">取消</el-button>      
                </span>
        </el-dialog>
	</div>
</template>

<script>
	//消费记录
	import cost from './cost'
	//订单管理
	import order from './order'
	//游记管理
	import travel from './travel'
	//查看同行人
	import peers from './peers'
	//充值
	import pay from './pay'
	//导出excel
	import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
	//充值记录
	import eCharge from './echarge'
	export default {
    data() {
      return {
        tableData: [],
        total: 0,
        page: 1,
        pageSize: 10,
        currentPage1: 1,
        topData: {},
        dialogEadd: false,
        dialogEadd1: false,
        dialogEadd2: false,
        dialogEadd3: false,
        dialogEadd4: false,
        dialogEadd5:false,
        info: {},
        peerinfo: {},
        travelinfo: {},
        orderinfo: {},
        name: "",
        phone: "",
        costinfo:{},
      
	
      }
    },
    components: {
      eCharge,
      pay,
      peers,
      travel,
      order,
      cost
    },
    created() {
      this.getList()
    },
    methods: {
      handleClose7(){
      	this.dialogEadd5=false;
      	this.getList()
      },
      handlecost(val,val1){
    		this.costinfo=val1
    		this.dialogEadd5=true;
      },
      //游记管理
      handletravel(val, val1) {
        this.travelinfo = val1
        this.dialogEadd3 = true
      },
      handleorder(val, val1) {
        this.orderinfo = val1;
        this.dialogEadd4 = true
      },
      //展示
      getList() {
      	
        let day1 = '';
        let day2 = '';
        let name1 = '';
        let phone1 = '';
        if (this.topData.day == undefined || this.topData.day == '') {
          day1 = '';
          day2 = '';
        }
        if (this.phone == undefined || this.phone == '') {
          phone1 = '';
        }
        if (this.name == undefined || this.name == '') {
          name1 = '';
        }
        if (!this.topData.day == "") {
          day1 = this.topData.day[0];
          day2 = this.topData.day[1];
        }
        if (!this.phone == '') {
          phone1 = this.phone
        }
        if (!this.name == '') {
          name1 = this.name;
        }
        this._getData('admin/userList', {
          page: this.page,
          pageSize: this.pageSize,
          beginTime: day1,
          endTime: day2,
          name: name1,
          phone: phone1
        }, data => {
        	
          console.log(data)
          this.tableData = data.PageInfo.list
          this.total = data.PageInfo.total
		 
        })

      },
      appealBtn() {
        this.$refs.zizhiadd.add();
      },
      handleClose2() {
        this.dialogEadd = false;

      },
      closeUsermsg1() {
        this.dialogEadd1 = false
        this.getList()
      },
      //充值
      handlepay() {
        this.dialogEadd1 = true
      },
      handleClose3() {
        this.dialogEadd1 = false;
        this.getList()
      },
      handleClose4() {
        this.dialogEadd2 = false
      },
      handleClose5() {
        this.dialogEadd3 = false
      },
      handleClose6() {
        this.dialogEadd4 = false
      },
      handlerecharge(val, val1) {
        this.dialogEadd = true
        this.info = val1
      },
      handleSizeChange(val) {
        //每页数量
        this.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        //分页
        this.page = val;
        this.getList();
      },
      //序号
      indexMethod(index) {
        return index + 1 + (this.page - 1) * this.pageSize;
      },
      //加入黑名单
      handleblack(val,val1){
        this.$confirm('确认加入黑名单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectUser', {
            uuid:val1.uuid
          }, data => {
            this.$message({
              message: '加入黑名单成功',
              type: 'success'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //查看同行人
      handlepeers(val, val1) {
        this.peerinfo = val1;
        this.dialogEadd2 = true

      },
      exportFunc(el, name) {
        let date = this.transDate(new Date());
        //从表生成工作簿对象
        var wb = XLSX.utils.table_to_book(document.getElementById(el));
        //得到二进制字符串作为输出
        var wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'binary'
        });
        //wb是要导出的表格的json数据
        FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
          type: 'application/octet-stream'
        }), date + name + '.xlsx');
      },
      transDate(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        return Y + M + D;
      },
      s2ab(s) {
        var cuf;
        var i;
        if (typeof ArrayBuffer !== 'undefined') {
          cuf = new ArrayBuffer(s.length);
          var view = new Uint8Array(cuf);
          for (i = 0; i !== s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
          }
        } else {
          cuf = new Array(s.length);
          for (i = 0; i !== s.length; i++) {
            cuf[i] = s.charCodeAt(i) & 0xFF;
          }
        }
        return cuf;
      },
    }
  }
</script>

<style scoped="scoped">
	.usermanagerment{
		width: 100%;
	}
	
</style>
