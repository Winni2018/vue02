<template>
  <div>
    <div class="aa5">
      <span class="aa6">起点:</span>
     <!-- <el-input v-model="access.startAddress"  style="width: 200px;"></el-input>-->
    <el-select v-model="access.startAddress" placeholder="请选择" @change="change1" style="width: 200px;">
				<el-option v-for="item in options" :key="item.startAddress" :label="item.startAddress" :value="item.startAddress">
				</el-option>
			</el-select>
    </div>
    <div class="aa5">
      <span class="aa6">城市:</span><el-input  v-model="access.orderCity1" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">推荐景点:</span><el-input  v-model="access.orderScenic1" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">城市:</span><el-input  v-model="access.orderCity2" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">推荐景点:</span><el-input  v-model="access.orderScenic2" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">城市:</span><el-input  v-model="access.orderCity3" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">推荐景点:</span><el-input  v-model="access.orderScenic3" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">城市:</span><el-input  v-model="access.orderCity4" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">推荐景点:</span><el-input  v-model="access.orderScenic4" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">人数:</span><el-input v-model="access.orderNumber" style="width: 200px;"></el-input>
    </div>
    <div class="aa5">
      <span class="aa6">开始时间:</span>
      	<el-date-picker
        v-model="access.startTime"
        type="date"
        value-format="yyyy-MM-dd"
        style="width: 200px;"
        placeholder="选择日期">
		    </el-date-picker>
    </div>
    <div class="aa5">
      <span class="aa6">结束时间:</span>
      <el-date-picker
      v-model="access.endTime"
      type="date"
      value-format="yyyy-MM-dd"
      style="width: 200px;"
      placeholder="选择日期">
    </el-date-picker>
    </div>
    <div class="aa5">
      <span class="aa6">终点:</span>
     <!-- <el-input v-model="access.endAddress" style="width: 200px;"></el-input>-->
     <el-select v-model="access.endAddress" placeholder="请选择" style="width: 200px;">
				<el-option v-for="item in list4" :key="item.value" :label="item.endAddress" :value="item.endAddress">
				</el-option>
			</el-select>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              access:{

              },
        			list4:[],
              options: [],
              pj:""
            }
        },
      props:["modifyInfo","info"],
      created(){
        console.log(this.modifyInfo,this.info)
        this.access=this.modifyInfo;
        this.startAddress()
        this._getData('admin/endAddress', {
					startAddress: this.modifyInfo.startAddress
				}, data => {
					console.log(data)
					this.list4 = data
				})
      },
      methods: {
      	startAddress() {
				this._getData('admin/startAddress', {}, data => {
					this.options = data
				})
			},
			change1(val){
			this.access.startAddress=val
			console.log(this.access.startAddress)
			 if(this.access.endAddress!=this.modifyInfo.startAddress){
					this.access.endAddress=""
				}
				this._getData('admin/endAddress', {
					startAddress: val
				}, data => {
					console.log(data)
					this.list4 = data
				})
			},
        add() {
        	/*if(this.access.startAddress==""||this.access.endAddress==""||this.access.orderCity1==''||this.access.orderCity2==""||this.access.orderCity3==""||this.access.orderCity4==""||
        	this.access.orderScenic1==""||this.access.orderScenic2==""||this.access.orderScenic3==""||this.access.orderScenic4==""){
        		this.$message({
              message: '请填写完整',
              type: 'warning'
            });
            return
        	}*/
        	this.pj=this.access.orderCity1+"-"+this.access.orderCity2+"-"+this.access.orderCity3+"-"+this.access.orderCity4+"-"+this.access.orderScenic1+"-"+this.access.orderScenic2+"-"+this.access.orderScenic3+"-"+this.access.orderScenic4
          console.log(this.pj)
          this._getData('admin/updateOrderPathByID', {
            startAddress: this.access.startAddress,
            orderCity1:this.access.orderCity1,
            orderCity2:this.access.orderCity2,
            orderCity3:this.access.orderCity3,
            orderCity4:this.access.orderCity4,
            orderScenic1:this.access.orderScenic1,
            orderScenic2:this.access.orderScenic2,
            orderScenic3:this.access.orderScenic3,
            orderScenic4:this.access.orderScenic4,   
            number: this.access.orderNumber,
            startTime: this.access.startTime,
            endTime: this.access.endTime,
            endAddress: this.access.endAddress,
            orderPath:this.pj,
            id: this.info.id,
          }, data => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$emit("closeUsermsg1")
          })


        }
      }
    }
</script>

<style scoped>
		.aa5{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20px;
			margin-left: 25px
		}
		.aa6{
			width: 80px;
			text-align: right;
			display: block;
			margin-right: 10px;
		}
</style>
