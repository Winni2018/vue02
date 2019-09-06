<template>
	<div>
		<el-container>
			<el-header style='background-color:#373d41' class='main-header'>
				<div class="main-img-box">
					<span class="merchant">
                    	<img src="../assets/logo1.png" style=""/>                   
                    </span>
					<span class="merchant" style="width: 200px;margin-left: 10px;font-size: 14px;">
                    	后台管理系统
                    </span>
				</div>
				<div class="main-func-box">
					<ul class="appNav">
						<li>欢迎管理员{{userInfo.adminName}}</li>
					</ul>
					<a class="appA" @click="handlemodify(userInfo.id)">修改密码</a>
					<a class="appA" @click="exit()">退出</a>
				</div>
			</el-header>
			<el-container>
				<el-aside style="width:200px;overflow: hidden;background-color:  rgb(84, 92, 100);">
					<el-menu class="el-menu-vertical-demo" :collapse-transition="true" :unique-opened='true' @select="handleSelect" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#409EFF" :default-openeds="openeds" :default-active="activedMenu($route.path)">
						<el-submenu index="1" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<template slot="title">首页</template>
							<el-menu-item index="carousel" class="p-60">轮播图管理</el-menu-item>
							<el-menu-item index="travelNotes" class="p-60">精选游记管理</el-menu-item>
							<el-menu-item index="platform" class="p-60">平台条款</el-menu-item>
						</el-submenu>
						<el-menu-item index="userManagement" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<span slot="title">用户管理</span>
						</el-menu-item>
						<el-menu-item index="examine" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<span slot="title">游记管理</span>
						</el-menu-item>

						<el-menu-item index="flight" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<span slot="title">航班信息</span>
						</el-menu-item>
						<el-menu-item index="business" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<span slot="title">商家管理</span>
						</el-menu-item>
						<el-menu-item index="route" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<span slot="title">路线管理</span>
						</el-menu-item>
						<el-submenu index="4" v-if="userInfo.adminJob==3||userInfo.adminJob==0">
							<template slot="title">订单管理</template>
							<el-menu-item index="ordermanagement" class="p-60">订单管理</el-menu-item>
							<el-menu-item index="intervention" class="p-60">订单介入</el-menu-item>

						</el-submenu>
						<el-submenu index="5" v-if="userInfo.adminJob==3">
							<template slot="title">角色管理</template>
							<!--<el-menu-item index="addrole">添加角色</el-menu-item>-->
							<el-menu-item index="auditor" class="p-60">客服管理</el-menu-item>
							<el-menu-item index="service" class="p-60">管理员管理</el-menu-item>
						</el-submenu>
						<el-menu-item index="price" v-if="userInfo.adminJob==3||userInfo.adminJob==1">
							<span slot="title">价格管理</span>
						</el-menu-item>

					</el-menu>

				</el-aside>
				<el-dialog title="修改密码" :visible.sync="dialogTableVisible" :center="true" width="400px">
					<div>
						<el-form label-width="80px">
							<el-form-item label="账号">
								<el-input :disabled="true" v-model="editPass.admin"></el-input>
							</el-form-item>
							<el-form-item label="原密码">
								<el-input type="password" v-model="editPass.oldp"></el-input>
							</el-form-item>
							<el-form-item label="新密码">
								<el-input type="password" v-model="editPass.newp"></el-input>
							</el-form-item>
							<el-form-item label="确认密码">
								<el-input type="password" v-model="editPass.newpa"></el-input>
							</el-form-item>
							<el-form-item label=" ">
								<div style="font-size: 12px;color: #909399;">*新密码请设置为字母与数字混合,8-20位。</div>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
         	 <el-button type="primary" @click="editKe(editPass)">修改</el-button>
             <el-button @click="dialogTableVisible = false">取消</el-button>
            </span>
				</el-dialog>
				<router-view />
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 顶部显示
				userInfo: {},
				openeds: ["1"],
				isCollapse: false,
				dialogTableVisible: false,
				editPass: {},
				userInfo1: ''

			};
		},
		watch: {
			dialogTableVisible(val, oldval) {
				console.log(val);
				if(val) {

				} else {
					this.editPass = {};
				}
			}

		},
		methods: {

			//默认页面显示
			activedMenu: function(val) {

				if(val.indexOf('/management') == 0) {
					return '/authorityList'

				}
			},
			// 退出
			exit() {
				this.$confirm('确认退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//清空缓存
					sessionStorage.clear('userInfo');
					this.$message({
						message: '退出成功',
						type: 'success'
					});
					this.$router.push({
						path: '/',
						name: 'login'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消退出'
					});
				});
			},
			handleSelect: function(index, indexPath) {

				//路由跳转方法
				this.$router.push({
					name: index
				});
			},
			//修改密码
			handlemodify(id) {
				this.editPass.id = id;
				this.dialogTableVisible = true;
				this.editPass.admin = this.userInfo1
			},
			//确认修改
			editKe(data) {
				let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
				if(!reg.test(data.newp)) {
					this.$message({
						message: '密码格式错误',
						type: 'warning'
					});
					return
				}
				console.log(data);
				this._getData('admin/updateAdminPassWord', {
					id: data.id,
					oldPassWord: data.oldp,
					newPassWord: data.newp,
					password: data.newpa,
				}, data => {
					this.$message({
						message: '修改成功',
						type: 'success'
					});
					this.dialogTableVisible = false;
					this.editPass = {};
					this.$router.push({
						name: "login"
					})
				})
			},

		},
		created() {
			this.userInfo1 = JSON.parse(sessionStorage.getItem('account'))
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
		},
	}
</script>

<style scoped>
	.main-header {
		display: flex;
		justify-content: space-between;
		padding: 0;
		height: 50px !important;
	}
	
	.main-img-box {
		height: 50px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;
	}
	
	.main-img-box img {
		width: auto;
		height: 40px;
		margin-left: 34px;
	}
	
	.main-func-box {
		/*width: 100px;*/
		display: flex;
		justify-content: flex-end;
		align-items: center;
		cursor: pointer;
		height: 50px;
	}
	
	.main-func-box img {
		margin-right: 14px;
		padding-left: 10px;
		width: 22px;
		height: 22px;
	}
	
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: calc(100vh - 50px);
	}
	
	.tableFunc div {
		display: inline-block;
		width: 100%;
		float: right;
	}
	
	.merchant {
		display: inline-block;
		/* width: 100%;*/
		color: #fff;
		/* text-align: center;*/
	}
	
	.appNav>li {
		float: right;
		padding: 0 3px;
		color: #fff;
		font-size: 14px;
	}
	
	.appA {
		margin: 0 5px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 14px;
	}
	
	.item {
		margin-top: 10px;
		margin-right: 40px;
	}
</style>