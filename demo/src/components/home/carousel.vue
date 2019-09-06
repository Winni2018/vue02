<template>
	<div class="carousel" id="div">
		<div style="border-bottom: 2px solid #89A0B7;display: flex;align-items: center;justify-content: center;height: 60px;">
         <p style="margin: 0 auto;">轮播图管理</p>
         <el-button  type="primary"  @click="handleadd()" style="margin-right:10px;"> 添加 </el-button>
        </div>
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
                width="180"     
                >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="图片"
		        width="180"
		        >
		        <template slot-scope="scope">
		        	<img :src="scope.row.bannerUrl"/>
		        </template>
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="url"
		        label="超链接">
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="操作"
		       >
		       <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handlemodify(scope.$index, scope.row)">修改</el-button>
			        <el-button
			          size="mini"
			          @click="handlelower(scope.$index, scope.row)">{{scope.row.bannerStatus|filters1}}</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
		    </el-table-column>
		    
		</el-table>
		<!--新增轮播图-->
		<el-dialog title="新增轮播图" :visible.sync="dialogEadd"
                       :center="true" :before-close="handleClose2"
                       width="600px">
                <div v-if="dialogEadd">
                    <carouselAdd ref="zizhiadd" @closeUsermsg="closeUsermsg"></carouselAdd>                              
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="appealBtn">确认</el-button>
                    <el-button @click="handleClose2">取消</el-button>      
                </span>
        </el-dialog>
        <!--修改轮播图-->
        <el-dialog title="修改轮播图" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose3"
                       width="600px">
                <div v-if="dialogEadd1">
                    <modifyPic ref="modifysure" :modifyinfo="modifyinfo" @closeUsermsg1="closeUsermsg1"></modifyPic>                                         
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="appealBtn1">确认</el-button>
                    
                </span>
        </el-dialog>
	</div>
</template>

<script>
	//新增
	import carouselAdd from './carouseladd'
	//修改
	import modifyPic from './modifypic'
	export default{
		data() {
	        return {
	          onlyid:'',
	          tableData: [],
	          dialogEadd:false,
	          dialogEadd1:false,
	          modifyinfo:{}

	        }
		},
		filters:{
			 filters1: function (arg) {
                if (arg == 0) {
                    return "上架"
                } else if (arg == 1) {
                    return "下架"
                }
            }
		},
		components:{
			carouselAdd,
			modifyPic
		},
		
		methods:{ 
			closeUsermsg(){
				this.dialogEadd=false,
				this.getList()
			},
			closeUsermsg1(){
				this.dialogEadd1=false,
				this.getList()
			},
			//列表展示
			getList(){
				 this._getData('admin/selectBaners', {
                 }, data => {
                 	console.log(data) 
                 	this.tableData=data
                })
				 
			},
			appealBtn () {
                this.$refs.zizhiadd.add();
            },
            appealBtn1 () {
                this.$refs.modifysure.add();
            },
			//上下架
			handlelower(val,val1){
				if(val1.bannerStatus==1){
					val1.bannerStatus=0
				}else if(val1.bannerStatus==0){
					val1.bannerStatus=1
				}
				 this._getData('admin/upDownBanner', {
				 	id:val1.id,
				 	flag:val1.bannerStatus
                 }, data => {
                 	if(val1.bannerStatus==1){
	            		this.$message({
		                  message: '已上架',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}else if(val1.bannerStatus==0){
	            		this.$message({
		                  message: '已下架',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}
                 	
			})
		},
		  //删除
		  handleDelete(val,val1){ 
		  		this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
		  		 this._getData('admin/deleteBanner', {
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
		  //添加
		  handleadd(){
		  	this.dialogEadd=true
		  },
		  handleClose2 () {
            this.dialogEadd = false;
                
          },
          handleClose3 () {
            this.dialogEadd1 = false;
                
          },
          
          //修改轮播图
          handlemodify(val,val1){
          	console.log(val1)
          	this.modifyinfo=val1
          	this.dialogEadd1=true
          	
          }
		   
	},


		created(){
			this.getList()
			
		}
	}
</script>

<style scoped="scoped">
	.carousel{
		width: 100%;
		height: 1000px
	}
	img {
		padding-top: 5px;
		height: 80px;
        width: 130px;
    }
</style>
