<template>
  <div style="width: 100%">
  	<div style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;display: flex;align-items: center;">
    <el-header style="margin:auto;">
       精选游记管理 
    </el-header>
    <el-button  type="primary" @click="handleadd()" style="margin-right:10px;"> 添加 </el-button>
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
                :index="indexMethod"    
                >
		      </el-table-column>
		      <el-table-column
		        align="center"
		        label="图片"
		        width="180"
		        >
		        <template slot-scope="scope">
		        	
		        	<div
			            v-for="(item, index) in scope.row.piclist"
			            class="hj-upload f-l hj-show">
			            <img :src="item">
			            <i class="el-icon-search hj-icon" @click="magnifier(item)"></i>
			           
			       
			        </div>
		        </template> 
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="num"
		        label="排序">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        prop="userTravelDiaryNumber"
		        label="游记编号">
		      </el-table-column>
		      <el-table-column
		      	align="center"
		        label="游记状态">
		        <template slot-scope="scope">
		        		{{scope.row.travelsStatus|filters2}}
		        </template>
		      </el-table-column>
		      <el-table-column
		       align="center"
		       label="精选游记操作"
		       width="250"
		       >
		       <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handlemodify(scope.$index, scope.row)">修改</el-button>
			        <el-button
			          size="mini"
			          @click="handlelower(scope.$index, scope.row)">{{scope.row.status|filters1}}</el-button>
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
      <el-dialog title="修改精选游记" :visible.sync="dialogEadd"
                       :center="true" :before-close="handleClose"
                       width="600px">
                <div v-if="dialogEadd">
                    <notesModify ref="modifysure" :info="info" :info1="info1" @handleClose="handleClose"></notesModify>                                         
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="appealBtn">确认</el-button>
                    <el-button @click="handleClose">取消</el-button>    
                </span>
        </el-dialog>  
       
        <el-dialog title="新增游记" :visible.sync="dialogEadd1"
                       :center="true" :before-close="handleClose1"
                       width="600px">
                <div v-if="dialogEadd1">
                    <notesAdd ref="modifysure1" @handleClose1="handleClose1"></notesAdd>                                         
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="appealBtn1">确认</el-button>
                    <el-button @click="handleClose1">取消</el-button>    
                </span>
        </el-dialog>  
    </div>    
</template>

<script>
  //修改
		import notesModify from './notesModify'
  //新增
		import notesAdd from './notesAdd'
	 	export default{
	 			data(){	 				
	 				return{
	 					 tableData: [],
	 					 total: 0,
             page: 1,
             pageSize: 10,
             currentPage1: 1,
             dialogEadd:false,
             dialogEadd1:false,
             info:{},
             info1:{}
	 				}
	 			},
	 			components:{
	 				notesModify,
	 				notesAdd
	 			},
	 			created(){
	 				this.getList()
	 			},
	 			filters:{
					 filters1: function (arg) {
		                if (arg == 0) {
		                    return "上架"
		                } else if (arg == 1) {
		                    return "下架"
		                }
		            },
					 filters2:function(arg){
										if(arg==0){
											return "下架"
										}else if(arg==1){
											return "上架"
										}else if(arg==2){
											return "删除"
										}
					 }
				},
	 			methods:{
	 				magnifier (url) {                          //查看大图函数;
                const h = this.$createElement;
                this.$msgbox({
                    title: '图片查看',
                    message: h('img', {
                        attrs: {
                            src:url
                        },
                        style: {
                            width: '100%',
                            height: '300px'
                        },
                        on: {
                            error (e) {
                                e.target.src = '../../assets/logo.png'
                            }
                        }
                    })
                }).catch(action => {
                   /* this.$message({
                        type: 'info',
                        message: '停留在当前页面'
                    })*/
                });
            },
	 				handleadd(){
	 					this.dialogEadd1=true
	 				},
	 				handleClose(){
	 					this.dialogEadd=false;
	 					this.getList()
	 				},
	 				handleClose1(){
	 					this.dialogEadd1=false;
	 					this.getList()
	 				},
	 				appealBtn () {
            this.$refs.modifysure.add();
          },
          appealBtn1(){
          	this.$refs.modifysure1.add();
          },
	 				getList(){
	 					 var strs= new Array()
						 this._getData('admin/selectUserGoodTravelDiary', {
		                page:this.page,
		                pageSize:this.pageSize
						 }, data => {
						 	  data.PageInfo.list.map((item,index)=>{
						 	  	if(item.photoUrl!=null){	
                		strs=item.photoUrl.split(",")
                		strs.pop()
                	}
                	else{
                		strs=[]
                	}
                		item.piclist=strs
                		
                })
                    this.tableData=data.PageInfo.list
                 	  this.total=data.PageInfo.total
		        }) 
				  },
				  handlelower(val,val1){
				  	if(val1.status==1){
							val1.status=0
						}else if(val1.status==0){
							val1.status=1
						}
					   this._getData('admin/upDownUserGoodTravelDiary', {
								 	id:val1.id,
								 	flag:val1.status
	            }, data => {
	            if(val1.status==1){
	            		this.$message({
		                  message: '已上架',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}else if(val1.status==0){
	            		this.$message({
		                  message: '已下架',
		                  type: 'success'
	                  });
	                  this.getList()
	            	}
	            	
				 })
		   },
			  //修改
			  handlemodify(val,val1){
			  		this.info1=val1
			  	  console.log(val1)
			  		this._getData('admin/selectUserGoodTravelDiaryByID', {
					 	        id:val1.id
	               }, data => {
	                  this.info=data
	                  console.log(this.info)
	                  this.dialogEadd=true
	           })
			  	  
			  },
		     //删除
          handleDelete(val,val1){
            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._getData('admin/delectUserGoodTravelDiary', {
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
	 			}
	 		}
</script>

<style scoped="scoped">
	img {
				padding-top: 5px;
				height: 30px;
        width: 50px;
    }
	 .clearfix::after {
        content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
    }

    .f-l {
        
    }

    .hj-upload {
    	
    		width: 30%;
        height: 30px;
        float: left;
       	margin-right: 4px;
       	margin-bottom: 4px;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    .hj-upload > img {
        
        position: absolute;
    }

    .hj-load {
        color: #8c939d;
        font-weight: 700;
        width: 60px;
        height: 60px;
        font-size: 60px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -30px;
        margin-top: -30px;
    }

    .hj-upload:hover {
       border-style: solid;
    }

    .hj-ipt {
        position: absolute;
        width: 175px;
        height: 105px;
        z-index: 999;
        opacity: 0;
    }

    .hj-icon {
        color: #F56C6C;
        margin-left: 16px;
        font-size: 20px;
        font-weight: bold;
        display: none;
        position: relative;
        top: 4px;
        z-index: 999;
    }

    .hj-show:hover .hj-icon {
        display: block;
    }
</style>
