<template>
  <div style="width: 100%">
    <div style="line-height: 60px;border-bottom: 2px solid #89A0B7;display: flex;align-items: center;">
      <el-header style="margin-left:45%;">
        商家列表
      </el-header>

    </div>
    <div style="padding-top: 20px;padding-left: 8px">
      城市列表
    <template>
      <el-select v-model="value1" placeholder="城市列表"style="width: 110px ;height: 10px" @change="change">
        <el-option
          v-for="item in tableData1"
          :key="item"
          :label="item"
          :value="item"
          >
        </el-option>
      </el-select>
    </template>
      <el-button style="margin-left:850px;" @click="exportFunc('dayin','商家列表')">导出</el-button>
    </div>
    <div id="InfoTab" style="margin-top: 20px">
      <el-table
        :data="tableData"
        stripe
        style="width: 98%;margin:20px auto 10px auto;"
        border
      >
        <el-table-column
          label="序号"
          type="index"
          :index="indexMethod"
          align="center"
          width="100px">
      </el-table-column>
        <el-table-column
          label="城市"
          prop="city"
          align="center">
        </el-table-column>

        <el-table-column
          label="名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="phone"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="类型">
          <template slot-scope="scope">
        {{scope.row.type|filters1}}
          </template>
        </el-table-column>
        <el-table-column
          label="收款记录"
          align="center">

          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCollection(scope.$index, scope.row)">查看</el-button>
          </template>

        </el-table-column>
        <el-table-column
          label="详细信息"
          align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleinformation(scope.$index, scope.row)">查看</el-button>
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
          label="城市"
          prop="city"
          align="center">
        </el-table-column>

        <el-table-column
          label="名称"
          prop="name"
          align="center">
        </el-table-column>
        <el-table-column
          label="电话"
          prop="phone"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="类型">
          <template slot-scope="scope">
            {{scope.row.type|filters1}}
          </template>
        </el-table-column>
        </el-table>
      </div>
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
    <el-dialog title="收款记录" :visible.sync="dialogEadd2"
               :center="true" :before-close="handleClose4"
               width="800px">
      <div v-if="dialogEadd2">
        <Collection :Collectioninfo="Collectioninfo"></Collection>
      </div>
      <span slot="footer" class="dialog-footer">

                    <el-button @click="handleClose4">确定</el-button>
                </span>
    </el-dialog>
    <el-dialog title="商家详情" :visible.sync="dialogEadd3"
               :center="true" :before-close="handleClose5"
               width="600px">
      <div v-if="dialogEadd3">
        <information :informationinfo="informationinfo"></information>
      </div>
      <span slot="footer" class="dialog-footer">

                    <el-button @click="handleClose5">确定</el-button>
                </span>
    </el-dialog>
  </div>

</template>

<script>
  //收款记录
  import Collection from './Collection'
  //商家详情
  import information from './information'
  //导出excel
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';

  export  default {

    data() {
      return {
        dialogEadd2: false,
        dialogEadd3: false,
        Collectioninfo: {},
        informationinfo: {},
        value1: '',
        total: 0,
        page: 1,
        pageSize: 10,
        currentPage1: 1,
        search: '',
        tableData: [],
        tableData1: [],
        city:''

      }

    },
    filters:{
      filters1: function (arg) {
        if (arg == 0) {
          return "餐饮"
        } else if (arg == 1) {
          return "酒店"
        }else if (arg == 2) {
          return "其它"
        }else if (arg == 3) {
          return "交通"
        }
      }
    },
    components:{
      Collection,
      information

    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      this.getlist()
      this.GetCity()

    },

    methods:{
    	change(val){
    		this.page=1
    		this.city=val;
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
      handleClose4(){
        this.dialogEadd2=false
      },
      handleClose5(){
        this.dialogEadd3=false
      },
      //查看收款记录
      handleCollection(val,val1){
        this.Collectioninfo=val1;
        this.dialogEadd2=true

      },
      //查看详细信息
      handleinformation(val,val1){
        this.informationinfo=val1
        this.dialogEadd3=true
      },

      //查询
      getlist(){
        this._getData('admin/selectMerchantList',{
          pageSize:this.pageSize,
          page:this.page,
          city:this.city
        },data=>{
          this.tableData = data.PageInfo.list
          this.total = data.PageInfo.total
          console.log(this.tableData)
        })

      },
      //城市列表
      GetCity() {
        this._getData('admin/selectCity', {
        }, data => {
          this.tableData1 = data
         
          console.log(this.tableData1)

        })
      },
      //加入黑名单
      handleblack(val,val1){
        this.$confirm('确认加入黑名单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._getData('admin/delectMerchantList', {
            id:val1.id
          }, data => {
            this.$message({
              message: '加入黑名单成功',
              type: 'success'
            })
            this.getlist()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      //导出
      exportFunc (el, name) {
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
      transDate (timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        return Y + M + D;
      },
      s2ab (s) {
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

<style>
</style>
