<template>
	<div class="examine">
		<el-header style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;">
			游记列表
		</el-header>
		<div style="display: flex;justify-content: space-between;align-items: center;">

			<div style="display: flex;justify-content: flex-start;align-items: center;">
				<el-button type="danger" @click="handledelA()" style="margin: 10px 0 0 10px;">删除
				</el-button>
				<div>
					<el-button @click="handlelookarea()" style="margin: 10px 0 0 10px;">查看地区
					</el-button>
				</div>

			</div>
			<div>
				<el-input v-model="input" placeholder="请输入游记编号" @keyup.native="clickEnter(input)" style="width: 200px;margin-top: 10px;margin-right: 50px;"></el-input>
			</div>
		</div>

		<el-table :data="tableData" stripe ref="multipleTable" style="width: 98%;margin:20px auto 10px auto;" border tooltip-effect="dark" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" align="center" :index="indexMethod" width="60px">
			</el-table-column>
			<el-table-column align="center" label="时间" prop="creationTime">
			</el-table-column>
			<el-table-column align="center" prop="userNickName" label="作者">
			</el-table-column>
			<el-table-column align="center" prop="number" label="游记编号">
			</el-table-column>
			<el-table-column align="center" label="图片集">
				<template slot-scope="scope">

					<div v-for="(item, index) in scope.row.piclist" class="hj-upload f-l hj-show">
						<img :src="item">
						<i class="el-icon-search hj-icon" @click="magnifier(item)"></i>

					</div>

				</template>
			</el-table-column>
			<el-table-column align="center" label="文字介绍" prop="content">
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleblack(scope.$index, scope.row)">{{scope.row.status|filters1}}</el-button>
					<el-button size="mini" type="danger" @click="handledel(scope.$index, scope.row)">删除</el-button>

				</template>
			</el-table-column>

		</el-table>
		<div class="block pageBox">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[10,20,50]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total='total'>
			</el-pagination>
		</div>
		<el-dialog title="地区展示" :visible.sync="dialogEadd1" :center="true" :before-close="handleClose3" width="600px">
			<div v-if="dialogEadd1">
				<showArea></showArea>
			</div>
			<span slot="footer" class="dialog-footer">
                    
                    <el-button @click="handleClose3">取消</el-button>      
                </span>
		</el-dialog>
	</div>
</template>

<script>
	import showArea from './showarea.vue'
	export default {
		data() {
			return {
				tableData: [],
				total: 0,
				page: 1,
				pageSize: 10,
				currentPage1: 1,
				info: {},
				multipleTable: [],
				input: "",
				dialogEadd1: false
			}
		},
		components: {
			showArea
		},
		filters: {
			filters1: function(arg) {
				if(arg == 0) {
					return "上架"
				} else if(arg == 1) {
					return "下架"
				}
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handlelookarea() {
				this.dialogEadd1 = true
			},
			handleClose3() {
				this.dialogEadd1 = false
			},

			clickEnter(val) {
				var strs = new Array()
				this._getData('admin/selectTravelDiaryList', {
					number: this.input,
					page: this.page,
					pageSize: this.pageSize
				}, data => {
					/*data.PageInfo.list.map((item,index)=>{
                		strs=item.photoUrl.split(",")
                	})
                	data.PageInfo.list.map((item,index)=>{
                		item.piclist=strs
                	})
                 	this.tableData=data.PageInfo.list
                 	console.log(this.tableData)
                 	this.total=data.PageInfo.total*/
					data.PageInfo.list.map((item, index) => {
						if(item.photoUrl != null) {
							strs = item.photoUrl.split(",")
							strs.pop()

						} else {
							strs = []
						}
						item.piclist = strs

					})
					this.tableData = data.PageInfo.list
					console.log(this.tableData)
					this.total = data.PageInfo.total
				})

			},
			handledelA() {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.multipleTable.map((item, index) => {
						this._getData('admin/delectTravelDiaryList', {
							id: item.id
						}, data => {
							this.$message({
								message: '删除成功',
								type: 'success'

							})
							this.getList()
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			handleSelectionChange(val) {
				this.multipleTable = val
				console.log(this.multipleTable)
			},
			//上下架
			handleblack(val, val1) {
				if(val1.status == 1) {
					val1.status = 0
				} else if(val1.status == 0) {
					val1.status = 1
				}
				this._getData('admin/upDownTravelDiaryList', {
					id: val1.id,
					flag: val1.status
				}, data => {
					if(val1.status == 1) {
						this.$message({
							message: '已上架',
							type: 'success'
						});
						this.getList()
					} else if(val1.status == 0) {
						this.$message({
							message: '已下架',
							type: 'success'
						});
						this.getList()
					}

				})
			},
			handledel(val, val1) {
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this._getData('admin/delectTravelDiaryList', {
						id: val1.id
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
			magnifier(url) { //查看大图函数;
				const h = this.$createElement;
				this.$msgbox({
					title: '图片查看',
					message: h('img', {
						attrs: {
							src: url
						},
						style: {
							width: '100%',
							height: '300px'
						},
						on: {
							error(e) {
								e.target.src = '../../assets/logo.png'
							}
						}
					})
				}).catch(action => {
					/*this.$message({
					    type: 'info',
					    message: '停留在当前页面'
					})*/
				});
			},
			getList() {
				var strs = new Array()
				this._getData('admin/selectTravelDiaryList', {
					page: this.page,
					pageSize: this.pageSize
				}, data => {
					/*data.PageInfo.list.map((item,index)=>{
                		strs=item.photoUrl.split(",")
                	})
                	data.PageInfo.list.map((item,index)=>{
                		item.piclist=strs
                	})
                 	this.tableData=data.PageInfo.list
                 	console.log(this.tableData)
                 	this.total=data.PageInfo.total*/
					data.PageInfo.list.map((item, index) => {
						if(item.photoUrl != null) {
							strs = item.photoUrl.split(",")
							strs.pop()

						} else {
							strs = []
						}
						item.piclist = strs

					})
					this.tableData = data.PageInfo.list
					console.log(this.tableData)
					this.total = data.PageInfo.total
				})
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
		}
	}
</script>

<style scoped="scoped">
	.examine {
		width: 100%
	}
	
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
	
	.f-l {}
	
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
	
	.hj-upload>img {
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