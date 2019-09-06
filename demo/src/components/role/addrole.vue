<template>
	<div style="width: 100%">
		<el-header style="text-align: center;line-height: 60px;border-bottom: 2px solid #89A0B7;">
			添加角色
		</el-header>
		<div style="width: 350px;height: 500px;padding-top: 30px;text-align: center;padding-left: 350px">
			<template>
				<el-dialog :visible.sync="opened1" style="width: 800px;margin-left: 300px">
					<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
						<el-form-item label="选择角色" prop="job">
							<el-select v-model="value" placeholder="请选择" @change="change">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="账号" prop="account">
							<el-input type="password" style="width: 300px" v-model="ruleForm.account"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="checkPass">
							<el-input type="password" style="width: 300px" v-model="ruleForm.password" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="ruleForm.name" style="width: 300px"></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="phone">
							<el-input v-model="ruleForm.phone" style="width: 300px"></el-input>
						</el-form-item>
						<el-button style="margin-left: 150px" @click="outerVisible = false">确认修改</el-button>
					</el-form>
				</el-dialog>
			</template>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				outerVisible: false,
				val: '',
				ruleForm: {
					password: '',
					value: '',
					options: '',
				},
				options: [{
					value: '0',
					label: '客服'
				}, {
					value: '1',
					label: '商家'
				}, ],
				value: '',
			}
		},
		methods: {
			add() {
				this._getData('admin/addAdmin', {
					job: this.val,
					account: this.ruleForm.account,
					password: this.ruleForm.password,
					name: this.ruleForm.name,
					phone: this.ruleForm.phone
				}, data => {
					console.log()
				})
			},
			change(val) {
				console.log(val)
				this.val = val
			}
		}
	}
</script>
<style>

</style>