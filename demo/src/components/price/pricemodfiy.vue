<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
      <span style="margin-right: 5px;">类型</span>
      <el-select v-model="value" placeholder="请选择" style="width: 200px;" @change="change">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-bottom: 10px; padding-top: 10px">
      <span style="margin-right: 5px;">名称</span><el-input v-model="name" placeholder="请输入名称" style="width: 200px;"></el-input>
    </div>
    <div style="display: flex;justify-content: center;align-items: center; padding-top: 0px">
      <span style="margin-right: 5px;">单位</span><el-input v-model="num" placeholder="请输入内容" style="width: 200px;"></el-input>
    </div>
    <div style="display: flex;justify-content: center;align-items: center; padding-top: 10px;padding-right: 12px">
      <span style="margin-right: 5px;">预付款</span><el-input v-model="money" placeholder="请输入内容" style="width: 200px;"></el-input>
    </div>

  </div>

</template>

<script>

    export default {

        data() {
            return {
              options: [{
                value: '0',
                label: '餐饮'
              }, {
                value: '1',
                label: '酒店'
              }, {
                value: '2',
                label: '其它'
              }, {
                value: '3',
                label: '交通'
              },],
              value:'',
              name:'',
              num:'',
              money:'',
              access:{

              },


            }
        },

      props:["modifyInfo","info"],
      created() {
        console.log(this.modifyInfo)
        this.access=this.modifyInfo;
        this.name=this.access.name
        this.num=this.access.num
        this.money=this.access.money
        this.value=this.access.type
      },
      methods:{
          change(val){
            this.value=val
          },
        add(){
        	var reg=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
        	if(!reg.test(this.money)){
          		this.$message({
                message: '预付款请设置成正整数或者精确到小数点后两位',
                type: 'warning'
              });
              return
          	}
          this._getData('admin/updateTravelMoneyByID',{
            id:this.info.id,
            name:this.name,
            num:this.num,
            money:this.money,
            type:this.value
          },data=>{
            this.$message({
              message:'修改成功',
              type: 'success'
            });
            this.$emit("closeUsermsg1")
          })

        }
        }
    }
</script>

<style scoped>

</style>
