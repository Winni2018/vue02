<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        align="center"
        width="100px">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="creationTime"
        align="center">
      </el-table-column>

      <el-table-column
        label="消费金额"
        prop="payMoeny"
        align="center">
      </el-table-column>
      <el-table-column
        label="消费客户"
        prop="payName"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handledelete(scope.$index, scope.row)">删除</el-button>

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
  </div>
</template>

<script>
    //import someComponent from './someComponent'
    export default {

        data() {
            return {
              tableData: [],
              total: 0,
              page: 1,
              pageSize: 10,
              currentPage1:1,
            }
        },
      props:["Collectioninfo"],
      created(){
        console.log(this.Collectioninfo)
        this.getlist()
      },
      methods:{
          getlist(){
            this._getData('admin/selectMerchantPayList',{
              id:this.Collectioninfo.id,
              page:this.page,
              pageSize:this.pageSize,
            },data=>{
              console.log(data)
              this.tableData=data.PageInfo.list
              this.total=data.PageInfo.total
            })
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
        handledelete(val, val1) {
          this._getData('admin/delectMerchantPay', {
            id: val1.id,
          }, data => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getlist()
          })
        },

      }

    }
</script>

<style scoped>

</style>
